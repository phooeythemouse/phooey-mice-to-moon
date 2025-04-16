
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { WalletType, useWallet } from '@/providers/WalletProvider';
import OptimizedImage from './OptimizedImage';
import { useIsMobile } from '@/hooks/use-mobile';

interface WalletModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const walletOptions = [
  { 
    name: 'Phantom', 
    type: 'phantom' as WalletType, 
    icon: 'data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjM0IiB3aWR0aD0iMzQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTcuMDQgMzRjOS4zNDMgMCAxNi45Ni03LjYxNyAxNi45Ni0xNy4wNkMzNCA3LjYxNiAyNi4zODMgMCAxNy4wNCAwIDcuNjE3IDAgMCA3LjYxNyAwIDE2Ljk0YzAgOS40NDMgNy42MTcgMTcuMDYgMTcuMDQgMTcuMDZ6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiM4QTQ1RkYiLz48cGF0aCBkPSJNMjAgMjUuMDc4YzQuODI4IDAgOC43NC0zLjkxMyA4Ljc0LTguNzRzLTMuOTEyLTguNzQtOC43NC04Ljc0djIuNDk3YzMuNDQzIDAgNi4yNDMgMi44IDYuMjQzIDYuMjQzUzIzLjQ0MyAyMi41OCAyMCAyMi41OGMtMS43NyAwLTMuMzY3LS43MzQtNC41MDMtMS45MmwuMDAxLS4wMDItLjAyOS0uMDMxQzE0LjI4MiAxOS40MSAxMy41MTcgMTcuNzM1IDEzLjUxNyAxNmMwLTEuNDM4LjUzNS0yLjc1NCAxLjQyLTMuNzU1LjY3LS43NiAxLjU2OS0xLjM5NSAyLjE0Mi0xLjg2Mi0xLjA5LS4wNjctMi4xODQtLjA5NC0zLjI3NS0uMDczLTEuMjI1LjAyMy0yLjQ0Ny4wOTMtMy42NjEuMTkzLjAwMy43MDYuMDk0IDEuNDQuMjE0IDIuMTYyLjQ2NiAyLjg0IDEuNDg0IDUuNjgyIDMuMDY4IDguNDY0YTQ0LjU0NiA0NC41NDYgMCAwMDEuNjg0IDIuNzY1LjI2OS4yNjkgMCAwMC4yMzIuMTMyLjI3LjI3IDAgMDAuMjMzLS4xMzIgNDUuMzUgNDUuMzUgMCAwMDEuODI1LTMuMDU5IDMuODY5IDMuODY5IDAgMDAzLjE5NCAxLjY3MyAzLjg3IDMuODcgMCAwMDMuODctMy44NjcgMy44NyAzLjg3IDAgMDAtMy44Ny0zLjg2OWMtMi4xNCAwLTIuODgzIDEuODc0LTMuODcyIDEuNDkyLTIuMTU1LS44MzUtNC4xMTYtMy4wNDYtNC4xMTYtMS41MiAwIDIuMjYyIDEuNzE2IDMuNzQzIDEuNzE2IDMuNzQzQzE0LjA0NCAyMS4zNTYgMTYuNzc1IDI1LjA3OCAyMCAyNS4wNzh6IiBmaWxsPSIjZmZmIi8+PC9zdmc+',
    description: 'Popular Solana wallet with a user-friendly interface',
    installUrl: 'https://phantom.app/',
    deepLink: 'https://phantom.app/ul/browse/',
    universalLink: true,
    mobileAppDeepLink: 'phantom://',
  },
  { 
    name: 'Solflare', 
    type: 'solflare' as WalletType, 
    icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiByeD0iNTAiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGQ9Ik0xNTAgNTguMDc2OUMxNTAgNTguMDc2OSA2OCA1OC4wNzY5IDY4IDE0OS4wNzdDNjggMjQwLjA3NyAxNTAgMjQwLjA3NyAxNTAgMjQwLjA3N0MxNTAgMjQwLjA3NyAyMzIgMjQwLjA3NyAyMzIgMTQ5LjA3N0MyMzIgNTguMDc2OSAxNTAgNTguMDc2OSAxNTAgNTguMDc2OVoiIGZpbGw9IiNGRDQ2QTgiLz4KPHBhdGggZD0iTTIzMiAxNTBDMjMyIDEyMS44NzMgMjIwLjgyNyA5Mi4wMTI3IDE5OC4zOTYgNjkuNTgxN0MxNzUuOTY1IDQ3LjE1MDYgMTQ2LjEwNSAzNS45NzY5IDExNy45NzcgMzUuOTc2OUM4OS44NDkyIDM1Ljk3NjkgNjAuMDM1IDQ3LjE1MDYgMzcuNjA0IDY5LjU4MTdDMTUuMTczIDkyLjAxMjcgNC4wMDAyNSAxMjEuODczIDQuMDAwMjQgMTUwQzQuMDAwMjQgMTc4LjEyOCAxNS4xNzMgMjA3Ljk4NyAzNy42MDQgMjMwLjQxOEM2MC4wMzUgMjUyLjg0OSA4OS44NDkyIDI2NC4wMjMgMTE3Ljk3NyAyNjQuMDIzQzE0Ni4xMDUgMjY0LjAyMyAxNzUuOTY1IDI1Mi44NDkgMTk4LjM5NiAyMzAuNDE4QzIyMC44MjcgMjA3Ljk4NyAyMzIgMTc4LjEyOCAyMzIgMTUwVjE1MFoiIGZpbGw9IiNGRDQ2QTgiLz4KPHBhdGggZD0iTTEwNy4wMDEgMTUwQzEwNy4wMDEgMTQzLjA5NiAxMTIuNTk3IDEzNy41IDE0OS41IDEzNy41QzE4Ni40MDQgMTM3LjUgMTkyIDEzNy41IDE5MiAxNTBDMTkyIDE2Mi41IDEzMSAxNjIuNSAxMzEgMTUwVjk3LjVDMTMxIDg1IDEzMS4wMDEgODUgMTQ5LjUwMSA4NUMxNjguMDAxIDg1IDE2OC4wMDEgODUgMTY4LjAwMSA5Ny41QzE2OC4wMDEgMTEwIDE2OC4wMDEgMTEwIDE0OS41MDEgMTEwQzEzMS4wMDEgMTEwIDEwNy4wMDEgMTE0LjgyNiAxMDcuMDAxIDE1MFoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xMDcuMDAxIDE4Mi41QzEwNy4wMDEgMTcwIDEwNy4wMDEgMTcwIDEzMS4wMDEgMTcwQzE1NS4wMDEgMTcwIDE2OS41MDEgMTcwIDE2OS41MDEgMTgyLjVDMTY5LjUwMSAxOTUgMTY5LjUwMSAxOTUgMTQ5LjUwMSAxOTVDMTI5LjUwMSAxOTUgMTA3LjAwMSAxOTIuOTM0IDEwNy4wMDEgMTgyLjVaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K',
    description: 'Secure and feature-rich Solana wallet',
    installUrl: 'https://solflare.com/',
    deepLink: 'https://solflare.com/ul/v1/browse/',
    universalLink: true,
    mobileAppDeepLink: 'solflare://',
  },
  { 
    name: 'Backpack', 
    type: 'backpack' as WalletType, 
    icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiByeD0iNjQiIGZpbGw9IiMxMzEzMTMiLz4KPHBhdGggZD0iTTk3LjAwMDMgMzkuMDAwMkM5Ny4wMDAzIDMzLjQ3NzQgOTIuNTIyOSAyOS4wMDAyIDg3LjAwMDMgMjkuMDAwMkM4MS40Nzc2IDI5LjAwMDIgNzcuMDAwMyAzMy40Nzc0IDc3LjAwMDMgMzkuMDAwMkM3Ny4wMDAzIDQ0LjUyMjkgODEuNDc3NiA0OS4wMDAyIDg3LjAwMDMgNDkuMDAwMkM5Mi41MjI5IDQ5LjAwMDIgOTcuMDAwMyA0NC41MjI5IDk3LjAwMDMgMzkuMDAwMloiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl8xXzIwKSIvPgo8cGF0aCBkPSJNNTEuMDAwMyAzOS4wMDAyQzUxLjAwMDMgMzMuNDc3NCA0Ni41MjI5IDI5LjAwMDIgNDEuMDAwMyAyOS4wMDAyQzM1LjQ3NzYgMjkuMDAwMiAzMS4wMDAzIDMzLjQ3NzQgMzEuMDAwMyAzOS4wMDAyQzMxLjAwMDMgNDQuNTIyOSAzNS40Nzc2IDQ5LjAwMDIgNDEuMDAwMyA0OS4wMDAyQzQ2LjUyMjkgNDkuMDAwMiA1MS4wMDAzIDQ0LjUyMjkgNTEuMDAwMyAzOS4wMDAyWiIgZmlsbD0idXJsKCNwYWludDFfbGluZWFyXzFfMjApIi8+CjxwYXRoIGQ9Ik05N0MxMDIuNSA2NS41IDk3IDg3IDkxLjUgODdDNjIgODcgNjUuNSA4NyAzNiA4N0MzMS41IDg3IDI4LjUgNjUuNSAzMSA2NC4wMDAxQzM2LjUgNjEuMDAwMSA0MSA2MS4wMDAxIDQxIDYxLjAwMDFMODcgNjEuMDAwMUM4NyA2MS4wMDAxIDkyLjUgNjQuMDAwMSA5NyA2NC4wMDAxQyEwMS41IDY0LjAwMDEgOTcgNjUuNSA5NyA2NC4wMDAxWiIgZmlsbD0idXJsKCNwYWludDJfbGluZWFyXzFfMjApIi8+CjxwYXRoIGQ9Ik04Ny42NTgzIDk4Ljk5OThINDAuMDAwM0MzNy40MzE3IDk4Ljk5OTggMzUuMzQyNyA5Ni45NDQxIDM1LjI5MzMgOTQuMzc2MkwzNC4wMDAzIDYzLjk5OThIOTQuMDAwM0w5Mi4zNjUzIDk0LjM3NjJDOTIuMzE1OSA5Ni45NDQxIDkwLjIyNjkgOTguOTk5OCA4Ny42NTgzIDk4Ljk5OThaIiBmaWxsPSJ1cmwoI3BhaW50M19saW5lYXJfMV8yMCkiLz4KPHBhdGggZD0iTTY0LjAwMDMgNzAuOTk5OEM1OC40Nzc2IDcwLjk5OTggNTQuMDAwMyA3NS40NzcxIDU0LjAwMDMgODAuOTk5OEM1NC4wMDAzIDg2LjUyMjQgNTguNDc3NiA5MC45OTk4IDY0LjAwMDMgOTAuOTk5OEM2OS41MjI5IDkwLjk5OTggNzQuMDAwMyA4Ni41MjI0IDc0LjAwMDMgODAuOTk5OEM3NC4wMDAzIDc1LjQ3NzEgNjkuNTIyOSA3MC45OTk4IDY0LjAwMDMgNzAuOTk5OFoiIGZpbGw9IiNGQUVDRkEiLz4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhcl8xXzIwIiB4MT0iODciIHkxPSIyOSIgeDI9Ijg3IiB5Mj0iNDkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iI0VFQTVGMyIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNGQkRCRjgiLz4KPC9saW5lYXJHcmFkaWVudD4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDFfbGluZWFyXzFfMjAiIHgxPSI0MSIgeTE9IjI5IiB4Mj0iNDEiIHkyPSI0OSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjRUVBNUYzIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0ZCREJGOCIvPgo8L2xpbmVhckdyYWRpZW50Pgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50Ml9saW5lYXJfMV8yMCIgeDE9IjY0IiB5MT0iNjEiIHgyPSI2NCIgeTI9Ijg3IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGQkRCRjgiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRjdCREM1Ii8+CjwvbGluZWFyR3JhZGllbnQ+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQzX2xpbmVhcl8xXzIwIiB4MT0iNjQiIHkxPSI2NCIgeDI9IjY0IiB5Mj0iOTkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iI0ZDRUJGQSIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNGQUU3RkEiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K',
    description: 'Multi-chain wallet with xNFT support',
    installUrl: 'https://www.backpack.app/',
    deepLink: 'https://backpack.app/browse',
    universalLink: false,
    mobileAppDeepLink: 'backpack://',
  }
];

const WalletModal: React.FC<WalletModalProps> = ({ open, onOpenChange }) => {
  const { connectWallet, connecting } = useWallet();
  const isMobile = useIsMobile();

  const handleConnectWallet = async (type: WalletType) => {
    await connectWallet(type);
    onOpenChange(false);
  };

  // Check if wallet extensions exist
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

  // For mobile deep links
  const openMobileWallet = (wallet: typeof walletOptions[0]) => {
    // First try direct app scheme 
    const tryDeepLink = () => {
      try {
        window.location.href = wallet.mobileAppDeepLink;
        console.log(`Opening wallet via direct scheme: ${wallet.mobileAppDeepLink}`);
      } catch (e) {
        console.error('Failed to open direct app scheme:', e);
        openUniversalLink(wallet);
      }
    };
    
    // As fallback, use universal links 
    const openUniversalLink = (wallet: typeof walletOptions[0]) => {
      try {
        const currentUrl = encodeURIComponent(window.location.href);
        let deepLink = wallet.deepLink;
        
        if (wallet.universalLink) {
          window.location.href = `${deepLink}${currentUrl}`;
          console.log(`Opening wallet via universal link: ${deepLink}${currentUrl}`);
        } else {
          window.location.href = deepLink;
          console.log(`Opening wallet via regular link: ${deepLink}`);
        }
      } catch (e) {
        console.error('Failed to open universal link:', e);
      }
    };
    
    // Try direct deep link first
    tryDeepLink();
    
    // After 1 second, if app didn't open, try universal link as fallback 
    setTimeout(() => {
      openUniversalLink(wallet);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-space-dark border-space-blue text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gradient">Connect Wallet</DialogTitle>
          <DialogDescription className="text-gray-300">
            Select your preferred wallet to connect to the PHOOEY ecosystem.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {walletOptions.map((wallet) => {
            const extensionExists = checkWalletExtension(wallet.type);
            
            return (
              <div key={wallet.type} className="glass-card bg-space-dark/50 hover:bg-space-blue/20 text-white border border-space-blue/20 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img 
                      src={wallet.icon} 
                      alt={`${wallet.name} logo`} 
                      className="w-8 h-8 mr-3" 
                    />
                    <div className="text-left">
                      <div className="font-semibold">{wallet.name}</div>
                      <div className="text-xs text-gray-400">{wallet.description}</div>
                    </div>
                  </div>
                  
                  {/* Desktop Extension Button */}
                  {!isMobile && extensionExists && (
                    <Button
                      onClick={() => handleConnectWallet(wallet.type)}
                      className="bg-space-blue hover:bg-space-accent text-white"
                      disabled={connecting}
                    >
                      {connecting ? (
                        <div className="loader w-5 h-5 border-2 border-t-space-accent rounded-full animate-spin"></div>
                      ) : (
                        'Connect'
                      )}
                    </Button>
                  )}
                  
                  {/* Mobile App Button */}
                  {isMobile && (
                    <Button
                      onClick={() => openMobileWallet(wallet)}
                      className="bg-space-blue hover:bg-space-accent text-white"
                    >
                      Open App
                    </Button>
                  )}
                  
                  {/* Install Button for Desktop */}
                  {!isMobile && !extensionExists && (
                    <a 
                      href={wallet.installUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-space-accent hover:text-space-blue transition-colors text-sm"
                    >
                      Install
                    </a>
                  )}
                </div>
                
                {isMobile && (
                  <div className="mt-2 text-xs text-amber-400">
                    Tap "Open App" to launch and connect with {wallet.name}
                  </div>
                )}
                
                {!isMobile && !extensionExists && (
                  <div className="mt-2 text-xs text-amber-400">
                    Wallet extension not detected. Install to continue.
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="text-xs text-gray-400 text-center mt-4">
          New to Solana? <a href="https://docs.phantom.app/getting-started" target="_blank" rel="noopener noreferrer" className="text-space-accent hover:underline">Learn more about wallets</a>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletModal;
