"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {

const iframeUrls = [
  "https://covalent-embed.vercel.app/card_17027896cc9848ba8c905fee08e?embed=356c2827223a2b3c6c74282f223d2b626c2d262f27203d6c741513626c2f29296c746c2a2f2722376c626c3c2f20292b6c746c222f3d3a113f3b2f3c3a2b3c6c33",
  "https://covalent-embed.vercel.app/card_b0fc55f2a8524c099910064ad43?embed=356c2827223a2b3c6c74282f223d2b626c2d262f27203d6c741513626c2f29296c746c2a2f2722376c626c3c2f20292b6c746c222f3d3a113f3b2f3c3a2b3c6c33",
  "https://covalent-embed.vercel.app/card_c8dc0f323b1244018e0ebd1b354?embed=356c2827223a2b3c6c74282f223d2b626c2d262f27203d6c741513626c2f29296c746c2a2f2722376c626c3c2f20292b6c746c222f3d3a113f3b2f3c3a2b3c6c33",
  "https://covalent-embed.vercel.app/card_fa5fc20223b748a2805c9172a86?embed=356c2827223a2b3c6c74282f223d2b626c2d262f27203d6c741513626c2f29296c746c2a2f2722376c626c3c2f20292b6c746c222f3d3a113f3b2f3c3a2b3c6c33",
  "https://covalent-embed.vercel.app/card_aaec2e41b3b14158bda242b9ab8?embed=356c2827223a2b3c6c74282f223d2b626c2d262f27203d6c741513626c2f29296c746c2a2f2722376c626c3c2f20292b6c746c222f3d3a113f3b2f3c3a2b3c6c33",
  "https://covalent-embed.vercel.app/card_6a63b73879a142b684ad37d2644?embed=356c2827223a2b3c6c74282f223d2b626c2d262f27203d6c741513626c2f29296c746c2a2f2722376c626c3c2f20292b6c746c222f3d3a113f3b2f3c3a2b3c6c33",
];

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

      {/* Grid layout for iframes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {iframeUrls.map((url, index) => (
          <div key={index} className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              src={url}
              width="100%"
              height="400"
              style={{ border: "none" }}
              title={`Embedded Card ${index + 1}`}
            ></iframe>
          </div>
        ))}
      </div>
  
    </main>
  );
}