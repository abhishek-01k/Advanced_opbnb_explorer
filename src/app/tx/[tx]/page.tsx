"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Data from "@/tx.json";
import { Separator } from '@/components/ui/separator';
import Sidebar from '@/components/Sidebar';
import LogDetails from './LogDetails';
import TransactionDetails from './TransactionDetails';

const TxPage = ({ params }: any) => {
    const router = useRouter();

    const { tx } = params;

    const [activeState, setActiveState] = useState<number>(1);
    const [data, setData] = useState(Data);

    const getDetail = async (tx: string) => {

        const options = {
            method: 'POST',
            headers: { accept: 'application/json', 'content-type': 'application/json' },
            body: JSON.stringify({
                id: 1,
                jsonrpc: '2.0',
                params: [tx],
                method: 'eth_getTransactionReceipt'
            })
        };

        const res = await fetch('https://bsc-testnet.nodereal.io/v1/64a9df0874fb4a93b9d0a3849de012d3', options)
            .then(response => response.json())
            .then(response => {
                setData(response.result);
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        if (tx) {
            getDetail(tx);
        }
    }, [tx])

    return (
        <div className="hidden space-y-6 p-10 pb-16 md:block">
            <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">Transaction Details</h2>
                <p className="text-muted-foreground">
                    Manage your account settings and set e-mail preferences.
                </p>
            </div>
            <Separator className="my-6" />

            <div className="flex flex-row">
                <aside className="mx-4 min-w-[150px]">
                    <Sidebar setActiveState={setActiveState} activeState={activeState} />
                </aside>
                <div className="">
                    {activeState === 1 && <TransactionDetails data={data} logs={data.logs} />}
                    {activeState === 2 && <LogDetails logs={data.logs} data={data} />}
                </div>

            </div>
        </div>
    );
};

export default TxPage;