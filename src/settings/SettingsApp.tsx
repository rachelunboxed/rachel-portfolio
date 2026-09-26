import { useState, type ChangeEvent, type FormEvent } from 'react';
import { caseStudies } from '../data/content';
import {
  clearSavedToken,
  loadSavedToken,
  REPO_NAME,
  saveToken,
  uploadProjectVideo,
  uploadResume,
} from './github';
import MomentsCard from './MomentsCard';
import { StatusMessage, type Status } from './status';
import TimelinePhotoCard from './TimelinePhotoCard';

function ResumeUploadCard({ token }: { token: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
    setStatus({ kind: 'idle' });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!token || !file) return;
    setStatus({ kind: 'uploading' });
    const result = await uploadResume(token, file);
    setStatus(
      result.ok ? { kind: 'success', commitUrl: result.commitUrl } : { kind: 'error', message: result.message },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 rounded-2xl border border-border bg-surface p-6">
      <h2 className="text-sm font-bold uppercase tracking-wider text-muted">2. Upload CV</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate">
        Replaces the PDF behind the "Download Resume" button on the live site.
      </p>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="mt-4 w-full text-sm text-slate file:mr-4 file:rounded-full file:border-0 file:bg-surface-2 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-slate"
      />

      <button
        type="submit"
        disabled={!token || !file || status.kind === 'uploading'}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-accent px-6 py-3 text-sm font-semibold text-white shadow-lg disabled:opacity-40"
      >
        {status.kind === 'uploading' ? 'Uploading…' : 'Upload resume'}
      </button>

      <StatusMessage status={status} />
    </form>
  );
}

function ProjectVideoUploadCard({ token }: { token: string }) {
  const [projectId, setProjectId] = useState(caseStudies[0]?.id ?? '');
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
    setStatus({ kind: 'idle' });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!token || !file || !projectId) return;
    setStatus({ kind: 'uploading' });
    const result = await uploadProjectVideo(token, projectId, file);
    setStatus(
      result.ok ? { kind: 'success', commitUrl: result.commitUrl } : { kind: 'error', message: result.message },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 rounded-2xl border border-border bg-surface p-6">
      <h2 className="text-sm font-bold uppercase tracking-wider text-muted">3. Upload project video</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate">
        Adds a POC video preview to a Featured Project card, with an option to expand it full-size.
        MP4 only, 40MB max. Keep clips short and compressed.
      </p>

      <select
        value={projectId}
        onChange={(e) => {
          setProjectId(e.target.value);
          setStatus({ kind: 'idle' });
        }}
        className="mt-4 w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-text outline-none transition-colors focus:border-accent-from"
      >
        {caseStudies.map((cs) => (
          <option key={cs.id} value={cs.id}>
            {cs.title}
          </option>
        ))}
      </select>

      <input
        type="file"
        accept="video/mp4"
        onChange={handleFileChange}
        className="mt-4 w-full text-sm text-slate file:mr-4 file:rounded-full file:border-0 file:bg-surface-2 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-slate"
      />

      <button
        type="submit"
        disabled={!token || !file || status.kind === 'uploading'}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-accent px-6 py-3 text-sm font-semibold text-white shadow-lg disabled:opacity-40"
      >
        {status.kind === 'uploading' ? 'Uploading…' : 'Upload video'}
      </button>

      <StatusMessage status={status} />
    </form>
  );
}

export default function SettingsApp() {
  const [token, setToken] = useState(() => loadSavedToken());
  const [tokenSaved, setTokenSaved] = useState(() => loadSavedToken().length > 0);

  const handleSaveToken = () => {
    saveToken(token);
    setTokenSaved(true);
  };

  const handleClearToken = () => {
    clearSavedToken();
    setToken('');
    setTokenSaved(false);
  };

  return (
    <div className="min-h-screen bg-bg text-text">
      <div className="mx-auto w-full max-w-2xl px-6 py-16 md:py-24">
        <p className="text-xs font-semibold uppercase tracking-wider text-gradient">Site Settings</p>
        <h1 className="mt-2 text-2xl font-bold text-navy md:text-3xl">CV, videos & recognition</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Everything below commits directly to <code className="text-xs">{REPO_NAME}</code> via the
          GitHub API. The site rebuilds and updates automatically within a minute or two of a
          successful change.
        </p>

        <div className="mt-10 rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted">1. GitHub access token</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate">
            Create a{' '}
            <a
              href="https://github.com/settings/personal-access-tokens/new"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent-from underline"
            >
              fine-grained personal access token
            </a>{' '}
            scoped only to the <code className="text-xs">{REPO_NAME}</code> repository, with{' '}
            <strong>Contents: Read and write</strong> permission. It's stored only in this browser's
            local storage and sent directly to api.github.com, never anywhere else.
          </p>

          <input
            type="password"
            value={token}
            onChange={(e) => {
              setToken(e.target.value);
              setTokenSaved(false);
            }}
            placeholder="github_pat_..."
            autoComplete="off"
            className="mt-4 w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-text outline-none transition-colors focus:border-accent-from"
          />

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleSaveToken}
              disabled={!token}
              className="rounded-full bg-gradient-accent px-4 py-2 text-xs font-semibold text-white disabled:opacity-40"
            >
              Save on this device
            </button>
            <button
              type="button"
              onClick={handleClearToken}
              className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-slate"
            >
              Clear saved token
            </button>
            {tokenSaved ? (
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                Saved on this device
              </span>
            ) : null}
          </div>
          <p className="mt-2 text-xs text-muted">
            Don't save on a shared or public computer. Use "Clear saved token" when you're done.
          </p>
        </div>

        <ResumeUploadCard token={token} />
        <ProjectVideoUploadCard token={token} />
        <TimelinePhotoCard token={token} />
        <MomentsCard token={token} />

        <p className="mt-8 text-xs text-muted">
          This page isn't linked from the main site and isn't meant to be shared.
        </p>
      </div>
    </div>
  );
}
