import React, { useState, useEffect } from 'react';
import { getData } from '@/lib/getData';

export const GasCard = () => {
  const [gasData, setGasData] = useState<any>([]);
    const [type , setType] = useState<string>('');

  useEffect(() => {
    const fetchGasData = async () => {
      const data = await getData();
      setGasData(data);
    };

    fetchGasData();
  }, []);

  console.log(gasData,"gas")
  const renderGasFeeEstimate = (estimate : any, title : string) => (
    <>
      <div className="text-lg font-semibold">{title}</div>
      <div>Max Priority Fee: {estimate.suggestedMaxPriorityFeePerGas} Gwei</div>
      <div>Max Fee Per Gas: {estimate.suggestedMaxFeePerGas} Gwei</div>
      <div>Min Wait Time: {estimate.minWaitTimeEstimate / 1000} seconds</div>
      <div>Max Wait Time: {estimate.maxWaitTimeEstimate / 1000} seconds</div>
    </>
  );

  return (
    <div className="space-y-4">
                <select className="p-2 rounded-md mb-4 bg-gray-700 text-white text-center justify-center" onChange={(e) => setType(e.target.value)}>
                <option value="low">Low Gas Fee Estimate</option>
                <option value="medium">Medium Gas Fee Estimate</option>
                <option value="high">High Gas Fee Estimate</option>
              </select>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4">
        {gasData.map(({ chainName , data } : any) => (
          <div key={chainName} className="bg-gray-800 text-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-blue-500 p-4">
              <div className="text-xl font-bold">{chainName.toUpperCase()}</div>
            </div>
            <div className="p-4">
                <p>Estimated Base Fee: {data.estimatedBaseFee}</p>
                <p>Estimated Base Fee: {data.networkCongestion}</p>
                <p>Latest Priority Fee Range : {data?.latestPriorityFeeRange.join(" - ")}</p>
                <h2 className="font-semibold">Historical Priority Fee Range</h2>
          <p>{data?.historicalPriorityFeeRange.join(" - ")}</p>
          <h2 className="font-semibold">Historical Base Fee Range</h2>
          <p>{data?.historicalBaseFeeRange.join(" - ")}</p>
              { type && Object.keys(data).includes(type) && renderGasFeeEstimate(data[type], type.charAt(0).toUpperCase() + type.slice(1) + " Gas Fee Estimate")}
              {/* {Object.keys(data).includes('medium') && renderGasFeeEstimate(data.medium, "Medium Gas Fee Estimate")} */}
              {/* {Object.keys(data).includes('high') && renderGasFeeEstimate(data.high, "High Gas Fee Estimate")} */}
              {/* Optionally render medium and high based on dropdown selection */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


// {
//     "low": {
//         "suggestedMaxPriorityFeePerGas": "0",
//         "suggestedMaxFeePerGas": "0.1",
//         "minWaitTimeEstimate": 15000,
//         "maxWaitTimeEstimate": 30000
//     },
//     "medium": {
//         "suggestedMaxPriorityFeePerGas": "0",
//         "suggestedMaxFeePerGas": "0.135",
//         "minWaitTimeEstimate": 15000,
//         "maxWaitTimeEstimate": 45000
//     },
//     "high": {
//         "suggestedMaxPriorityFeePerGas": "0",
//         "suggestedMaxFeePerGas": "0.17",
//         "minWaitTimeEstimate": 15000,
//         "maxWaitTimeEstimate": 60000
//     },
//     "estimatedBaseFee": "0.1",
//     "networkCongestion": 0,
//     "latestPriorityFeeRange": [
//         "0",
//         "0"
//     ],
//     "historicalPriorityFeeRange": [
//         "0",
//         "0"
//     ],
//     "historicalBaseFeeRange": [
//         "0.1",
//         "0.1"
//     ],
//     "priorityFeeTrend": "down",
//     "baseFeeTrend": "up"
// }