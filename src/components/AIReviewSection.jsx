import React, { useState } from 'react';
import { Card } from './Card';
import { Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { aiService } from '../services/aiService';
import { SuggestionCard } from './SuggestionCard';

export function AIReviewSection({ prescriptionText, setPrescriptionText }) {
  const [isReviewing, setIsReviewing] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [reviewedOnce, setReviewedOnce] = useState(false);
  const [error, setError] = useState(null);

  const handleReview = async () => {
    if (!prescriptionText.trim()) return;
    
    setIsReviewing(true);
    setError(null);
    try {
      const results = await aiService.reviewTranscription(prescriptionText);
      setSuggestions(results || []);
      setReviewedOnce(true);
    } catch (err) {
      console.error(err);
      setError("AI Service failed to respond. You can safely proceed without AI review.");
    } finally {
      setIsReviewing(false);
    }
  };

  const handleAccept = (suggestionId, original, suggested) => {
    // Replace the first occurrence of original with suggested
    // In a production app with complex overlaps, we'd need more precise string manipulation or indices.
    setPrescriptionText(prev => prev.replace(original, suggested));
    
    // Remove the card
    setSuggestions(prev => prev.filter(s => s.id !== suggestionId));
  };

  const handleReject = (suggestionId) => {
    // Just remove the card
    setSuggestions(prev => prev.filter(s => s.id !== suggestionId));
  };

  return (
    <Card title="AI Review" icon={<Sparkles size={20} />} className="ai-card">
      <p className="text-sm text-muted" style={{ marginBottom: '1rem' }}>
        AI checks the transcription for possible speech recognition and spelling errors.
      </p>
      
      {error && (
        <div style={{ padding: '0.75rem', backgroundColor: '#fef2f2', color: '#ef4444', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.875rem' }}>
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="suggestions-container" style={{ marginBottom: '1rem' }}>
          {suggestions.map((suggestion) => (
            <SuggestionCard 
              key={suggestion.id}
              suggestion={suggestion}
              onAccept={() => handleAccept(suggestion.id, suggestion.original, suggestion.suggested)}
              onReject={() => handleReject(suggestion.id)}
            />
          ))}
          
          <p className="text-xs text-muted" style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <AlertCircle size={12} />
            AI only suggests corrections. Changes are applied only after doctor approval.
          </p>
        </div>
      )}

      {reviewedOnce && suggestions.length === 0 && !isReviewing && !error && (
        <div style={{ padding: '1rem', backgroundColor: '#f0fdfa', color: '#0f766e', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={16} />
          No errors detected. The transcription looks good!
        </div>
      )}

      <button 
        className="btn btn-primary" 
        onClick={handleReview}
        disabled={isReviewing || !prescriptionText.trim()}
        style={{ width: '100%', padding: '0.75rem' }}
      >
        {isReviewing ? (
          <>
            <Loader2 size={16} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} /> 
            Reviewing...
          </>
        ) : (
          <>
            <Sparkles size={16} /> 
            Review Prescription
          </>
        )}
      </button>
      
      {/* Basic keyframes for loader just in case we don't have global spin */}
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </Card>
  );
}
