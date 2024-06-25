import './App.css';
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useEffect, useState } from 'react';
import { ethers } from "ethers";
import { Web3Provider } from '@ethersproject/providers';
import Fileupload from './components/Fileupload';
import Display from './components/Display';
import Modal from './components/Modal';


function App() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [modalopen,setModalOpen] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        const provider = new Web3Provider(window.ethereum);
        if (!provider) {
          alert("Metamask is not connected");
          return;
        }

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);

        const contractAddress = "0x41790FC6D0013004A8152125CA9589297049aFc2";
        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        setContract(contract);
        setProvider(provider);
        console.log("Contract loaded successfully:", contract);
      } catch (error) {
        console.error("Error initializing contract:", error);
      }
    };

    initialize();
  }, []);

  return (
    <div className="App">
      <div className='relative h-screen bg-gray-200 overflow-hidden'>
        {!modalopen && (
          <button className='absolute top-0 left-0 m-4 w-16 bg-black text-white p-3 rounded-md' onClick={()=>setModalOpen(true)}>
            Share
          </button>
        )}
        {modalopen && (
          <Modal contract={contract} setModalOpen={setModalOpen}/>
        )}
        <h1 className='font-bold mt-7 text-xl'>GDrive Web3</h1>
        <p className='mt-5'>Account : {account}</p>
        <Fileupload account={account} contract={contract} provider={provider}/>
        <Display account={account} contract={contract}/>
        
      </div>
    </div>
  );

  
}

export default App;


