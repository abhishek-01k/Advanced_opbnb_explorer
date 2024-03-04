"use client"
import { GasCard } from "@/components/GasCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);


  type Options = {

    method: string;
    headers: {
        accept: string;
        'content-type': string;
    };
    body: any;
}

  const options : Options= {
    method: 'POST',
    headers: { accept: 'application/json', 'content-type': 'application/json' },
    body: JSON.stringify({
      id: 1,
      jsonrpc: '2.0',
      // params: ['0x24adb4e5dac9083f3041b735beadd2400eddd3a39552fcf9cad4c8a0736ad703'],
      // params: ['0xa35c21fa17229477b5536eea77de5e7c329f95f0c5388856c08d75aeb7c7911a'],
      // params: ['0x58476b9f46ed4f4aded0992977c0226db38b53a67f5398fee7638e3aa7850866'],
      params: ['0xdd84af26ff9e905a3ece419753a8932bff5df597da9f874b2382515a942f79e5'],
      // params: ['0x56b923f445a978ed4c534c27024a49cda5f7430f5bcd9d1a002d05b325126eb7'],
      // params: ['0x8e5d04adbf0e8d805de414254996e7b09e4594d6b3f9f2eb640738795e3f433d'],
      method: 'eth_getUserOperationByHash'
      // method: 'eth_getTransactionByHash'
      // method: 'eth_getTransactionReceipt'
    })
  };

  const fetchApi = async (url : string, options : Options) => {
    setLoading(true);
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setApiResponse(data);
    } catch (error) {
      console.error("fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getUserOpbyHash = async () => {

    const options = {
      method: 'POST',
      headers: { accept: 'application/json', 'content-type': 'application/json' },
      body: JSON.stringify({
        id: 1,
        jsonrpc: '2.0',
        params: ['0x8482fb46ccb925569fc4efcc3d5e3fb1f4e18badaea67a46de09a475dcf86f5f'],
        method: 'eth_getUserOperationByHash'
      })
    }

    const res = await fetchApi("https://open-platform.nodereal.io/049504cf29bf4e9a874a71a8788cdbee/particle-bundler/97", options);
  }

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
        params: ['0xd9f5051f12ddf3be10b1343a9bdb70d3a0403b04db93f20287fef6e518289825'],
        method: 'eth_getTransactionByHash'
      })
    };

    fetchApi('https://bsc-testnet.nodereal.io/v1/64a9df0874fb4a93b9d0a3849de012d3', options)
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

    router.push(`tx/${txId}`);
  }


  return (
    <main className=" flex flex-col gap-4 items-center mx-8 mt-8">
      <div className="flex w-full max-w-2xl items-center space-x-2 my-4 mb-8">
        <Input className="h-[50px]" onChange={(e) => setTxId(e.target.value)} type="text" placeholder="Enter Transaction hash" />
        <Button onClick={handleTxSearch}>Search</Button>
      </div>

      <GasCard />
    
      <div className="flex gap-20 my-10">
      <Button onClick={getUserOpbyHash}>Get User Op by hash</Button>
      <Button onClick={getDetail}>Get Details</Button>
      <Button onClick={getGasPrice}>Get Gas price on opbnb</Button>
      <Button onClick={getTxnbyHash}>Get Txn based on hash</Button>
      <Button onClick={getGasCost}>Get Gas cost on opbnb</Button>
      <Button onClick={getEthCost}>Get Gas cost on ETH</Button>
      </div>

      {apiResponse && (
        <div className="api-response">
          <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
        </div>
      )}
    </main>
  );
}