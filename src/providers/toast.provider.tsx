'use client';

import { createContext, useContext, ReactNode, useState } from 'react';

type ToastVariant = 'success' | 'error';
type ToastParams = {
    text: string;
    variant: ToastVariant;
}

type ToastContextType = {
    openToast: (toastParams: ToastParams) => void;
    toast?: ToastParams;
    onClose: () => void;
};

const ToastContext = createContext<ToastContextType>({} as ToastContextType);

type ToastProviderProps = {
    children: ReactNode;
};

export const ToastProvider = ({ children }: ToastProviderProps) => {
    const [toast, setToast] = useState<ToastParams>();

    const openToast = (toastParams: ToastParams) => {
        setToast(toastParams);
    };

    const onClose = () => {
        setToast(undefined);
    }

    return (
        <ToastContext.Provider value={{ openToast, toast, onClose }}>
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
