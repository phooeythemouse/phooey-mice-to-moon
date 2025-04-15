
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

// Define wallet types
export type WalletType = 'phantom' | 'solflare' | 'backpack' | null;

interface WalletContextType {
  connected: boolean;
  connecting: boolean;
  walletAddress: string | null;
  balance: number | null;
  walletType: WalletType;
  connectWallet: (type: WalletType) => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType>({
  connected: false,
  connecting: false,
  walletAddress: null,
  balance: null,
  walletType: null,
  connectWallet: async () => {},
  disconnectWallet: () => {},
});

export const useWallet = () => useContext(WalletContext);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [walletType, setWalletType] = useState<WalletType>(null);

  // Initialize from localStorage on mount
  useEffect(() => {
    const savedWallet = localStorage.getItem('phooeyWallet');
    if (savedWallet) {
      try {
        const walletData = JSON.parse(savedWallet);
        setConnected(true);
        setWalletAddress(walletData.address);
        setBalance(walletData.balance);
        setWalletType(walletData.type);
      } catch (error) {
        console.error('Failed to parse wallet data:', error);
        localStorage.removeItem('phooeyWallet');
      }
    }
  }, []);

  // Check if wallet extension exists
  const checkWalletExtension = (type: WalletType): boolean => {
    if (type === 'phantom') {
      return window.solana !== undefined;
    } else if (type === 'solflare') {
      return window.solflare !== undefined;
    } else if (type === 'backpack') {
      return window.backpack !== undefined;
    }
    return false;
  };

  // Generate a random Solana-like address for demo purposes
  const generateRandomAddress = (): string => {
    const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < 44; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Generate random SOL balance
  const generateRandomBalance = (): number => {
    return Math.floor(Math.random() * 1000) / 100;
  };

  const connectWallet = async (type: WalletType): Promise<void> => {
    if (!type) return;
    
    setConnecting(true);
    
    try {
      // Check if wallet extension exists
      const extensionExists = checkWalletExtension(type);
      
      if (!extensionExists) {
        // For demo purposes, we'll simulate a connection
        // In a real app, we would show a message to install the extension
        toast.info(`${type.charAt(0).toUpperCase() + type.slice(1)} extension not detected`, {
          description: "Using simulated wallet for demo purposes",
        });
      }
      
      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate fake wallet data for demo
      const address = generateRandomAddress();
      const demoBalance = generateRandomBalance();
      
      // Save to state
      setConnected(true);
      setWalletAddress(address);
      setBalance(demoBalance);
      setWalletType(type);
      
      // Save to localStorage
      localStorage.setItem('phooeyWallet', JSON.stringify({
        address,
        balance: demoBalance,
        type
      }));
      
      toast.success('Wallet connected successfully!', {
        description: `Connected to address: ${address.substring(0, 4)}...${address.substring(address.length - 4)}`,
      });
      
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast.error('Failed to connect wallet', {
        description: 'Please try again or choose another wallet',
      });
    } finally {
      setConnecting(false);
    }
  };

  const disconnectWallet = (): void => {
    setConnected(false);
    setWalletAddress(null);
    setBalance(null);
    setWalletType(null);
    localStorage.removeItem('phooeyWallet');
    toast.info('Wallet disconnected');
  };

  return (
    <WalletContext.Provider
      value={{
        connected,
        connecting,
        walletAddress,
        balance,
        walletType,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
