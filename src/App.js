import { useState, useEffect } from 'react';
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import { ethers } from "ethers";
import './App.css';

function App() {
  const [greeting, doGreeting] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const loadProvider = async () => {
      let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const url = "http://localhost:8545";//hardhat local blockchain
      const provider = new ethers.providers.JsonRpcProvider(url);//connecting frontend with blockchain
      const contract = new ethers.Contract(contractAddress, Greeter.abi, provider);//making instance of our contract
      setContract(contract);
      setProvider(provider);
      //console.log(contract);
    };
    loadProvider();
  }, []);

  useEffect(() => {
    const getGreetings = async () => {
      const greeting = await contract.greet();
      doGreeting(greeting);
      //console.log(greeting);
    }
    contract && getGreetings();
  }, [contract]);

  const changeGreetings = async () => {
    // const input = document.querySelector("#value");//to get value from input field
    // const signer = contract.connect(provider.getSigner());//we use signer function to set change in contracts
    // signer.setGreeting(input.value);//setting value of input to contract

    const input = document.querySelector("input");
    const signer = contract.connect(provider.getSigner(0));
    signer.setGreeting(input.value);
    setTimeout(function () {
      window.location.reload(1);
    }, 500);
    //setTimeout();
  };

  return (
    <div className="center">
      <h3>{greeting}</h3>
      <input className="input" type="text" id="value"></input>
      <button className="button" onClick={changeGreetings}>Change</button>
    </div>
  );
}

export default App;