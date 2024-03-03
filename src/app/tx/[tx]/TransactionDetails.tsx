import { Separator } from '@/components/ui/separator';
import { ethers } from 'ethers';
import React from 'react';

const TransactionDetails = ({
    data
}: any) => {

    const gasPrice = ethers.formatEther(data.effectiveGasPrice);

    return (
        <div>
            <div className="text-2xl font-bold tracking-tight">Transaction Details</div>

            <Separator className="my-6" />

            <div className='flex flex-col gap-4'>
                <div className='flex flex-row gap-6 justify-between'>
                    <p className="text-muted-foreground">Transaction Hash</p>
                    <p>{data.transactionHash}</p>
                </div>

                <div className='flex flex-row gap-6 justify-between'>
                    <p className="text-muted-foreground">Block Number</p>
                    <p>{parseInt(data.blockNumber, 16)}</p>
                </div>
            </div>

            <Separator className="my-6" />

            <div className='flex flex-col gap-4'>
                <div className='flex flex-row gap-6 justify-between'>
                    <p className="text-muted-foreground">From</p>
                    <p>{data.from}</p>
                </div>

                <div className='flex flex-row gap-6 justify-between'>
                    <p className="text-muted-foreground">To</p>
                    <p>{data.to}</p>
                </div>

                <div className='flex flex-row gap-6 justify-between'>
                    <p className="text-muted-foreground">Gas Price</p>
                    <p>${gasPrice}</p>
                </div>

                <div className='flex flex-row gap-6 justify-between'>
                    <p className="text-muted-foreground">Gas used</p>
                    <p>{parseInt(data.gasUsed).toLocaleString()}</p>
                </div>
            </div>


        </div>
    );
};

export default TransactionDetails;