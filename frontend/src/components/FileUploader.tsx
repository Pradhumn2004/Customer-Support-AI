import React, { useState, useRef } from 'react';

interface FileUploaderProps {
  onUpload: (file: File) => Promise<void>;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onUpload }) => {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage('');

    try {
      await onUpload(file);
      setMessage(`Uploaded: ${file.name}`);
    } catch (err) {
      setMessage('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx,.csv,.html,.txt"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        style={{
          padding: '8px 16px',
          background: 'rgba(255,255,255,0.15)',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: 6,
          cursor: uploading ? 'not-allowed' : 'pointer',
          fontSize: 13
        }}
      >
        {uploading ? 'Uploading...' : 'Upload Doc'}
      </button>
      {message && (
        <span style={{ fontSize: 12, color: '#aaa' }}>{message}</span>
      )}
    </div>
  );
};
