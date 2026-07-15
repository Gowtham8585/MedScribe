import html2pdf from 'html2pdf.js';

export const pdfExportService = {
  async downloadPrescription(elementId, filename = 'Prescription.pdf') {
    const element = document.getElementById(elementId);
    
    if (!element) {
      throw new Error('Prescription element not found for PDF generation.');
    }

    const opt = {
      margin:       10,
      filename:     filename,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // The promise returns when generation finishes
    await html2pdf().set(opt).from(element).save();
  }
};
