import { useEffect, useState, useCallback } from 'react';
import { useToastStore, type Toast } from '../store/toastStore';

const toastAlertClasses: Record<Toast['type'], string> = {
  success: 'alert-success',
  error: 'alert-error',
  warning: 'alert-warning',
  info: 'alert-info',
};

interface ToastItemProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

function ToastItem({ toast, onRemove }: ToastItemProps) {
  const [progress, setProgress] = useState(100);
  const [isExiting, setIsExiting] = useState(false);

  const handleRemove = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onRemove(toast.id);
    }, 200);
  }, [toast.id, onRemove]);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = 100 - (elapsed / toast.duration) * 100;
      if (remaining <= 0) {
        clearInterval(interval);
        handleRemove();
      } else {
        setProgress(remaining);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [toast.duration, handleRemove]);

  return (
    <div
      className={`alert relative mb-2 w-full max-w-sm shadow-lg transition-all duration-200 ${
        toastAlertClasses[toast.type]
      } ${isExiting ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
        {toast.type === 'success' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />}
        {toast.type === 'error' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />}
        {toast.type === 'warning' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />}
        {toast.type === 'info' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
      </svg>
      <span className="flex-1 text-sm">{toast.message}</span>
      <button
        type="button"
        className="btn btn-ghost btn-xs"
        onClick={handleRemove}
        aria-label="Close toast"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      {/* Progress bar */}
      <div
        className="absolute bottom-0 left-0 h-1 rounded-b-lg bg-current opacity-20 transition-[width] duration-[16ms] ease-linear"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default function Toast() {
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);

  return (
    <div className="toast toast-top toast-end z-50 max-h-screen overflow-hidden pt-20 p-4">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
}
