import React from 'react';

export function Card({ title, children, className = '', icon = null }) {
  return (
    <div className={`card ${className}`}>
      {title && (
        <div className="card-header">
          <h2 className="card-title">
            {icon && <span className="text-teal">{icon}</span>}
            {title}
          </h2>
        </div>
      )}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}
