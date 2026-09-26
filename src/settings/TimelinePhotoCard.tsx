import { useState, type FormEvent } from 'react';
import { recognition } from '../data/content';
import ImagePicker from './ImagePicker';
import { removeFile, timelinePhotoPath, uploadTimelinePhoto } from './github';
import { fieldClass, primaryButtonClass, secondaryButtonClass, StatusMessage, type Status } from './status';

export default function TimelinePhotoCard({ token }: { token: string }) {
  const events = recognition.timeline.events;
  const [eventId, setEventId] = useState(events[0]?.id ?? '');
  const [image, setImage] = useState<Blob | null>(null);
  const [pickerKey, setPickerKey] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  const busy = status.kind === 'uploading';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!token || !image || !confirmed || !eventId) return;
    setStatus({ kind: 'uploading' });
    const result = await uploadTimelinePhoto(token, eventId, image);
    if (result.ok) {
      setStatus({ kind: 'success', commitUrl: result.commitUrl });
      setImage(null);
      setConfirmed(false);
      setPickerKey((key) => key + 1);
    } else {
      setStatus({ kind: 'error', message: result.message });
    }
  };

  const handleRemove = async () => {
    if (!token || !eventId || !window.confirm('Remove the photo for this timeline event?')) return;
    setStatus({ kind: 'uploading' });
    const result = await removeFile(token, timelinePhotoPath(eventId), `Remove ${eventId} timeline photo via settings page`);
    setStatus(result.ok ? { kind: 'success', commitUrl: result.commitUrl } : { kind: 'error', message: result.message });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 rounded-2xl border border-border bg-surface p-6">
      <h2 className="text-sm font-bold uppercase tracking-wider text-muted">4. Timeline event photo</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate">
        Adds optional photo documentation to an event in the Team Achievement Timeline. Events without a photo
        show no placeholder.
      </p>

      <select
        value={eventId}
        onChange={(e) => {
          setEventId(e.target.value);
          setStatus({ kind: 'idle' });
        }}
        className={`mt-4 ${fieldClass}`}
      >
        {events.map((event) => (
          <option key={event.id} value={event.id}>
            {event.title}
          </option>
        ))}
      </select>

      <ImagePicker key={pickerKey} onChange={setImage} />

      <label className="mt-4 flex items-start gap-3 text-xs leading-relaxed text-slate">
        <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} className="mt-0.5" />
        <span>
          This image is safe to share publicly: names, client, and company details are covered or absent, and I
          have permission to post it. (This repository is public, so anything uploaded is visible.)
        </span>
      </label>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button type="submit" disabled={!token || !image || !confirmed || busy} className={primaryButtonClass}>
          {busy ? 'Working…' : 'Upload photo'}
        </button>
        <button type="button" onClick={handleRemove} disabled={!token || busy} className={secondaryButtonClass}>
          Remove current photo
        </button>
      </div>

      <StatusMessage status={status} />
    </form>
  );
}
