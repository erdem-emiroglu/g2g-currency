'use client';

import { createContext, useContext, ReactNode, useState } from 'react';

export enum ModalNames {
    DELETE_MODAL = 'DELETE_MODAL',
    CREATE_MODAL = 'CREATE_MODAL',
    UPDATE_MODAL = 'UPDATE_MODAL',
}

type ModalContextType = {
    openModal: (modalId: ModalNames, modalProps?: any) => void;
    closeModal: () => void;
    currentModal?: ModalNames;
    modalProps: any;
};

const ModalContext = createContext<ModalContextType>({} as ModalContextType);

type ModalProviderProps = {
    children: ReactNode;
};


export const ModalProvider = ({ children }: ModalProviderProps) => {
    const [currentModal, setCurrentModal] = useState<ModalNames>();
    const [modalProps, setModalProps] = useState<any>({});

    const openModal = (modalId: ModalNames, props?: any) => {
        setCurrentModal(modalId);
        setModalProps(props || {});
    };

    const closeModal = () => {
        setCurrentModal(undefined);
        setModalProps({});
    };

    return (
        <ModalContext.Provider value={{ openModal, closeModal, currentModal, modalProps }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};
