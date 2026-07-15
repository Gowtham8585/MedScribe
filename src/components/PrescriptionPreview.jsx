import React, { useState, useEffect } from 'react';
import { MedicineTable } from './MedicineTable';
import { parsePrescriptionText } from '../utils/textToTableParser';
import { Loader2, FileText, Globe } from 'lucide-react';
import { Card } from './Card';

export function PrescriptionPreview({ doctorData, patientData, prescriptionText }) {
  const [parsedData, setParsedData] = useState(null);
  const [isParsing, setIsParsing] = useState(false);
  const [tableLanguage, setTableLanguage] = useState('en');

  useEffect(() => {
    // We only re-parse when they explicitly want to preview. 
    // In a real app, maybe an explicit "Generate Preview" button is better, 
    // but we can auto-generate it when prescriptionText exists.
    let isMounted = true;
    
    const parse = async () => {
      if (!prescriptionText || prescriptionText.trim() === '') {
        setParsedData(null);
        return;
      }
      setIsParsing(true);
      const data = await parsePrescriptionText(prescriptionText);
      if (isMounted) {
        setParsedData(data);
        setIsParsing(false);
      }
    };
    
    // Add a debounce so it doesn't parse on every keystroke
    const timer = setTimeout(() => {
      parse();
    }, 1500);
    
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [prescriptionText]);

  // Always render the preview card so doctors can print blank prescriptions.
  // We just won't show the parsing loader if there's no text.


  return (
    <Card title="Prescription Preview" icon={<FileText size={20} />} className="preview-card">
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <button 
          className="btn btn-outline-danger" 
          style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-main)' }}
          onClick={() => setTableLanguage(prev => prev === 'en' ? 'ta' : 'en')}
        >
          <Globe size={16} /> {tableLanguage === 'en' ? 'Switch to Tamil Table' : 'Switch to English Table'}
        </button>
      </div>

      {isParsing ? (
        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
          <Loader2 size={32} className="animate-spin" style={{ animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }} />
          <p>Structuring prescription...</p>
        </div>
      ) : (
        <div className="a4-preview" id="prescription-document">
          <div className="prescription-header">
            <div className="clinic-name">{doctorData.clinicName || 'Clinic Name'}</div>
            <div>{doctorData.clinicAddress || 'Clinic Address'}</div>
            <div>Phone: {doctorData.clinicPhone || 'Phone Number'}</div>
            <div style={{ marginTop: '10px' }}>
              <span className="doctor-name">{doctorData.doctorName || 'Dr. Name'}</span>
              <span> - {doctorData.qualification || 'Qualification'}</span>
            </div>
            <div>Reg. No: {doctorData.regNumber || 'Reg Number'}</div>
          </div>

          <div className="patient-info-row">
            <div>
              <strong>Patient:</strong> {patientData.patientName || 'Name'}
            </div>
            <div>
              <strong>Age/Sex:</strong> {patientData.age || '--'} / {patientData.gender || '--'}
            </div>
            <div>
              <strong>Date:</strong> {patientData.date}
            </div>
          </div>

          {parsedData?.symptoms && (
            <div className="prescription-section">
              <div className="section-title">Symptoms / Diagnosis</div>
              <p>{parsedData.symptoms}</p>
            </div>
          )}

          <div className="prescription-section">
            <div className="section-title">Rx Medicines</div>
            <MedicineTable medicines={parsedData?.medicines} language={tableLanguage} />
          </div>

          {parsedData?.advice && parsedData.advice.length > 0 && (
            <div className="prescription-section">
              <div className="section-title">Advice</div>
              <ul style={{ paddingLeft: '20px' }}>
                {parsedData.advice.map((item, index) => (
                  <li key={index} style={{ marginBottom: '4px' }}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {parsedData?.followUp && (
            <div className="prescription-section">
              <div className="section-title">Follow-Up</div>
              <p>{parsedData.followUp}</p>
            </div>
          )}

          <div className="prescription-footer" style={{ justifyContent: 'flex-end' }}>
            <div className="signature-box">
              <div className="signature-line">Doctor Signature</div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
