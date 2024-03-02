"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {

  const options = {
    method: 'POST',
    headers: { accept: 'application/json', 'content-type': 'application/json' },
    body: JSON.stringify({
      id: 1,
      jsonrpc: '2.0',
      // params: ['0x24adb4e5dac9083f3041b735beadd2400eddd3a39552fcf9cad4c8a0736ad703'],
      params: ['0xa35c21fa17229477b5536eea77de5e7c329f95f0c5388856c08d75aeb7c7911a'],
      // method: 'eth_getTransactionByHash'
      method: 'eth_getTransactionReceipt'
    })
  };

  const getDetail = async () => {
    const res = await fetch('https://bsc-mainnet.nodereal.io/v1/64a9df0874fb4a93b9d0a3849de012d3', options)
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

  const [txId, setTxId] = useState<string>('');
  const router = useRouter()
  const handleTxSearch = () => {
    if (!txId) return

    console.log("Tx Id: " + txId);
    console.log("router " + router);

    router.push(`tx/${txId}`);
  }


  return (
    <main className=" flex flex-col gap-4">

      <button onClick={getDetail}>Get Details</button>
      <button onClick={getGasPrice}>Get Gas price on opbnb</button>
      <button onClick={getTxnbyHash}>Get Txn based on hash</button>
      <button onClick={getGasCost}>Get Gas cost on opbnb</button>
      <button onClick={getEthCost}>Get Gas cost on ETH</button>


      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input onChange={(e) => setTxId(e.target.value)} type="text" placeholder="Enter Transaction" />
        <Button onClick={handleTxSearch}>Search</Button>
      </div>

    </main>
  );
}
