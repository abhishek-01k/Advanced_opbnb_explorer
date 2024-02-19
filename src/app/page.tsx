"use client"
import Image from "next/image";

export default function Home() {

  const options = {
    method: 'POST',
    headers: { accept: 'application/json', 'content-type': 'application/json' },
    body: JSON.stringify({
      id: 1,
      jsonrpc: '2.0',
      params: ['0xfaa4189086f87538f2510790296da5b436d4963b2b9f68f0c4c518fdfee1cfd5'],
      method: 'eth_getTransactionByHash'
    })
  };

  const getDetail = async () => {
    const res = await fetch('https://opbnb-mainnet.nodereal.io/v1/64a9df0874fb4a93b9d0a3849de012d3', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  }


  const getGasPrice = () => {
    const options = {
      method: 'POST',
      headers: { accept: 'application/json', 'content-type': 'application/json' },
      body: JSON.stringify({ id: 1, jsonrpc: '2.0', method: 'eth_gasPrice' })
    };

    fetch('https://opbnb-mainnet.nodereal.io/v1/64a9df0874fb4a93b9d0a3849de012d3', options)
      .then(response => response.json())
      .then(response => {
        console.log(response)

        console.log(parseInt(response.result))
      })
      .catch(err => console.error(err));
  }


  const getTxnbyHash = () => {
    const options = {
      method: 'POST',
      headers: { accept: 'application/json', 'content-type': 'application/json' },
      body: JSON.stringify({
        id: 1,
        jsonrpc: '2.0',
        params: ['0x3d0ef470b15fbfea15122d9fb709cd02a72613704acaa43f2b168a0914d1a563'],
        method: 'eth_getTransactionByHash'
      })
    };

    fetch('https://opbnb-testnet.nodereal.io/v1/64a9df0874fb4a93b9d0a3849de012d3', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  }

  const getGasCost = () => {
    const options = {
      method: 'POST',
      headers: { accept: 'application/json', 'content-type': 'application/json' },
      body: JSON.stringify({
        id: 1,
        jsonrpc: '2.0',
        method: 'eth_estimateGas',
        params: [{ to: '0xd46e8dd67c5d32be8058bb8eb970870f07244567' }]
      })
    };

    fetch('https://bsc-mainnet.nodereal.io/v1/64a9df0874fb4a93b9d0a3849de012d3', options)
      .then(response => response.json())
      .then(response => {
        console.log(response)
        console.log("Parse value", parseInt(response.result))
      })
      .catch(err => console.error(err));
  }

  const getEthCost = () => {
    const options = {
      method: 'POST',
      headers: { accept: 'application/json', 'content-type': 'application/json' },
      body: JSON.stringify({
        id: 1,
        jsonrpc: '2.0',
        method: 'eth_estimateGas',
        params: [{ to: '0xd46e8dd67c5d32be8058bb8eb970870f07244567' }]
      })
    };

    fetch('https://eth-mainnet.nodereal.io/v1/049504cf29bf4e9a874a71a8788cdbee', options)
      .then(response => response.json())
      .then(response => {
        console.log("Parse value", parseInt(response.result))
        console.log(response)
      })
      .catch(err => console.error(err));

  }


  return (
    <main className=" flex flex-col gap-4">

      <button onClick={getDetail}>Get Details</button>
      <button onClick={getGasPrice}>Get Gas price on opbnb</button>
      <button onClick={getTxnbyHash}>Get Txn based on hash</button>
      <button onClick={getGasCost}>Get Gas cost on opbnb</button>
      <button onClick={getEthCost}>Get Gas cost on ETH</button>
    </main>
  );
}
