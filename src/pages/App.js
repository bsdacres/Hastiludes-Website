import '../styles/Sharedlayout.css'
import React, { useEffect } from "react";
import Home from '../pages/Home'
import SharedLayout from "../pages/SharedLayout";
import News from '../pages/News';
import Render from './Render';
import { BrowserRouter ,Routes,Route, useLocation } from "react-router-dom";
import Codex from './Codex';
import {
    EthereumClient,
    modalConnectors,
    walletConnectProvider,
  } from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { useWeb3ModalTheme } from "@web3modal/react";

const chains = [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum];

// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: "790a4867d8f30ebb02ca27eac2eddc38" }),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "web3Modal", chains }),
  provider,
});



// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);


export default function App() {
    const { theme, setTheme } = useWeb3ModalTheme();

    setTheme({ThemeMode:'light', themeColor: 'blackWhite', themeBackground: 'gradient'})
    
    return(
        <> 
            <WagmiConfig client={wagmiClient}>
                <Routes>
                    <Route path = '/' element = {<SharedLayout />} >
                        <Route path='/' element = {<Home />} />
                        <Route path = 'news' element = {<News />} />
                        <Route path = 'codex' element = {<Codex />} />
                        <Route path = 'play' element = {<Render/>} />
                    </Route>   
                </Routes>   
            </WagmiConfig>
            <Web3Modal
              projectId="790a4867d8f30ebb02ca27eac2eddc38"
              ethereumClient={ethereumClient}
            />
        </> 
    );
}