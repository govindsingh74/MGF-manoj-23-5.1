import React, { createContext, useState, useContext, ReactNode } from 'react';

type WalletContextType = {
  connected: boolean;
  address: string | null;
  connectWallet: () => void;
  disconnectWallet: () => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // This is a mock implementation for the demo
  const connectWallet = () => {
    // In a real implementation, this would connect to an actual wallet
    const mockAddress = 'MGFX' + Math.random().toString(16).slice(2, 8) + '...';
    setAddress(mockAddress);
    setConnected(true);
    setIsModalOpen(false);
  };

  const disconnectWallet = () => {
    setAddress(null);
    setConnected(false);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <WalletContext.Provider
      value={{
        connected,
        address,
        connectWallet,
        disconnectWallet,
        isModalOpen,
        openModal,
        closeModal
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}