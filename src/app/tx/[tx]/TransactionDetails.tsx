import { Separator } from "@/components/ui/separator";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";

const TransactionDetails = ({ data, logs }: any) => {

  const gasPrice = ethers.formatEther(data?.effectiveGasPrice);

  const [useropsuccess, setUseropuccess] = useState<boolean>(false);
  const [actualGasCost, setActualGasCost] = useState<number>();
  const [actualGasUsed, setActualGasUsed] = useState<number>();
  const [useropsender, setUseropsender] = useState<string>();
  const [paymaster, setPaymaster] = useState<string>();
  const [nonce, setNonce] = useState<number>();


  useEffect(() => {
    if (data && data.to === "0x5ff137d4b0fdcd49dca30c7cf57e578a026d2789") {
      //  get the last log
      const lastLog = logs[logs.length - 1];
      const hex = lastLog.data;

      // Remove the '0x' prefix
      const hexStripped = hex.slice(2);

      // Assuming 32 bytes (64 hex chars) per field
      const nonce = parseInt(hexStripped.substring(0, 64), 16);
      const success = parseInt(hexStripped.substring(64, 128), 16) === 1;
      const actualGasCost = parseInt(hexStripped.substring(128, 192), 16);
      const actualGasUsed = parseInt(hexStripped.substring(192, 256), 16);
      console.log("i am putting success to", success);
      setUseropuccess(success);
      setActualGasCost(actualGasCost);
      setActualGasUsed(actualGasUsed);
      setNonce(nonce);

      const topics = lastLog.topics;
      console.log("topics", topics);
      setUseropsender(topics[2]);
      setPaymaster(topics[topics.length - 1]);
      console.log(topics[2]);
    }
  }, [data, logs]); //

  return (
    <div>
      <div className="text-2xl font-bold tracking-tight">
        Transaction Details
      </div>

      <Separator className="my-6" />

      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-6 justify-between">
          <p className="text-muted-foreground">Transaction Hash:</p>
          <p>{data?.transactionHash}</p>
        </div>

        <div className="flex flex-row gap-6 justify-between">
          <p className="text-muted-foreground">Block Number:</p>
          <p>{parseInt(data?.blockNumber, 16)}</p>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-6 justify-between">
          <p className="text-muted-foreground">From:</p>
          <p>{data?.from}</p>
        </div>

        <div className="flex flex-row gap-6 justify-between">
          <p className="text-muted-foreground">To:</p>
          <p>{data?.to}</p>
        </div>

        <div className="flex flex-row gap-6 justify-between">
          <p className="text-muted-foreground">Status:</p>
          <p className="border border-gray-300 bg-green-300 px-2 py-1 rounded-lg text-gray-700">{data.status == '0x1' && "Success"}</p>
        </div>

        <div className="flex flex-row gap-6 justify-between">
          <p className="text-muted-foreground">Gas Price:</p>
          <p>{gasPrice && <> $ {gasPrice}</>}</p>
        </div>

        <div className="flex flex-row gap-6 justify-between">
          <p className="text-muted-foreground">Gas used:</p>
          <p>${parseInt(data?.gasUsed).toLocaleString()}</p>
        </div>

        <Separator className="my-6" />

        <div className="text-xl font-bold tracking-tight">
          User Operation Details
        </div>

        {useropsuccess && (
          <div className="flex flex-row gap-6 justify-between">
            <p className="text-muted-foreground">Success</p>
            <p>{useropsuccess.toString()}</p>
          </div>
        )}

        {actualGasUsed && (
          <div className="flex flex-row gap-6 justify-between">
            <p className="text-muted-foreground">Actual Gas Used</p>
            <p>{actualGasUsed}</p>
          </div>
        )}

        {nonce && (
          <div className="flex flex-row gap-6 justify-between">
            <p className="text-muted-foreground">Nonce</p>
            <p>{nonce}</p>
          </div>
        )}
        {useropsender && (
          <div className="flex flex-row gap-6 justify-between">
            <p className="text-muted-foreground">Sender</p>
            <p>{useropsender}</p>
          </div>
        )}
        {paymaster != "0x0000000000000000000000000000000000000000000000000000000000000000" && (
          <div className="flex flex-row gap-6 justify-between">
            <p className="text-muted-foreground">Paymaster</p>
            <p>{paymaster}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionDetails;
