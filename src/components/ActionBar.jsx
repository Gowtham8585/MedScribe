import React, { useState } from 'react';
import { Printer, Download, MessageCircle, Loader2 } from 'lucide-react';
import { pdfExportService } from '../services/pdfExportService';
import { WhatsAppModal } from './WhatsAppModal';

export function ActionBar({ doctorData, patientData }) {
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    setIsPdfGenerating(true);
    try {
      // The element ID must match the one in PrescriptionPreview
      await pdfExportService.downloadPrescription('prescription-document', `${patientData?.patientName || 'Patient'}_Prescription.pdf`);
    } catch (error) {
      console.error(error);
      alert('Failed to generate PDF. Please try printing instead.');
    } finally {
      setIsPdfGenerating(false);
    }
  };

  return (
    <>
      <div className="action-bar">
        <button className="btn btn-outline-danger" style={{ border: '1px solid var(--color-border)', color: 'var(--color-text-main)' }} onClick={handlePrint}>
          <Printer size={18} /> Print
        </button>
        
        <button className="btn btn-primary" onClick={handleDownloadPDF} disabled={isPdfGenerating}>
          {isPdfGenerating ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />} 
          {isPdfGenerating ? 'Generating...' : 'Download PDF'}
        </button>
        
        <button 
          className="btn" 
          style={{ backgroundColor: '#10b981', color: 'white' }}
          onClick={() => setIsWhatsAppOpen(true)}
        >
          <MessageCircle size={18} /> Send via WhatsApp
        </button>
      </div>

      <WhatsAppModal 
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        patientData={patientData}
        clinicName={doctorData?.clinicName}
      />
    </>
  );
}
