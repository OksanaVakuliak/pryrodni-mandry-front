'use client';
import { Toaster, toast } from 'react-hot-toast';

const ToasterProvider = () => {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        className: 'custom-toast',
        duration: 4000,
        style: {
          background: 'var(--color-scheme-1-background)',
          color: 'var(--active-color)',
          borderRadius: '12px',
          fontSize: '18px',
          fontWeight: 500,
          padding: '16px 40px 16px 20px',
          border: '1px solid #1eb441',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          minWidth: '350px',
          cursor: 'pointer',
        },
        success: { duration: 2500 },
        error: {
          duration: 3000,
          style: {
            background: '#FFF5F5',
            border: '1px solid #FFCCCC',
            color: '#CB2431',
          },
        },
      }}
    >
      {(t) => (
        <div
          onClick={() => toast.dismiss(t.id)}
          className={t.className}
          style={{
            ...t.style,
            display: 'flex',
            alignItems: 'center',
            opacity: t.visible ? 1 : 0,
            transition: 'all 0.2s ease-in-out',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {t.icon}
            {typeof t.message === 'function' ? t.message(t) : t.message}
          </div>
        </div>
      )}
    </Toaster>
  );
};

export default ToasterProvider;
