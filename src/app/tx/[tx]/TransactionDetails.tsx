import { Separator } from "@/components/ui/separator";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";

const TransactionDetails = ({ data, logs }: any) => {
  console.log(data, "data");
  const gasPrice = ethers.utils.formatEther(data?.effectiveGasPrice);
  console.log(`Gas Price: ${gasPrice}`);
  const [useropsuccess, setUseropuccess] = useState<boolean>(false);
  const [actualGasCost, setActualGasCost] = useState<number>();
  const [actualGasUsed, setActualGasUsed] = useState<number>();
  const [useropsender, setUseropsender] = useState<string>();
  const [nonce, setNonce] = useState<number>();

  useEffect(() => {
    if (data.to === "0x5ff137d4b0fdcd49dca30c7cf57e578a026d2789") {
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
      setUseropsender(topics[2]);
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
          <p className="text-muted-foreground">Transaction Hash</p>
          <p>{data?.transactionHash}</p>
        </div>

        <div className="flex flex-row gap-6 justify-between">
          <p className="text-muted-foreground">Block Number</p>
          <p>{parseInt(data?.blockNumber, 16)}</p>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-6 justify-between">
          <p className="text-muted-foreground">From</p>
          <p>{data?.from}</p>
        </div>

        <div className="flex flex-row gap-6 justify-between">
          <p className="text-muted-foreground">To</p>
          <p>{data?.to}</p>
        </div>

        <div className="flex flex-row gap-6 justify-between">
          <p className="text-muted-foreground">Gas Price</p>
          <p>{gasPrice && <> $ {gasPrice}</>}</p>
        </div>

        <div className="flex flex-row gap-6 justify-between">
          <p className="text-muted-foreground">Gas used</p>
          <p>{parseInt(data?.gasUsed).toLocaleString()}</p>
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
            <p>{ethers.utils.getAddress(useropsender)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionDetails;
