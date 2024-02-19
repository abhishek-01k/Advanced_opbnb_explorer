import { TimeInterval } from '@/helpers/TimeInterval';
import React from 'react';
import { BiRefresh } from "react-icons/bi";

const Cards = ({
    title,
    gas,
    handleGas,
    time
}: any) => {
    return (
        <div className='border border-gray-300 gap-3 flex flex-col px-4 py-2 rounded-lg'>
            <div className='flex flex-row justify-between text-[14px] pt-2'>
                <div className='text-[20px]'>{title}</div>
                <div className='flex flex-row gap-2 items-center'>
                    <p><TimeInterval date={time} /></p>
                    <BiRefresh onClick={handleGas} className='cursor-pointer' />
                </div>
            </div>
            <div className='text-xl font-[500] mb-2'>${gas ? gas : 0}</div>
        </div>
    );
};

export default Cards;