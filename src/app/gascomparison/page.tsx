"use client"
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Cards from '@/components/Cards';

const GasComparison = () => {

    const [opGas, setOpGas] = useState<string>('');
    const [gasPolygon, setGasPolygon] = useState<string>('');
    const [gasOptimisim, setGasOptimisim] = useState<string>('');
    const [currentTime, setCurrentTime] = useState(new Date());
    const [polygonTime, setPolygonTime] = useState(new Date());
    const [opmTime, setOpmTime] = useState(new Date());

    const opbnbGas = () => {
        const options = {
            method: 'POST',
            headers: { accept: 'application/json', 'content-type': 'application/json' },
            body: JSON.stringify({ id: 1, jsonrpc: '2.0', method: 'eth_gasPrice' })
        };

        fetch('https://opbnb-testnet.nodereal.io/v1/64a9df0874fb4a93b9d0a3849de012d3', options)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                const { result } = response;
                const number = ethers.formatEther(result);
                console.log("Response", parseInt(result), number);
                setOpGas(number)
                setCurrentTime(new Date());
            })
            .catch(err => console.error(err));
    }

    const polygonGas = () => {
        const options = {
            method: 'POST',
            headers: { accept: 'application/json', 'content-type': 'application/json' },
            body: JSON.stringify({ id: 1, jsonrpc: '2.0', method: 'eth_gasPrice' })
        };

        fetch('https://polygon-mainnet.nodereal.io/v1/f510fc4d083b49d1ab383d25246cc7de', options)
            .then(response => response.json())
            .then(response => {
                console.log("Response", parseInt(response.result));
                console.log(response)
                const { result } = response;
                const number = ethers.formatEther(result);
                console.log("Response", parseInt(result), number);
                setGasPolygon(number);
                setPolygonTime(new Date());
            })
            .catch(err => console.error(err));
    }

    const optimisimGas = () => {
        const options = {
            method: 'POST',
            headers: { accept: 'application/json', 'content-type': 'application/json' },
            body: JSON.stringify({ id: 1, jsonrpc: '2.0', method: 'eth_gasPrice' })
        };

        fetch('https://opt-mainnet.nodereal.io/v1/1659dfb40aa24bbb8153a677b98064d7', options)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                const { result } = response;
                const number = ethers.formatEther(result);
                console.log("Response", parseInt(result), number);
                setGasOptimisim(number);
                setOpmTime(new Date());
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        opbnbGas();
        polygonGas();
        optimisimGas();
    }, [])



    return (
        <div className=' min-h-screen '>
            hey there
            <div onClick={opbnbGas}>Op BNB gas</div>
            <div onClick={polygonGas}>Polygon gas</div>
            <div onClick={optimisimGas}>Optimisim gas</div>

            <div className='flex flex-row justify-center gap-24'>
                <Cards title='Polygon' gas={gasPolygon} handleGas={polygonGas} time={polygonTime} />
                <Cards title='OpBNB' gas={opGas} handleGas={opbnbGas} time={currentTime} />
                <Cards title='Optimisim' gas={gasOptimisim} handleGas={optimisimGas} time={opmTime} />
            </div>



        </div>
    );
};

export default GasComparison;