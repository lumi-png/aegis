import { useCallback } from 'react';
import { useToastStore, type ToastType } from '../store/toastStore';

interface UseToastReturn {
  toast: (message: string, type: ToastType, duration?: number) => string;
  success: (message: string, duration?: number) => string;
  error: (message: string, duration?: number) => string;
  warning: (message: string, duration?: number) => string;
  info: (message: string, duration?: number) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

export function useToast(): UseToastReturn {
  const addToast = useToastStore((state) => state.addToast);
  const removeToast = useToastStore((state) => state.removeToast);

  const toast = useCallback(
    (message: string, type: ToastType, duration?: number) => {
      return addToast(message, type, duration);
    },
    [addToast]
  );

  const success = useCallback(
    (message: string, duration?: number) => addToast(message, 'success', duration),
    [addToast]
  );

  const error = useCallback(
    (message: string, duration?: number) => addToast(message, 'error', duration),
    [addToast]
  );

  const warning = useCallback(
    (message: string, duration?: number) => addToast(message, 'warning', duration),
    [addToast]
  );

  const info = useCallback(
    (message: string, duration?: number) => addToast(message, 'info', duration),
    [addToast]
  );

  const dismiss = useCallback(
    (id: string) => removeToast(id),
    [removeToast]
  );

  const dismissAll = useCallback(() => {
    useToastStore.getState().toasts.forEach((t) => removeToast(t.id));
  }, [removeToast]);

  return { toast, success, error, warning, info, dismiss, dismissAll };
}
