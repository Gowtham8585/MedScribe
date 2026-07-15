import React from 'react';
import { Header } from './Header';

export function Layout({ children }) {
  return (
    <div className="app-container">
      <Header />
      <main className="workspace">
        {children}
      </main>
    </div>
  );
}
