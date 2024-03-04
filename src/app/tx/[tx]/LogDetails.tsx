import { Separator } from '@/components/ui/separator';
import { getBytes } from 'ethers';
import React from 'react';

const LogDetails = ({
    logs,
    data
}: any) => {
    console.log("Logs >>>>>>", logs);
    const hex = '0x00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000289959799e9000000000000000000000000000000000000000000000000000000000000020e28';

    // Remove the '0x' prefix
    const hexStripped = hex.slice(2);
    
    // Assuming 32 bytes (64 hex chars) per field
    const nonce = parseInt(hexStripped.substring(0, 64), 16);
    const success = parseInt(hexStripped.substring(64, 128), 16) === 1 ? true : false;
    const actualGasCost = parseInt(hexStripped.substring(128, 192), 16);
    const actualGasUsed = parseInt(hexStripped.substring(192, 256), 16);
    
    console.log(`nonce: ${nonce}`);
    console.log(`success: ${success}`);
    console.log(`actualGasCost: ${actualGasCost}`);
    console.log(`actualGasUsed: ${actualGasUsed}`);
    return (
        <div>
            <div className="text-2xl font-bold tracking-tight mb-4">Transaction Receipt Event Logs</div>

            <Separator className="my-6" />

            <div className='flex flex-col gap-4'>

                {logs.map((log) => (
                    <>
                        <div className='flex mb-4'>
                            <div className='border border-gray-700 rounded-full px-[10px] py-[7px]'>
                                {parseInt(log.logIndex)}
                            </div>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-row gap-2'>
                                <div>Address: </div>
                                <div className='text-muted-foreground'>{log.address}</div>
                            </div>

                            <div className='flex flex-row gap-2'>
                                <div>Topics:</div>
                                <div className='flex flex-col gap-2'>
                                    {log.topics.map((topic, index) => (
                                        <div key={index} className='flex flex-row gap-2 items-center'>
                                            <div className='px-[8px] py-[2px] border-solid border border-gray-300 rounded-lg'>{index}:</div>
                                            <div className='text-muted-foreground'>{topic}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className='flex flex-row gap-2 items-center'>
                                <div>Data: </div>
                                <div className='text-muted-foreground'>{log.data}</div>
                            </div>
                        </div>

                        <Separator className="my-6" />
                    </>
                ))}

            </div>
        </div>
    );
};

export default LogDetails;