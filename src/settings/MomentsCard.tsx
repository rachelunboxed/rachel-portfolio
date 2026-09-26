import { useState, type FormEvent } from 'react';
import { anonymizedLabels, recognitionCategories, recognitionKinds } from '../data/content';
import { formatMomentDate, momentImageUrlPath, type RecognitionMoment } from '../data/recognitionMoments';
import ImagePicker from './ImagePicker';
import { addMoment, deleteMoment, listMoments } from './moments';
import { fieldClass, primaryButtonClass, secondaryButtonClass, StatusMessage, type Status } from './status';

const today = () => new Date().toISOString().slice(0, 10);

export default function MomentsCard({ token }: { token: string }) {
  const [date, setDate] = useState(today);
  const [project, setProject] = useState('');
  const [context, setContext] = useState('');
  const [kind, setKind] = useState<string>(recognitionKinds[0]);
  const [categories, setCategories] = useState<string[]>([]);
  const [textOnly, setTextOnly] = useState(false);
  const [image, setImage] = useState<Blob | null>(null);
  const [pickerKey, setPickerKey] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  const [list, setList] = useState<RecognitionMoment[] | null>(null);
  const [listError, setListError] = useState<string | null>(null);
  const [listBusy, setListBusy] = useState(false);

  const busy = status.kind === 'uploading';
  const ready =
    Boolean(token) && project.trim() !== '' && context.trim() !== '' && confirmed && (textOnly || image !== null);

  const refreshList = async () => {
    if (!token) return;
    setListBusy(true);
    setListError(null);
    const result = await listMoments(token);
    setListBusy(false);
    if (result.ok) setList(result.value);
    else setListError(result.message);
  };

  const toggleCategory = (category: string) =>
    setCategories((prev) => (prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!ready || busy) return;
    setStatus({ kind: 'uploading' });

    const id = `${date}-${crypto.randomUUID().slice(0, 6)}`;
    const attach = !textOnly && image !== null;
    const moment: RecognitionMoment = {
      id,
      date,
      project: project.trim(),
      context: context.trim(),
      kind,
      categories,
      ...(attach ? { image: momentImageUrlPath(id) } : {}),
    };

    const result = await addMoment(token, moment, attach ? image : null);
    if (result.ok) {
      setStatus({ kind: 'success', commitUrl: result.commitUrl });
      setProject('');
      setContext('');
      setCategories([]);
      setImage(null);
      setConfirmed(false);
      setPickerKey((key) => key + 1);
      void refreshList();
    } else {
      setStatus({ kind: 'error', message: result.message });
    }
  };

  const handleDelete = async (moment: RecognitionMoment) => {
    if (!window.confirm(`Remove "${moment.project}" from the gallery?`)) return;
    setListBusy(true);
    const result = await deleteMoment(token, moment);
    setListBusy(false);
    setStatus(result.ok ? { kind: 'success', commitUrl: result.commitUrl } : { kind: 'error', message: result.message });
    void refreshList();
  };

  return (
    <div className="mt-6 rounded-2xl border border-border bg-surface p-6">
      <h2 className="text-sm font-bold uppercase tracking-wider text-muted">5. Recognition moments</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate">
        Add real recognition artifacts (thank-you messages, certificates, feedback screenshots, team photos) to the
        gallery. The gallery stays hidden on the site until the first one is added. Only publish genuine recognition,
        and anonymize where confidentiality applies.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
            Date
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className={`mt-2 ${fieldClass}`} />
          </label>
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
            Recognition type
            <select value={kind} onChange={(e) => setKind(e.target.value)} className={`mt-2 ${fieldClass}`}>
              {recognitionKinds.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
          Team / project
          <input
            type="text"
            list="anonymized-labels"
            value={project}
            onChange={(e) => setProject(e.target.value)}
            placeholder="e.g. Agile Delivery Team"
            maxLength={120}
            className={`mt-2 ${fieldClass}`}
          />
          <datalist id="anonymized-labels">
            {anonymizedLabels.map((label) => (
              <option key={label} value={label} />
            ))}
          </datalist>
          <span className="mt-1 block text-[11px] font-normal normal-case tracking-normal">
            Use a generic label instead of real client or company names.
          </span>
        </label>

        <label className="block text-xs font-semibold uppercase tracking-wider text-muted">
          Context
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            rows={3}
            maxLength={500}
            placeholder="What was happening, and why this recognition mattered."
            className={`mt-2 resize-none ${fieldClass}`}
          />
        </label>

        <fieldset>
          <legend className="text-xs font-semibold uppercase tracking-wider text-muted">Categories (optional, used for filtering)</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {recognitionCategories.map((category) => (
              <button
                key={category}
                type="button"
                aria-pressed={categories.includes(category)}
                onClick={() => toggleCategory(category)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                  categories.includes(category)
                    ? 'border-transparent bg-gradient-accent text-white'
                    : 'border-border text-slate hover:border-accent-from'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </fieldset>

        <div>
          <label className="flex items-center gap-3 text-sm text-slate">
            <input
              type="checkbox"
              checked={textOnly}
              onChange={(e) => {
                setTextOnly(e.target.checked);
                if (e.target.checked) {
                  setImage(null);
                  setPickerKey((key) => key + 1);
                }
              }}
            />
            Text only (publish the details without any image)
          </label>
          {textOnly ? null : <ImagePicker key={pickerKey} onChange={setImage} />}
        </div>

        <label className="flex items-start gap-3 text-xs leading-relaxed text-slate">
          <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} className="mt-0.5" />
          <span>
            This is genuine recognition and is safe to share publicly: names, client, and company details are covered
            or anonymized, and I have permission to post it. (This repository is public, including its history.)
          </span>
        </label>

        <button type="submit" disabled={!ready || busy} className={primaryButtonClass}>
          {busy ? 'Working…' : 'Add to gallery'}
        </button>
        <StatusMessage status={status} />
      </form>

      <div className="mt-8 border-t border-border pt-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted">Published moments</h3>
          <button type="button" onClick={() => void refreshList()} disabled={!token || listBusy} className={secondaryButtonClass}>
            {listBusy ? 'Loading…' : list ? 'Refresh' : 'Load list'}
          </button>
        </div>
        {listError ? <p className="mt-3 text-sm font-medium text-red-600 dark:text-red-400">{listError}</p> : null}
        {list && list.length === 0 ? <p className="mt-3 text-sm text-muted">Nothing published yet.</p> : null}
        {list && list.length > 0 ? (
          <ul className="mt-3 divide-y divide-border">
            {list.map((moment) => (
              <li key={moment.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                <span className="text-slate">
                  <span className="font-semibold text-navy">{moment.project}</span>
                  <span className="block text-xs text-muted">
                    {moment.kind} · {formatMomentDate(moment.date)}
                    {moment.image ? ' · image' : ' · text only'}
                  </span>
                </span>
                <button type="button" onClick={() => void handleDelete(moment)} disabled={listBusy} className={secondaryButtonClass}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
