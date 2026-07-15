import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { DoctorDetailsForm } from './components/DoctorDetailsForm';
import { PatientDetailsForm } from './components/PatientDetailsForm';
import { VoicePrescriptionSection } from './components/VoicePrescriptionSection';
import { AIReviewSection } from './components/AIReviewSection';
import { PrescriptionPreview } from './components/PrescriptionPreview';
import { ActionBar } from './components/ActionBar';
import { PrivacyFooter } from './components/PrivacyFooter';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [rememberMe, setRememberMe] = useLocalStorage('medscribe-remember-doctor', false);
  
  const initialDoctorState = {
    doctorName: '',
    qualification: '',
    regNumber: '',
    clinicName: '',
    clinicAddress: '',
    clinicPhone: ''
  };

  const [savedDoctorData, setSavedDoctorData] = useLocalStorage('medscribe-doctor-data', initialDoctorState);
  
  const [doctorData, setDoctorData] = useState(() => {
    return rememberMe ? savedDoctorData : initialDoctorState;
  });

  useEffect(() => {
    if (rememberMe) {
      setSavedDoctorData(doctorData);
    } else {
      setSavedDoctorData(initialDoctorState);
    }
  }, [doctorData, rememberMe, setSavedDoctorData]);

  const [patientData, setPatientData] = useState({
    patientName: '',
    age: '',
    gender: '',
    date: new Date().toLocaleDateString('en-GB')
  });

  const [prescriptionText, setPrescriptionText] = useState('');

  return (
    <Layout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        <DoctorDetailsForm 
          doctorData={doctorData} 
          setDoctorData={setDoctorData} 
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
        />
        
        <PatientDetailsForm 
          patientData={patientData} 
          setPatientData={setPatientData} 
        />

        <VoicePrescriptionSection 
          prescriptionText={prescriptionText}
          setPrescriptionText={setPrescriptionText}
        />

        <AIReviewSection
          prescriptionText={prescriptionText}
          setPrescriptionText={setPrescriptionText}
        />

        <PrescriptionPreview 
          doctorData={doctorData}
          patientData={patientData}
          prescriptionText={prescriptionText}
        />
        
        <ActionBar 
          doctorData={doctorData}
          patientData={patientData}
        />
      </div>
      
      <PrivacyFooter />
    </Layout>
  );
}

export default App;
