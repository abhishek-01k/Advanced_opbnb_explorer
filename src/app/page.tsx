"use client"
import { GasCard } from "@/components/GasCard";
import GasComparison from "@/components/gascomparison/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {

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


    </main>
  );
}
