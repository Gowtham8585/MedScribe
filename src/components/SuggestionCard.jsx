import React from 'react';
import { Check, X, AlertTriangle } from 'lucide-react';

export function SuggestionCard({ suggestion, onAccept, onReject }) {
  return (
    <div className="suggestion-card">
      <div className="suggestion-header">
        <AlertTriangle size={16} className="text-teal" />
        <span className="suggestion-title">Possible transcription error detected</span>
      </div>
      
      <div className="suggestion-body">
        <div className="suggestion-row">
          <span className="suggestion-label text-muted">Original</span>
          <span className="suggestion-text original-text">{suggestion.original}</span>
        </div>
        <div className="suggestion-row">
          <span className="suggestion-label text-teal">Suggested</span>
          <span className="suggestion-text suggested-text">{suggestion.suggested}</span>
        </div>
        <div className="suggestion-row">
          <span className="suggestion-label text-muted">Reason</span>
          <span className="suggestion-text reason-text">{suggestion.reason}</span>
        </div>
      </div>
      
      <div className="suggestion-actions">
        <button className="btn btn-outline-danger" onClick={onReject}>
          <X size={16} /> Keep Original
        </button>
        <button className="btn btn-primary" onClick={onAccept}>
          <Check size={16} /> Accept Change
        </button>
      </div>
    </div>
  );
}
