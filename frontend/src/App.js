import './App.css';
import React, { useState, useEffect } from 'react';
import {ethers} from 'ethers'
import { contractAddress } from './config'
import StringAbi from './utils/Helloworld.json'

function App() {
  const [string,setString] = useState("");
  const [input,setInput] = useState("");
  const [currentAccount, setCurrentAccount] = useState('');
  const [correctNetwork,setCorrectNetwork] = useState(false);

  const connectWallet = async() => {
    try{
      const { ethereum } = window;
      
      if(!ethereum){
        console.log("Meta Mask not Detected");
        return;
      }

      let chainId = await ethereum.request({method: "eth_chainId"})

      const sepoliaChainId = '0xaa36a7';

      if(chainId !== sepoliaChainId){
        console.log("its here", chainId);
        return;
      }else{
        setCorrectNetwork(true);
      }
      let accounts = await ethereum.request({method: "eth_requestAccounts"})
      setCurrentAccount(accounts[0]);

    }catch (error) {

    }
  }


  const getString = async() => {
    try{
      const { ethereum } = window

      if(ethereum){
        const alchemyProvider = new ethers.InfuraProvider("sepolia", "5c72ae04cb5947b58bc720454e732dd8");
        const signer = new ethers.Wallet("19473db985c10fdfb538fed64433676924ceba5f94c7126a00941b5327cc70ea", alchemyProvider);
        const helloworldContract = new ethers.Contract(contractAddress, StringAbi.abi, signer);

        const message = await helloworldContract.message();
        console.log("The message is :", message);
        setString(message);
      }else{
        console.log("eth doesnot exist");
      }
    }catch (error) {
      console.log("____",error);
    }
  }

  const update = async() => {
    try{
      const { ethereum } = window

      if(ethereum){
        const alchemyProvider = new ethers.InfuraProvider("sepolia", "5c72ae04cb5947b58bc720454e732dd8");
        const signer = new ethers.Wallet("19473db985c10fdfb538fed64433676924ceba5f94c7126a00941b5327cc70ea", alchemyProvider);
        const helloworldContract = new ethers.Contract(contractAddress, StringAbi.abi, signer);

        const tx = await helloworldContract.update(input);
        await tx.wait();
        // console.log("The message is :", message);
      }else{
        console.log("eth doesnot exist");
      }
    }catch (error) {
      console.log("____",error);
    }

    setInput('');
  }


  useEffect(()=>{
    connectWallet();
    getString();
  },[])


  return (
    <div>
      {currentAccount === '' ? <button onClick={connectWallet}>Connect Wallet</button>: <div className="App">
          <h2>Basic String in/out of block chain</h2>
          <input type="text" value={input} onChange={(e)=>{setInput(e.target.value)}}/>
          <button onClick={update}>Update String</button>
          <h4>The String is: {string}</h4>
        </div>}
    </div>
  );
}

export default App;
