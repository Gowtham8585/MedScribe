import React from 'react';
import { ShieldCheck } from 'lucide-react';

export function PrivacyFooter() {
  return (
    <footer className="privacy-footer">
      <div className="privacy-badge">
        <ShieldCheck size={14} />
        <span>Privacy First</span>
      </div>
      <p className="text-sm text-muted">
        Prescription and patient information are not permanently stored by MediScribe.
      </p>
    </footer>
  );
}
