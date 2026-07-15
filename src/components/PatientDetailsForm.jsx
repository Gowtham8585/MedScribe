import React from 'react';
import { Card } from './Card';
import { Users } from 'lucide-react';

export function PatientDetailsForm({ patientData, setPatientData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card title="Patient Details" icon={<Users size={20} />}>
      <div className="grid-2">
        <div className="form-group">
          <label className="form-label" htmlFor="patientName">Patient Name</label>
          <input
            type="text"
            id="patientName"
            name="patientName"
            className="form-input"
            placeholder="Jane Doe"
            value={patientData.patientName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            className="form-input"
            placeholder="45"
            value={patientData.age}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            className="form-input"
            value={patientData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="date">Date</label>
          <input
            type="text"
            id="date"
            name="date"
            className="form-input"
            value={patientData.date}
            readOnly
          />
        </div>
      </div>
    </Card>
  );
}
