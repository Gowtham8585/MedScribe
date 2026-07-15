import React, { useState, useEffect } from 'react';
import { Card } from './Card';
import { Mic, MicOff, Stethoscope } from 'lucide-react';
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

  // Sync the hook's transcript with our parent state if it changes
  useEffect(() => {
    if (transcript && isListening) {
      // Simple way to handle continuous dictation mapping to the text area
      // For a real app we'd carefully merge interim and final, but here we'll just 
      // replace the text while recording to match the transcript.
      // A better approach is to append to existing text.
      // If we just started, we want to append.
    }
  }, [transcript, isListening]);

  // Handle manual typing
  const handleTextChange = (e) => {
    setPrescriptionText(e.target.value);
    setTranscript(e.target.value); // Keep hook in sync if possible
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
      // On stop, append whatever transcript we got to the main text
      setPrescriptionText(prev => (prev + (prev && transcript ? ' ' : '') + transcript).trim());
      setTranscript(''); // Clear hook transcript for next time
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
          {isListening ? <MicOff size={32} /> : <Mic size={32} />}
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
