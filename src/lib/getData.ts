const Auth = Buffer.from(
    `${process.env.NEXT_PUBLIC_INFURA_KEY}:${process.env.NEXT_PUBLIC_INFURA_SECRET_KEY}`
  ).toString("base64");
  
  // The chain ID of the supported network
  const chainIDs = {
    arbitrium: 42161,
    polygon: 137,
    optimism: 10,
    zksync: 324,
    opbnb: 204,
  };
  
  export const getData = async () => {
    const fetchPromises = Object.entries(chainIDs).map(async ([chainName, chainId]) => {
      try {
        const res = await fetch(`https://gas.api.infura.io/networks/${chainId}/suggestedGasFees`, {
          headers: {
            Authorization: `Basic ${Auth}`,
          },
        });
    
        const data = await res.json();
        return { chainName, data }; // Return both the chain name and its data
      } catch (error) {
        console.log(`Error fetching data for ${chainName}:`, error);
        return null; // Handle error case
      }
    });
  
    const results = await Promise.all(fetchPromises);
    return results.filter(result => result !== null); // Filter out any failed requests
  };
  