import { useState, useEffect, useCallback } from 'react';

export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);
  const [recognition, setRecognition] = useState(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const reco = new SpeechRecognition();
        reco.continuous = true;
        reco.interimResults = true;
        setRecognition(reco);
      } else {
        setError('Speech recognition is not supported in this browser.');
      }
    }
  }, []);

  const startListening = useCallback((language = 'en-US') => {
    if (!recognition) {
      setError('Speech recognition is not initialized.');
      return;
    }
    
    // Convert generic selection to BCP-47 tags
    // "auto" usually just defaults to browser language, or we can use generic en-US and ta-IN based on selection
    if (language === 'auto' || language === 'en-ta') {
      // Browsers don't support dual language well natively, fallback to mostly English with some Tamil detection if supported, or default to generic.
      recognition.lang = 'en-IN'; // Indian English handles mix better natively sometimes
    } else {
      recognition.lang = language;
    }

    recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + ' ';
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      
      // We append the final transcript and show interim
      if (finalTranscript) {
        setTranscript((prev) => (prev + ' ' + finalTranscript).trim());
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setError(event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      // In continuous mode, if it ends unexpectedly, we might want to restart, but for now just stop
      setIsListening(false);
    };

    try {
      recognition.start();
      setIsListening(true);
      setError(null);
    } catch (err) {
      console.error(err);
      // Already started error handling
      if (err.name === 'InvalidStateError') {
         // It's already running
      }
    }
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);
    }
  }, [recognition, isListening]);
  
  const resetTranscript = useCallback(() => {
    setTranscript('');
  }, []);

  return {
    isListening,
    transcript,
    setTranscript,
    startListening,
    stopListening,
    resetTranscript,
    error,
    isSupported: !!recognition
  };
}
