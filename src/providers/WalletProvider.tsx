
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();

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

  // Check for wallet connection on mobile (for when user returns from wallet app)
  useEffect(() => {
    if (isMobile && !connected) {
      const checkWalletConnection = async () => {
        // Check for each wallet type
        if (window.solana?.isPhantom && window.solana?.publicKey) {
          const address = window.solana.publicKey.toString();
          const balance = await fetchWalletBalance(address);
          
          // Auto-connect since we detected the wallet is connected
          setConnected(true);
          setWalletAddress(address);
          setBalance(balance);
          setWalletType('phantom');
          
          // Save to localStorage
          localStorage.setItem('phooeyWallet', JSON.stringify({
            address,
            balance,
            type: 'phantom'
          }));
          
          toast.success('Wallet connected automatically!');
        } 
        else if (window.solflare?.publicKey) {
          const address = window.solflare.publicKey.toString();
          const balance = await fetchWalletBalance(address);
          
          setConnected(true);
          setWalletAddress(address);
          setBalance(balance);
          setWalletType('solflare');
          
          localStorage.setItem('phooeyWallet', JSON.stringify({
            address,
            balance,
            type: 'solflare'
          }));
          
          toast.success('Wallet connected automatically!');
        }
        else if (window.backpack?.publicKey) {
          const address = window.backpack.publicKey.toString();
          const balance = await fetchWalletBalance(address);
          
          setConnected(true);
          setWalletAddress(address);
          setBalance(balance);
          setWalletType('backpack');
          
          localStorage.setItem('phooeyWallet', JSON.stringify({
            address,
            balance,
            type: 'backpack'
          }));
          
          toast.success('Wallet connected automatically!');
        }
      };
      
      // Check for wallet connection
      checkWalletConnection();
      
      // Also add an event listener for visibility changes to handle when user returns from wallet app
      const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible') {
          checkWalletConnection();
        }
      };
      
      document.addEventListener('visibilitychange', handleVisibilityChange);
      
      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }
  }, [isMobile, connected]);

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

  // Connect to a wallet and get the balance
  const fetchWalletBalance = async (publicKey: string): Promise<number> => {
    try {
      // This would typically be a call to a Solana RPC endpoint
      // For now we'll just return a reasonable balance
      // In a production app, you'd use @solana/web3.js to query the network
      return 5.42; // Simulated balance for now
    } catch (error) {
      console.error('Error fetching balance:', error);
      return 0;
    }
  };

  const connectPhantom = async (): Promise<{address: string, balance: number}> => {
    try {
      // Request wallet connection
      const resp = await window.solana.connect();
      const address = resp.publicKey.toString();
      const balance = await fetchWalletBalance(address);
      return { address, balance };
    } catch (err) {
      console.error("Error connecting to Phantom wallet:", err);
      throw err;
    }
  };

  const connectSolflare = async (): Promise<{address: string, balance: number}> => {
    try {
      await window.solflare.connect();
      const address = window.solflare.publicKey.toString();
      const balance = await fetchWalletBalance(address);
      return { address, balance };
    } catch (err) {
      console.error("Error connecting to Solflare wallet:", err);
      throw err;
    }
  };

  const connectBackpack = async (): Promise<{address: string, balance: number}> => {
    try {
      const resp = await window.backpack.connect();
      const address = resp.publicKey.toString();
      const balance = await fetchWalletBalance(address);
      return { address, balance };
    } catch (err) {
      console.error("Error connecting to Backpack wallet:", err);
      throw err;
    }
  };

  const connectWallet = async (type: WalletType): Promise<void> => {
    if (!type) return;
    
    setConnecting(true);
    
    try {
      // Check if wallet extension exists
      const extensionExists = checkWalletExtension(type);
      
      if (!extensionExists && !isMobile) {
        toast.error(`${type.charAt(0).toUpperCase() + type.slice(1)} extension not detected`, {
          description: "Please install the wallet extension and reload the page",
        });
        setConnecting(false);
        return;
      }
      
      let address, walletBalance;
      
      // Connect to the selected wallet
      if (type === 'phantom') {
        ({ address, balance: walletBalance } = await connectPhantom());
      } else if (type === 'solflare') {
        ({ address, balance: walletBalance } = await connectSolflare());
      } else if (type === 'backpack') {
        ({ address, balance: walletBalance } = await connectBackpack());
      }
      
      // Save to state
      setConnected(true);
      setWalletAddress(address);
      setBalance(walletBalance);
      setWalletType(type);
      
      // Save to localStorage
      localStorage.setItem('phooeyWallet', JSON.stringify({
        address,
        balance: walletBalance,
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
    // Disconnect from wallet if connected
    if (walletType === 'phantom' && window.solana) {
      try {
        window.solana.disconnect();
      } catch (err) {
        console.error("Error disconnecting from Phantom:", err);
      }
    } else if (walletType === 'solflare' && window.solflare) {
      try {
        window.solflare.disconnect();
      } catch (err) {
        console.error("Error disconnecting from Solflare:", err);
      }
    } else if (walletType === 'backpack' && window.backpack) {
      try {
        window.backpack.disconnect();
      } catch (err) {
        console.error("Error disconnecting from Backpack:", err);
      }
    }

    // Update state
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
