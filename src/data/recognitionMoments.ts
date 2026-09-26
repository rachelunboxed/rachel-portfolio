export type RecognitionMoment = {
  id: string;
  date: string;
  project: string;
  context: string;
  kind: string;
  categories: string[];
  image?: string;
};

export const MOMENTS_MANIFEST_URL_PATH = 'media/recognition/moments.json';
const MOMENT_IMAGE_PREFIX = 'media/recognition/moments/';

export const momentImageUrlPath = (id: string) => `${MOMENT_IMAGE_PREFIX}${id}.jpg`;
export const timelinePhotoUrlPath = (id: string) => `media/recognition/timeline/${id}.jpg`;

const isString = (value: unknown): value is string => typeof value === 'string';

export function parseMoments(raw: unknown): RecognitionMoment[] {
  if (!Array.isArray(raw)) return [];

  return raw.flatMap((entry): RecognitionMoment[] => {
    if (typeof entry !== 'object' || entry === null) return [];
    const item = entry as Record<string, unknown>;
    if (
      !isString(item.id) ||
      !isString(item.date) ||
      !isString(item.project) ||
      !isString(item.context) ||
      !isString(item.kind)
    ) {
      return [];
    }

    const image =
      isString(item.image) && item.image.startsWith(MOMENT_IMAGE_PREFIX) ? item.image : undefined;

    return [
      {
        id: item.id,
        date: item.date,
        project: item.project,
        context: item.context,
        kind: item.kind,
        categories: Array.isArray(item.categories) ? item.categories.filter(isString) : [],
        ...(image ? { image } : {}),
      },
    ];
  });
}

export function sortMoments(moments: RecognitionMoment[]): RecognitionMoment[] {
  return [...moments].sort((a, b) => b.date.localeCompare(a.date));
}

export function formatMomentDate(date: string): string {
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}
