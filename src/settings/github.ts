import {
  MOMENTS_MANIFEST_URL_PATH,
  momentImageUrlPath,
  timelinePhotoUrlPath,
} from '../data/recognitionMoments';

const REPO = 'rachelunboxed/rachel-portfolio';
const BRANCH = 'master';
const TOKEN_STORAGE_KEY = 'rr-resume-settings-token';

const repoPath = (urlPath: string) => `public/${urlPath}`;

export const RESUME_PATH = 'public/media/resume.pdf';
export const projectVideoPath = (projectId: string) => `public/media/projects/${projectId}.mp4`;
export const timelinePhotoPath = (eventId: string) => repoPath(timelinePhotoUrlPath(eventId));
export const momentImagePath = (momentId: string) => repoPath(momentImageUrlPath(momentId));
export const MOMENTS_MANIFEST_PATH = repoPath(MOMENTS_MANIFEST_URL_PATH);

export function loadSavedToken(): string {
  try {
    return localStorage.getItem(TOKEN_STORAGE_KEY) ?? '';
  } catch {
    return '';
  }
}

export function saveToken(token: string) {
  try {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  } catch {
    // localStorage unavailable, so the token simply won't persist across visits.
  }
}

export function clearSavedToken() {
  try {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  } catch {
    // no-op
  }
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(',')[1] ?? '');
    };
    reader.onerror = () => reject(reader.error ?? new Error('Failed to read file'));
    reader.readAsDataURL(blob);
  });
}

function textToBase64(text: string): string {
  let binary = '';
  new TextEncoder().encode(text).forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function base64ToText(base64: string): string {
  const binary = atob(base64);
  return new TextDecoder().decode(Uint8Array.from(binary, (char) => char.charCodeAt(0)));
}

async function githubRequest(token: string, path: string, init?: RequestInit) {
  return fetch(`https://api.github.com/repos/${REPO}/contents/${path}?ref=${BRANCH}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(init?.headers ?? {}),
    },
  });
}

export type ApiResult<T> = { ok: true; value: T } | { ok: false; message: string };
export type UploadResult = { ok: true; commitUrl: string } | { ok: false; message: string };

function failureMessage(status: number, body?: { message?: string } | null): string {
  if (status === 401) return 'Invalid or expired token.';
  if (status === 403) return "Token doesn't have write access to this repository's contents.";
  if (status === 409) return 'The file changed since it was last checked. Please try again.';
  return body?.message ?? `Request failed (${status}).`;
}

type RepoFile = { sha: string; base64: string };

async function fetchRepoFile(token: string, path: string): Promise<ApiResult<RepoFile | null>> {
  try {
    const res = await githubRequest(token, path);
    if (res.status === 404) return { ok: true, value: null };
    if (res.status !== 200) {
      return { ok: false, message: failureMessage(res.status) };
    }
    const data = await res.json();
    const base64 = typeof data.content === 'string' ? data.content.replace(/\n/g, '') : '';
    return { ok: true, value: { sha: data.sha, base64 } };
  } catch {
    return { ok: false, message: 'Network error while checking the existing file.' };
  }
}

async function putRepoFile(
  token: string,
  path: string,
  base64: string,
  message: string,
  sha?: string,
): Promise<UploadResult> {
  try {
    const res = await githubRequest(token, path, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, content: base64, sha, branch: BRANCH }),
    });

    if (res.status === 200 || res.status === 201) {
      const data = await res.json();
      return {
        ok: true,
        commitUrl: data.commit?.html_url ?? `https://github.com/${REPO}/commits/${BRANCH}`,
      };
    }
    const body = await res.json().catch(() => null);
    return { ok: false, message: failureMessage(res.status, body) };
  } catch {
    return { ok: false, message: 'Network error while uploading.' };
  }
}

type CommitFileOptions = {
  maxBytes: number;
  acceptedType: string;
  wrongTypeMessage: string;
  commitMessage: string;
};

async function commitFile(
  token: string,
  path: string,
  file: Blob,
  { maxBytes, acceptedType, wrongTypeMessage, commitMessage }: CommitFileOptions,
): Promise<UploadResult> {
  if (file.type !== acceptedType) {
    return { ok: false, message: wrongTypeMessage };
  }
  if (file.size > maxBytes) {
    return { ok: false, message: `File is too large (max ${Math.round(maxBytes / (1024 * 1024))}MB).` };
  }

  const existing = await fetchRepoFile(token, path);
  if (!existing.ok) return existing;

  let base64: string;
  try {
    base64 = await blobToBase64(file);
  } catch {
    return { ok: false, message: 'Could not read the selected file.' };
  }

  return putRepoFile(token, path, base64, commitMessage, existing.value?.sha);
}

export async function readTextFile(
  token: string,
  path: string,
): Promise<ApiResult<{ text: string; sha: string } | null>> {
  const file = await fetchRepoFile(token, path);
  if (!file.ok) return file;
  if (!file.value) return { ok: true, value: null };
  try {
    return { ok: true, value: { text: base64ToText(file.value.base64), sha: file.value.sha } };
  } catch {
    return { ok: false, message: 'Could not read the existing file.' };
  }
}

export function writeTextFile(
  token: string,
  path: string,
  text: string,
  message: string,
  sha?: string,
): Promise<UploadResult> {
  return putRepoFile(token, path, textToBase64(text), message, sha);
}

export async function removeFile(token: string, path: string, message: string): Promise<UploadResult> {
  const existing = await fetchRepoFile(token, path);
  if (!existing.ok) return existing;
  if (!existing.value) return { ok: false, message: 'That file was not found in the repository.' };

  try {
    const res = await githubRequest(token, path, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, sha: existing.value.sha, branch: BRANCH }),
    });
    if (res.status === 200) {
      const data = await res.json();
      return {
        ok: true,
        commitUrl: data.commit?.html_url ?? `https://github.com/${REPO}/commits/${BRANCH}`,
      };
    }
    const body = await res.json().catch(() => null);
    return { ok: false, message: failureMessage(res.status, body) };
  } catch {
    return { ok: false, message: 'Network error while removing the file.' };
  }
}

export function uploadResume(token: string, file: Blob): Promise<UploadResult> {
  return commitFile(token, RESUME_PATH, file, {
    maxBytes: 20 * 1024 * 1024,
    acceptedType: 'application/pdf',
    wrongTypeMessage: 'Please choose a PDF file.',
    commitMessage: `Update resume via settings page (${new Date().toISOString()})`,
  });
}

export function uploadProjectVideo(token: string, projectId: string, file: Blob): Promise<UploadResult> {
  return commitFile(token, projectVideoPath(projectId), file, {
    maxBytes: 40 * 1024 * 1024,
    acceptedType: 'video/mp4',
    wrongTypeMessage: 'Please choose an MP4 video file.',
    commitMessage: `Update ${projectId} project video via settings page (${new Date().toISOString()})`,
  });
}

const IMAGE_OPTIONS = {
  maxBytes: 8 * 1024 * 1024,
  acceptedType: 'image/jpeg',
  wrongTypeMessage: 'The prepared image was not a JPEG. Please pick the image again.',
};

export function uploadTimelinePhoto(token: string, eventId: string, image: Blob): Promise<UploadResult> {
  return commitFile(token, timelinePhotoPath(eventId), image, {
    ...IMAGE_OPTIONS,
    commitMessage: `Update ${eventId} timeline photo via settings page (${new Date().toISOString()})`,
  });
}

export function uploadMomentImage(token: string, momentId: string, image: Blob): Promise<UploadResult> {
  return commitFile(token, momentImagePath(momentId), image, {
    ...IMAGE_OPTIONS,
    commitMessage: `Add recognition moment image ${momentId} via settings page`,
  });
}

export const REPO_NAME = REPO;
