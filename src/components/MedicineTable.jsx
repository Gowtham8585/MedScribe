import React from 'react';

export function MedicineTable({ medicines, language = 'en' }) {
  const isTamil = language === 'ta';

  const t = {
    medicine: isTamil ? 'மருந்து' : 'Medicine',
    morning: isTamil ? 'காலை' : 'Morning',
    afternoon: isTamil ? 'மதியம்' : 'Afternoon',
    evening: isTamil ? 'இரவு' : 'Evening',
    duration: isTamil ? 'கால அளவு' : 'Duration',
  };

  const translateInstruction = (text) => {
    if (!isTamil) return text;
    if (text === 'Before Food') return 'உணவுக்கு முன்';
    if (text === 'After Food') return 'உணவுக்குப் பிறகு';
    return text;
  };

  if (!medicines || medicines.length === 0) return null;

  return (
    <table className="medicine-table">
      <thead>
        <tr>
          <th>{t.medicine}</th>
          <th>{t.morning}</th>
          <th>{t.afternoon}</th>
          <th>{t.evening}</th>
          <th>{t.duration}</th>
        </tr>
      </thead>
      <tbody>
        {medicines.map((med, index) => (
          <tr key={index}>
            <td className="med-name">{med.name}</td>
            <td>{translateInstruction(med.morning)}</td>
            <td>{translateInstruction(med.afternoon)}</td>
            <td>{translateInstruction(med.evening)}</td>
            <td>{med.duration}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
