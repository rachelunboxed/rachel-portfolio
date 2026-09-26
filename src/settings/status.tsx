export type Status =
  | { kind: 'idle' }
  | { kind: 'uploading' }
  | { kind: 'success'; commitUrl: string }
  | { kind: 'error'; message: string };

export function StatusMessage({ status }: { status: Status }) {
  if (status.kind === 'success') {
    return (
      <p className="mt-4 text-sm font-medium text-emerald-600 dark:text-emerald-400">
        Done. The site will rebuild automatically.{' '}
        <a href={status.commitUrl} target="_blank" rel="noopener noreferrer" className="underline">
          View the commit
        </a>
        .
      </p>
    );
  }
  if (status.kind === 'error') {
    return <p className="mt-4 text-sm font-medium text-red-600 dark:text-red-400">{status.message}</p>;
  }
  return null;
}

export const fileInputClass =
  'w-full text-sm text-slate file:mr-4 file:rounded-full file:border-0 file:bg-surface-2 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-slate';

export const fieldClass =
  'w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-text outline-none transition-colors focus:border-accent-from';

export const primaryButtonClass =
  'inline-flex items-center gap-2 rounded-full bg-gradient-accent px-6 py-3 text-sm font-semibold text-white shadow-lg disabled:opacity-40';

export const secondaryButtonClass =
  'rounded-full border border-border px-4 py-2 text-xs font-semibold text-slate disabled:opacity-40';
