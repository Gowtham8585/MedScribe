import React from 'react';
import { Card } from './Card';
import { UserPlus } from 'lucide-react';

export function DoctorDetailsForm({ doctorData, setDoctorData, rememberMe, setRememberMe }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card title="Doctor Details" icon={<UserPlus size={20} />}>
      <div className="grid-2">
        <div className="form-group">
          <label className="form-label" htmlFor="doctorName">Doctor Name</label>
          <input
            type="text"
            id="doctorName"
            name="doctorName"
            className="form-input"
            placeholder="Dr. John Doe"
            value={doctorData.doctorName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="qualification">Qualification</label>
          <input
            type="text"
            id="qualification"
            name="qualification"
            className="form-input"
            placeholder="MBBS, MD"
            value={doctorData.qualification}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="regNumber">Medical Registration Number</label>
          <input
            type="text"
            id="regNumber"
            name="regNumber"
            className="form-input"
            placeholder="12345"
            value={doctorData.regNumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="clinicName">Clinic Name</label>
          <input
            type="text"
            id="clinicName"
            name="clinicName"
            className="form-input"
            placeholder="City Hospital"
            value={doctorData.clinicName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="clinicAddress">Clinic Address</label>
          <input
            type="text"
            id="clinicAddress"
            name="clinicAddress"
            className="form-input"
            placeholder="123 Health Ave"
            value={doctorData.clinicAddress}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="clinicPhone">Clinic Phone Number</label>
          <input
            type="text"
            id="clinicPhone"
            name="clinicPhone"
            className="form-input"
            placeholder="+1 234 567 8900"
            value={doctorData.clinicPhone}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <div className="checkbox-group">
        <input
          type="checkbox"
          id="rememberMe"
          className="checkbox-input"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <label htmlFor="rememberMe" className="checkbox-label">
          Remember Doctor Details on this device
        </label>
      </div>
      
      <p className="text-xs text-muted" style={{ marginTop: '0.5rem' }}>
        Only doctor profile details are stored locally on this device.
      </p>
    </Card>
  );
}
