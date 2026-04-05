'use client';

import { Toaster } from 'react-hot-toast';

const ToasterProvider = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={12}
      toastOptions={{
        duration: 4000,
        style: {
          background: '#eef8ee',
          color: '#1b391b',
          borderRadius: '12px',
          fontSize: '18px',
          fontWeight: 500,
          padding: '16px 20px',
          border: '1px solid #1eb441',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          minWidth: '350px',
        },
        success: {
          style: {
            border: '1px solid #A3D9B1',
          },
          iconTheme: {
            primary: '#2D9CDB',
            secondary: '#F0F9F4',
          },
        },
        error: {
          style: {
            background: '#FFF5F5',
            border: '1px solid #FFCCCC',
            color: '#CB2431',
          },
          iconTheme: {
            primary: '#CB2431',
            secondary: '#FFF5F5',
          },
        },
      }}
    />
  );
};
export default ToasterProvider;
