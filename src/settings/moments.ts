import { parseMoments, type RecognitionMoment } from '../data/recognitionMoments';
import {
  MOMENTS_MANIFEST_PATH,
  momentImagePath,
  readTextFile,
  removeFile,
  uploadMomentImage,
  writeTextFile,
  type ApiResult,
  type UploadResult,
} from './github';

type Manifest = { moments: RecognitionMoment[]; sha?: string };

async function loadManifest(token: string): Promise<ApiResult<Manifest>> {
  const file = await readTextFile(token, MOMENTS_MANIFEST_PATH);
  if (!file.ok) return file;
  if (!file.value) return { ok: true, value: { moments: [] } };
  try {
    return { ok: true, value: { moments: parseMoments(JSON.parse(file.value.text)), sha: file.value.sha } };
  } catch {
    return { ok: false, message: 'The recognition manifest could not be read. It may be malformed.' };
  }
}

function saveManifest(token: string, manifest: Manifest, message: string): Promise<UploadResult> {
  return writeTextFile(
    token,
    MOMENTS_MANIFEST_PATH,
    `${JSON.stringify(manifest.moments, null, 2)}\n`,
    message,
    manifest.sha,
  );
}

export async function listMoments(token: string): Promise<ApiResult<RecognitionMoment[]>> {
  const manifest = await loadManifest(token);
  if (!manifest.ok) return manifest;
  return { ok: true, value: manifest.value.moments };
}

export async function addMoment(
  token: string,
  moment: RecognitionMoment,
  image: Blob | null,
): Promise<UploadResult> {
  if (image) {
    const uploaded = await uploadMomentImage(token, moment.id, image);
    if (!uploaded.ok) return uploaded;
  }

  const manifest = await loadManifest(token);
  if (!manifest.ok) {
    return { ok: false, message: `Image uploaded, but the gallery list could not be updated: ${manifest.message}` };
  }

  return saveManifest(
    token,
    { ...manifest.value, moments: [...manifest.value.moments, moment] },
    `Add recognition moment ${moment.id} via settings page`,
  );
}

export async function deleteMoment(token: string, moment: RecognitionMoment): Promise<UploadResult> {
  const manifest = await loadManifest(token);
  if (!manifest.ok) return manifest;

  const saved = await saveManifest(
    token,
    { ...manifest.value, moments: manifest.value.moments.filter((entry) => entry.id !== moment.id) },
    `Remove recognition moment ${moment.id} via settings page`,
  );
  if (!saved.ok || !moment.image) return saved;

  const removed = await removeFile(token, momentImagePath(moment.id), `Remove recognition moment image ${moment.id}`);
  return removed.ok
    ? saved
    : { ok: false, message: `Removed from the gallery, but the image file could not be deleted: ${removed.message}` };
}
