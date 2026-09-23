const REPO = 'rachelunboxed/rachel-portfolio';
const BRANCH = 'master';
const TOKEN_STORAGE_KEY = 'rr-resume-settings-token';

export const RESUME_PATH = 'public/media/resume.pdf';
export const projectVideoPath = (projectId: string) => `public/media/projects/${projectId}.mp4`;

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
    // localStorage unavailable — token simply won't persist across visits.
  }
}

export function clearSavedToken() {
  try {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  } catch {
    // no-op
  }
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1] ?? '';
      resolve(base64);
    };
    reader.onerror = () => reject(reader.error ?? new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
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

export type UploadResult = { ok: true; commitUrl: string } | { ok: false; message: string };

type CommitFileOptions = {
  maxBytes: number;
  acceptedType: string;
  wrongTypeMessage: string;
  commitMessage: string;
};

async function commitFile(
  token: string,
  path: string,
  file: File,
  { maxBytes, acceptedType, wrongTypeMessage, commitMessage }: CommitFileOptions,
): Promise<UploadResult> {
  if (file.type !== acceptedType) {
    return { ok: false, message: wrongTypeMessage };
  }
  if (file.size > maxBytes) {
    return { ok: false, message: `File is too large (max ${Math.round(maxBytes / (1024 * 1024))}MB).` };
  }

  let sha: string | undefined;
  try {
    const existing = await githubRequest(token, path);
    if (existing.status === 200) {
      const data = await existing.json();
      sha = data.sha;
    } else if (existing.status === 401) {
      return { ok: false, message: 'Invalid or expired token.' };
    } else if (existing.status !== 404) {
      return { ok: false, message: `Could not check existing file (${existing.status}).` };
    }
  } catch {
    return { ok: false, message: 'Network error while checking the existing file.' };
  }

  let base64: string;
  try {
    base64 = await fileToBase64(file);
  } catch {
    return { ok: false, message: 'Could not read the selected file.' };
  }

  try {
    const res = await githubRequest(token, path, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: commitMessage, content: base64, sha, branch: BRANCH }),
    });

    if (res.status === 200 || res.status === 201) {
      const data = await res.json();
      return {
        ok: true,
        commitUrl: data.commit?.html_url ?? `https://github.com/${REPO}/commits/${BRANCH}`,
      };
    }
    if (res.status === 401) {
      return { ok: false, message: 'Invalid or expired token.' };
    }
    if (res.status === 403) {
      return { ok: false, message: "Token doesn't have write access to this repository's contents." };
    }
    if (res.status === 409) {
      return { ok: false, message: 'The file changed since it was last checked. Please try again.' };
    }
    const body = await res.json().catch(() => null);
    return { ok: false, message: body?.message ?? `Upload failed (${res.status}).` };
  } catch {
    return { ok: false, message: 'Network error while uploading.' };
  }
}

export async function uploadResume(token: string, file: File): Promise<UploadResult> {
  return commitFile(token, RESUME_PATH, file, {
    maxBytes: 20 * 1024 * 1024,
    acceptedType: 'application/pdf',
    wrongTypeMessage: 'Please choose a PDF file.',
    commitMessage: `Update resume via settings page (${new Date().toISOString()})`,
  });
}

export async function uploadProjectVideo(
  token: string,
  projectId: string,
  file: File,
): Promise<UploadResult> {
  return commitFile(token, projectVideoPath(projectId), file, {
    maxBytes: 40 * 1024 * 1024,
    acceptedType: 'video/mp4',
    wrongTypeMessage: 'Please choose an MP4 video file.',
    commitMessage: `Update ${projectId} project video via settings page (${new Date().toISOString()})`,
  });
}

export const REPO_NAME = REPO;
