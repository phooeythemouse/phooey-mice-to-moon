
import React, { useState } from 'react';
import { Wallet, LogOut } from 'lucide-react';
import { useWallet } from '@/providers/WalletProvider';
import WalletModal from './WalletModal';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const WalletButton = () => {
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const { connected, walletAddress, balance, disconnectWallet, walletType } = useWallet();

  const formatWalletAddress = (address: string | null) => {
    if (!address) return '';
    return `${address.substring(0, 4)}...${address.substring(address.length - 4)}`;
  };

  const handleWalletClick = () => {
    if (connected) {
      // Show wallet info
      toast.info(`Wallet Info`, {
        description: `Balance: ${balance?.toFixed(2)} SOL`,
        duration: 3000,
      });
    } else {
      // Open connect modal
      setWalletModalOpen(true);
    }
  };

  return (
    <>
      {connected ? (
        <div className="relative group">
          <button 
            onClick={handleWalletClick}
            className="btn-glow bg-space-blue hover:bg-opacity-80 text-white font-bold py-2 px-6 rounded-full transition-all transform hover:scale-105 duration-300 flex items-center"
          >
            {walletType === 'phantom' && (
              <img 
                src="data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjM0IiB3aWR0aD0iMzQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTcuMDQgMzRjOS4zNDMgMCAxNi45Ni03LjYxNyAxNi45Ni0xNy4wNkMzNCA3LjYxNiAyNi4zODMgMCAxNy4wNCAwIDcuNjE3IDAgMCA3LjYxNyAwIDE2Ljk0YzAgOS40NDMgNy42MTcgMTcuMDYgMTcuMDQgMTcuMDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiM4QTQ1RkYiLz48cGF0aCBkPSJNMjAgMjUuMDc4YzQuODI4IDAgOC43NC0zLjkxMyA4Ljc0LTguNzRzLTMuOTEyLTguNzQtOC43NC04Ljc0djIuNDk3YzMuNDQzIDAgNi4yNDMgMi44IDYuMjQzIDYuMjQzUzIzLjQ0MyAyMi41OCAyMCAyMi41OGMtMS43NyAwLTMuMzY3LS43MzQtNC41MDMtMS45MmwuMDAxLS4wMDItLjAyOS0uMDMxQzE0LjI4MiAxOS40MSAxMy41MTcgMTcuNzM1IDEzLjUxNyAxNmMwLTEuNDM4LjUzNS0yLjc1NCAxLjQyLTMuNzU1LjY3LS43NiAxLjU2OS0xLjM5NSAyLjE0Mi0xLjg2Mi0xLjA5LS4wNjctMi4xODQtLjA5NC0zLjI3NS0uMDczLTEuMjI1LjAyMy0yLjQ0Ny4wOTMtMy42NjEuMTkzLjAwMy43MDYuMDk0IDEuNDQuMjE0IDIuMTYyLjQ2NiAyLjg0IDEuNDg0IDUuNjgyIDMuMDY4IDguNDY0YTQ0LjU0NiA0NC41NDYgMCAwMDEuNjg0IDIuNzY1LjI2OS4yNjkgMCAwMC4yMzIuMTMyLjI3LjI3IDAgMDAuMjMzLS4xMzIgNDUuMzUgNDUuMzUgMCAwMDEuODI1LTMuMDU5IDMuODY5IDMuODY5IDAgMDAzLjE5NCAxLjY3MyAzLjg3IDMuODcgMCAwMDMuODctMy44NjcgMy44NyAzLjg3IDAgMDAtMy44Ny0zLjg2OWMtMi4xNCAwLTIuODgzIDEuODc0LTMuODcyIDEuNDkyLTIuMTU1LS44MzUtNC4xMTYtMy4wNDYtNC4xMTYtMS41MiAwIDIuMjYyIDEuNzE2IDMuNzQzIDEuNzE2IDMuNzQzQzE0LjA0NCAyMS4zNTYgMTYuNzc1IDI1LjA3OCAyMCAyNS4wNzh6IiBmaWxsPSIjZmZmIi8+PC9zdmc+" 
                alt="Phantom" 
                className="h-5 w-5 mr-2" 
              />
            )}
            {walletType === 'solflare' && (
              <img 
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiByeD0iNTAiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGQ9Ik0xNTAgNTguMDc2OUMxNTAgNTguMDc2OSA2OCA1OC4wNzY5IDY4IDE0OS4wNzdDNjggMjQwLjA3NyAxNTAgMjQwLjA3NyAxNTAgMjQwLjA3N0MxNTAgMjQwLjA3NyAyMzIgMjQwLjA3NyAyMzIgMTQ5LjA3N0MyMzIgNTguMDc2OSAxNTAgNTguMDc2OSAxNTAgNTguMDc2OVoiIGZpbGw9IiNGRDQ2QTgiLz4KPHBhdGggZD0iTTIzMiAxNTBDMjMyIDEyMS44NzMgMjIwLjgyNyA5Mi4wMTI3IDE5OC4zOTYgNjkuNTgxN0MxNzUuOTY1IDQ3LjE1MDYgMTQ2LjEwNSAzNS45NzY5IDExNy45NzcgMzUuOTc2OUM4OS44NDkyIDM1Ljk3NjkgNjAuMDM1IDQ3LjE1MDYgMzcuNjA0IDY5LjU4MTdDMTUuMTczIDkyLjAxMjcgNC4wMDAyNSAxMjEuODczIDQuMDAwMjQgMTUwQzQuMDAwMjQgMTc4LjEyOCAxNS4xNzMgMjA3Ljk4NyAzNy42MDQgMjMwLjQxOEM2MC4wMzUgMjUyLjg0OSA4OS44NDkyIDI2NC4wMjMgMTE3Ljk3NyAyNjQuMDIzQzE0Ni4xMDUgMjY0LjAyMyAxNzUuOTY1IDI1Mi44NDkgMTk4LjM5NiAyMzAuNDE4QzIyMC44MjcgMjA3Ljk4NyAyMzIgMTc4LjEyOCAyMzIgMTUwVjE1MFoiIGZpbGw9IiNGRDQ2QTgiLz4KPHBhdGggZD0iTTEwNy4wMDEgMTUwQzEwNy4wMDEgMTQzLjA5NiAxMTIuNTk3IDEzNy41IDE0OS41IDEzNy41QzE4Ni40MDQgMTM3LjUgMTkyIDEzNy41IDE5MiAxNTBDMTkyIDE2Mi41IDEzMSAxNjIuNSAxMzEgMTUwVjk3LjVDMTMxIDg1IDEzMS4wMDEgODUgMTQ5LjUwMSA4NUMxNjguMDAxIDg1IDE2OC4wMDEgODUgMTY4LjAwMSA5Ny41QzE2OC4wMDEgMTEwIDE2OC4wMDEgMTEwIDE0OS41MDEgMTEwQzEzMS4wMDEgMTEwIDEwNy4wMDEgMTE0LjgyNiAxMDcuMDAxIDE1MFoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xMDcuMDAxIDE4Mi41QzEwNy4wMDEgMTcwIDEwNy4wMDEgMTcwIDEzMS4wMDEgMTcwQzE1NS4wMDEgMTcwIDE2OS41MDEgMTcwIDE2OS41MDEgMTgyLjVDMTY5LjUwMSAxOTUgMTY5LjUwMSAxOTUgMTQ5LjUwMSAxOTVDMTI5LjUwMSAxOTUgMTA3LjAwMSAxOTIuOTM0IDEwNy4wMDEgMTgyLjVaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K"
                alt="Solflare" 
                className="h-5 w-5 mr-2" 
              />
            )}
            {walletType === 'backpack' && (
              <img 
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiByeD0iNjQiIGZpbGw9IiMxMzEzMTMiLz4KPHBhdGggZD0iTTk3LjAwMDMgMzkuMDAwMkM5Ny4wMDAzIDMzLjQ3NzQgOTIuNTIyOSAyOS4wMDAyIDg3LjAwMDMgMjkuMDAwMkM4MS40Nzc2IDI5LjAwMDIgNzcuMDAwMyAzMy40Nzc0IDc3LjAwMDMgMzkuMDAwMkM3Ny4wMDAzIDQ0LjUyMjkgODEuNDc3NiA0OS4wMDAyIDg3LjAwMDMgNDkuMDAwMkM5Mi41MjI5IDQ5LjAwMDIgOTcuMDAwMyA0NC41MjI5IDk3LjAwMDMgMzkuMDAwMloiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl8xXzIwKSIvPgo8cGF0aCBkPSJNNTEuMDAwMyAzOS4wMDAyQzUxLjAwMDMgMzMuNDc3NCA0Ni41MjI5IDI5LjAwMDIgNDEuMDAwMyAyOS4wMDAyQzM1LjQ3NzYgMjkuMDAwMiAzMS4wMDAzIDMzLjQ3NzQgMzEuMDAwMyAzOS4wMDAyQzMxLjAwMDMgNDQuNTIyOSAzNS40Nzc2IDQ5LjAwMDIgNDEuMDAwMyA0OS4wMDAyQzQ2LjUyMjkgNDkuMDAwMiA1MS4wMDAzIDQ0LjUyMjkgNTEuMDAwMyAzOS4wMDAyWiIgZmlsbD0idXJsKCNwYWludDFfbGluZWFyXzFfMjApIi8+CjxwYXRoIGQ9Ik05N0MxMDIuNSA2NS41IDk3IDg3IDkxLjUgODdDNjIgODcgNjUuNSA4NyAzNiA4N0MzMS41IDg3IDI4LjUgNjUuNSAzMSA2NC4wMDAxQzM2LjUgNjEuMDAwMSA0MSA2MS4wMDAxIDQxIDYxLjAwMDFMODcgNjEuMDAwMUM4NyA2MS4wMDAxIDkyLjUgNjQuMDAwMSA5NyA2NC4wMDAxQyEwMS41IDY0LjAwMDEgOTcgNjUuNSA5NyA2NC4wMDAxWiIgZmlsbD0idXJsKCNwYWludDJfbGluZWFyXzFfMjApIi8+CjxwYXRoIGQ9Ik04Ny42NTgzIDk4Ljk5OThINDAuMDAwM0MzNy40MzE3IDk4Ljk5OTggMzUuMzQyNyA5Ni45NDQxIDM1LjI5MzMgOTQuMzc2MkwzNC4wMDAzIDYzLjk5OThIOTQuMDAwM0w5Mi4zNjUzIDk0LjM3NjJDOTIuMzE1OSA5Ni45NDQxIDkwLjIyNjkgOTguOTk5OCA4Ny42NTgzIDk4Ljk5OThaIiBmaWxsPSJ1cmwoI3BhaW50M19saW5lYXJfMV8yMCkiLz4KPHBhdGggZD0iTTY0LjAwMDMgNzAuOTk5OEM1OC40Nzc2IDcwLjk5OTggNTQuMDAwMyA3NS40NzcxIDU0LjAwMDMgODAuOTk5OEM1NC4wMDAzIDg2LjUyMjQgNTguNDc3NiA5MC45OTk4IDY0LjAwMDMgOTAuOTk5OEM2OS41MjI5IDkwLjk5OTggNzQuMDAwMyA4Ni41MjI0IDc0LjAwMDMgODAuOTk5OEM3NC4wMDAzIDc1LjQ3NzEgNjkuNTIyOSA3MC45OTk4IDY0LjAwMDMgNzAuOTk5OFoiIGZpbGw9IiNGQUVDRkEiLz4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhcl8xXzIwIiB4MT0iODciIHkxPSIyOSIgeDI9Ijg3IiB5Mj0iNDkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iI0VFQTVGMyIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNGQkRCRjgiLz4KPC9saW5lYXJHcmFkaWVudD4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDFfbGluZWFyXzFfMjAiIHgxPSI0MSIgeTE9IjI5IiB4Mj0iNDEiIHkyPSI0OSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjRUVBNUYzIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0ZCREJGOCIvPgo8L2xpbmVhckdyYWRpZW50Pgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50Ml9saW5lYXJfMV8yMCIgeDE9IjY0IiB5MT0iNjEiIHgyPSI2NCIgeTI9Ijg3IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGQkRCRjgiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRjdCREM1Ii8+CjwvbGluZWFyR3JhZGllbnQ+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQzX2xpbmVhcl8xXzIwIiB4MT0iNjQiIHkxPSI2NCIgeDI9IjY0IiB5Mj0iOTkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iI0ZDRUJGQSIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNGQUU3RkEiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K"
                alt="Backpack" 
                className="h-5 w-5 mr-2" 
              />
            )}
            {!walletType && <Wallet className="h-4 w-4 mr-1" />}
            <span>{formatWalletAddress(walletAddress)}</span>
          </button>
          
          <div className="absolute right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20">
            <div className="glass-card bg-space-dark/90 rounded-lg shadow-lg p-3">
              <div className="mb-2 pb-2 border-b border-white/10">
                <div className="text-xs text-gray-400">Wallet</div>
                <div className="font-medium truncate">{formatWalletAddress(walletAddress)}</div>
              </div>
              <div className="mb-3">
                <div className="text-xs text-gray-400">Balance</div>
                <div className="font-medium">{balance?.toFixed(2)} SOL</div>
              </div>
              <Button 
                onClick={disconnectWallet} 
                variant="destructive" 
                size="sm" 
                className="w-full flex items-center justify-center"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Disconnect
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setWalletModalOpen(true)}
          className="btn-glow bg-space-blue hover:bg-opacity-80 text-white font-bold py-2 px-6 rounded-full transition-all transform hover:scale-105 duration-300 flex items-center"
        >
          <Wallet className="h-4 w-4 mr-1" />
          <span>Connect Wallet</span>
        </button>
      )}
      
      <WalletModal open={walletModalOpen} onOpenChange={setWalletModalOpen} />
    </>
  );
};

export default WalletButton;
