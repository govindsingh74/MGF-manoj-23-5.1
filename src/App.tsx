import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Tokenomics from './components/Tokenomics';
import Roadmap from './components/Roadmap';
import NftVault from './components/NftVault';
import Footer from './components/Footer';
import { WalletProvider } from './context/WalletContext';

function App() {
  return (
    <WalletProvider>
      <div className="min-h-screen bg-primary text-white font-sans overflow-hidden">
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-primary opacity-90"></div>
          <div className="matrix-background"></div>
        </div>
        <div className="relative z-10">
          <Navbar />
          <main>
            <Hero />
            <About />
            <Tokenomics />
            <Roadmap />
            <NftVault />
          </main>
          <Footer />
        </div>
      </div>
    </WalletProvider>
  );
}

export default App;