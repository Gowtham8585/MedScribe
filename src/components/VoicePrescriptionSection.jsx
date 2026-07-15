import React, { useState, useEffect } from 'react';
import { Card } from './Card';
import { Mic, Square, Stethoscope } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

export function VoicePrescriptionSection({ prescriptionText, setPrescriptionText }) {
  const [language, setLanguage] = useState('auto');
  const {
    isListening,
    transcript,
    setTranscript,
    startListening,
    stopListening,
    error,
    isSupported
  } = useSpeechRecognition();

  // Sync the hook's transcript with our parent state if it changes or stops
  useEffect(() => {
    // If it stopped listening (like when a mobile browser pauses) and we have a transcript,
    // we MUST commit it to the main text area so the user doesn't lose what they said.
    if (!isListening && transcript) {
      setPrescriptionText(prev => (prev + (prev ? ' ' : '') + transcript).trim());
      setTranscript('');
    }
  }, [isListening, transcript, setPrescriptionText, setTranscript]);

  // Handle manual typing
  const handleTextChange = (e) => {
    setPrescriptionText(e.target.value);
    setTranscript(e.target.value); // Keep hook in sync if possible
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
      // Merging is now handled by the useEffect above when isListening becomes false
    } else {
      // Clear transcript before starting fresh
      setTranscript('');
      startListening(language);
    }
  };

  return (
    <Card title="Voice Prescription" icon={<Stethoscope size={20} />} className="voice-card">
      {!isSupported && (
        <div style={{ color: 'red', marginBottom: '1rem', fontSize: '0.875rem' }}>
          Warning: Speech recognition is not supported in this browser. Please use Chrome.
        </div>
      )}
      
      {error && (
        <div style={{ color: 'red', marginBottom: '1rem', fontSize: '0.875rem' }}>
          Microphone Error: {error}
        </div>
      )}
      
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '1rem' }}>
        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)}
          className="form-input"
          style={{ width: 'auto', minWidth: '150px' }}
        >
          <option value="auto">Auto Detect</option>
          <option value="ta-IN">தமிழ்</option>
          <option value="en-US">English</option>
          <option value="en-ta">Tamil + English</option>
        </select>
      </div>

      <div className="mic-container">
        <button 
          className={`mic-button ${isListening ? 'recording' : ''}`}
          onClick={toggleListening}
          disabled={!isSupported}
        >
          {isListening ? <Square size={24} fill="currentColor" /> : <Mic size={32} />}
        </button>
        <span className={`mic-status-text ${isListening ? 'recording' : 'text-muted'}`}>
          {isListening ? 'Listening...' : 'Start Speaking'}
        </span>
        <span className="text-xs text-muted">
          Speak naturally in Tamil, English, or Tamil + English.
        </span>
      </div>

      <div className="form-group" style={{ marginTop: 'var(--space-6)' }}>
        <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Live Transcription</span>
          <span className="text-xs text-teal">Editable</span>
        </label>
        <textarea 
          className="form-textarea"
          value={isListening ? (prescriptionText + (prescriptionText ? ' ' : '') + transcript) : prescriptionText}
          onChange={handleTextChange}
          placeholder="Speak into the microphone or type the prescription here..."
          dir="auto"
        />
      </div>
    </Card>
  );
}
