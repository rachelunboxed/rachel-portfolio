import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import ImageRedactor from './ImageRedactor';
import { fileInputClass, secondaryButtonClass } from './status';

type ImagePickerProps = {
  onChange: (image: Blob | null) => void;
};

// Mount with a changing `key` to reset after a successful upload.
export default function ImagePicker({ onChange }: ImagePickerProps) {
  const [pending, setPending] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const previewRef = useRef<string | null>(null);

  useEffect(
    () => () => {
      if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    },
    [],
  );

  const replacePreview = (url: string | null) => {
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    previewRef.current = url;
    setPreview(url);
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    replacePreview(null);
    onChange(null);
    setPending(file);
  };

  const handleConfirm = (image: Blob) => {
    replacePreview(URL.createObjectURL(image));
    setPending(null);
    onChange(image);
  };

  const handleChangeImage = () => {
    replacePreview(null);
    setPending(null);
    onChange(null);
  };

  if (pending) {
    return <ImageRedactor file={pending} onConfirm={handleConfirm} onCancel={handleChangeImage} />;
  }

  if (preview) {
    return (
      <div className="mt-4 rounded-xl border border-border bg-bg p-4">
        <img src={preview} alt="Prepared upload preview" className="max-h-56 rounded-lg border border-border" />
        <button type="button" onClick={handleChangeImage} className={`mt-3 ${secondaryButtonClass}`}>
          Choose a different image
        </button>
      </div>
    );
  }

  return <input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleFile} className={`mt-4 ${fileInputClass}`} />;
}
