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
    console.log("Router", router, params);

    const { tx } = params;
    console.log("Tx", tx, Data);


    const [activeState, setActiveState] = useState<number>(1);
    const [data, setData] = useState(Data);

    useEffect(() => {
        if (tx) {

        }
    }, [tx])


    console.count();

    return (
        <div className="hidden space-y-6 p-10 pb-16 md:block">
            <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">Transaction Details</h2>
                <p className="text-muted-foreground">
                    Manage your account settings and set e-mail preferences.
                </p>
            </div>
            <Separator className="my-6" />

            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <aside className="-mx-4 lg:w-1/5">
                    <Sidebar setActiveState={setActiveState} activeState={activeState} />
                </aside>
                <div className="flex-1 lg:max-w-2xl">
                    {activeState === 1 && <TransactionDetails data={data} />}
                    {activeState === 2 && <LogDetails logs={data.logs} />}
                </div>

            </div>
        </div>
    );
};

export default TxPage;