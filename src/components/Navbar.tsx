import React, { useState, useEffect } from 'react';
import { Menu, X, Wallet } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import WalletModal from './WalletModal';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { connected, address, disconnectWallet, openModal, isModalOpen } = useWallet();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300 ${
          isScrolled
            ? 'bg-primary/90 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-2xl font-display font-bold text-accent-purple">
              <span className="glitch-text" data-text="MGF">
                MGF
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-text hover:text-accent-green transition-colors">
              About
            </a>
            <a href="#tokenomics" className="text-text hover:text-accent-green transition-colors">
              Tokenomics
            </a>
            <a href="#roadmap" className="text-text hover:text-accent-green transition-colors">
              Roadmap
            </a>
            <a href="#nft-vault" className="text-text hover:text-accent-green transition-colors">
              NFT Vault
            </a>
            {connected ? (
              <div className="flex items-center gap-3">
                <span className="text-accent-green font-display text-sm">{address}</span>
                <button 
                  onClick={disconnectWallet}
                  className="text-sm text-alert hover:text-white transition-colors"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={openModal}
                className="flex items-center gap-2 btn btn-primary"
              >
                <Wallet size={16} />
                Connect Wallet
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            {connected && (
              <span className="text-accent-green text-xs mr-3 font-display">{address}</span>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-text hover:text-accent-purple transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-primary/95 backdrop-blur-lg pt-20 px-6">
          <div className="flex flex-col space-y-6 items-center">
            <a
              href="#about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg text-text hover:text-accent-green transition-colors"
            >
              About
            </a>
            <a
              href="#tokenomics"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg text-text hover:text-accent-green transition-colors"
            >
              Tokenomics
            </a>
            <a
              href="#roadmap"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg text-text hover:text-accent-green transition-colors"
            >
              Roadmap
            </a>
            <a
              href="#nft-vault"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg text-text hover:text-accent-green transition-colors"
            >
              NFT Vault
            </a>
            {connected ? (
              <button
                onClick={() => {
                  disconnectWallet();
                  setIsMobileMenuOpen(false);
                }}
                className="text-alert hover:text-white transition-colors"
              >
                Disconnect Wallet
              </button>
            ) : (
              <button
                onClick={() => {
                  openModal();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 btn btn-primary mt-4"
              >
                <Wallet size={16} />
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      )}

      {/* Wallet Modal */}
      <WalletModal />
    </>
  );
};

export default Navbar;