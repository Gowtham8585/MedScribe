import React, { useState, useEffect } from 'react';
import { X, MessageCircle } from 'lucide-react';

export function WhatsAppModal({ isOpen, onClose, patientData, clinicName }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  
  useEffect(() => {
    if (patientData?.whatsappNumber) {
      setPhoneNumber(patientData.whatsappNumber);
    }
  }, [patientData]);

  if (!isOpen) return null;

  const patientName = patientData?.patientName || 'Patient';
  const cName = clinicName || 'Our Clinic';

  const message = `Hello ${patientName},\n\nYour prescription from ${cName} is ready.\n\nPlease follow the medicine schedule provided by your doctor.`;

  const handleSend = () => {
    // Clean up phone number (remove spaces, dashes)
    const cleanNumber = phoneNumber.replace(/[\s-]/g, '');
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">Send Prescription via WhatsApp</h3>
          <button className="icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className="modal-body">
          <div className="form-group">
            <label className="form-label" htmlFor="wa-patient-name">Patient Name</label>
            <input 
              type="text" 
              id="wa-patient-name" 
              className="form-input" 
              value={patientName} 
              readOnly 
            />
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="wa-phone">WhatsApp Number</label>
            <input 
              type="tel" 
              id="wa-phone" 
              className="form-input" 
              value={phoneNumber} 
              onChange={(e) => setPhoneNumber(e.target.value)} 
              placeholder="+1 234 567 8900"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Message Preview</label>
            <div className="message-preview">
              {message}
            </div>
          </div>
          
          <p className="text-xs text-muted" style={{ marginTop: 'var(--space-4)' }}>
            Note: WhatsApp will open with the prepared message. The prescription PDF can be shared as an attachment directly from your device.
          </p>
        </div>
        
        <div className="modal-footer">
          <button className="btn btn-outline-danger" style={{ border: '1px solid var(--color-border)', color: 'var(--color-text-main)' }} onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSend} disabled={!phoneNumber}>
            <MessageCircle size={16} /> Open WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
