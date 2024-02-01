import { ConnectWallet } from "@thirdweb-dev/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home({ contract, api3_contract }) {
  // ... existing code
  console.log("I am contract from app.js file", contract);

  const [nfts, setNFTs] = useState([]); // Use state to store NFT data

  async function getNFTData() {
    const nftsData = [];
    for (let i = 0; i < 10; i++) { // Assuming you have 10 NFTs
      const nftData = await contract._nftData(i);
      nftsData.push({
        id: i,
        name: nftData.name,
        tokenURI: nftData.tokenURI,
      });
    }
    setNFTs(nftsData); // Update the state with the fetched NFT data
  }

  const RandomNumberSetter = async () => {
    try {
      const data = api3_contract.makeRequestUint256();
      console.log("success")

    } catch (error) {

    }
  }
  let generatedNumbers = [];

  const [Frandom, setFrandom] = useState()
  const [finalNum, setFinalNum] = useState(0)
  let randomNumber;
  function getRandomNumberInRange(minValue, maxValue) {
    // Ensure minValue and maxValue are positive integers
    minValue = Math.abs(Math.floor(minValue));
    maxValue = Math.abs(Math.floor(maxValue));

    // If all numbers in the range have been generated, reset the array
    if (generatedNumbers.length === maxValue - minValue + 1) {
      generatedNumbers = [];
    }

    let randomNumberhel;
    do {
      // Generate a random number within the range and round to the nearest integer
      randomNumberhel = Math.floor(Math.random() * (maxValue - minValue)) + minValue;
      let randomNumber = parseFloat(randomNumberhel.toString().substring(0, 3));
      console.log("hellllo", Math.round(randomNumber))
      setFrandom(randomNumber)
      randomNumber = Math.round(randomNumber);
    } while (generatedNumbers.includes(randomNumber));

    // Add the generated number to the array
    generatedNumbers.push(randomNumber);
    return randomNumber;
  }

  const getRandomNumber = async () => {
    try {
      const caller = await RandomNumberSetter();
      const data = await api3_contract.getRandomNumber();
      console.log(data);
      alert(data)
      // Assume 'randomNumber' is the number you got from Pyth Network's Entropy
      const minValue = 1;
      const maxValue = 10;
      const result = await getRandomNumberInRange(data, minValue, maxValue);
      console.log(`The random number between ${minValue} and ${maxValue} is Frandom :  ${Frandom}`, typeof (Frandom));
      let finalNum = Math.round(Frandom)
      console.log("Final number is ", finalNum)
      setFinalNum(finalNum)
      return finalNum;
    } catch (error) {
      alert("Something went Wrong", error)
    }
  }

  function handlePlaceChance() { }


  const mintRandomNFT = async () => {
    try {
      const data = await contract.safeMintForUser(finalNum, { value: 1000000000000000 })
      console.log("success")
    } catch (error) {
      alert(error)
    }
  }

  // const data = await contract.addNFTToCollection("caterpie", "https://ipfs.io/ipfs/QmVYzeHKcacFD8Yp58gq1Ei8K9bfmnsgzsBPAGW2449Zgn/caterpie.png")
  // console.log("success")
  return (
    // <main className="bg-black text-white container flex justify-center">
    <main className="flex flex-col items-center justify-center container p-8 mx-auto makeitcenter" >
      <h1 className="text-3xl font-bold mb-8">NFT Lottery</h1>
      <ConnectWallet>
        {({ connect }) => (
          <button className="bg-purple-600 text-white px-4 py-2 rounded-full cursor-pointer font-semibold transition duration-300 hover:bg-purple-700" onClick={connect}>
            Connect Wallet
          </button>
        )}
      </ConnectWallet>

      <br />
      <br />

      <div>
        <h2>
          Pay 0.001 eth and Get a Random NFT from a bunch of Some Precious Nfts
        </h2>
      </div>
      <div className="flex-col">
        <button className="flex items-center justify-center text-white px-4 py-2 rounded-full cursor-pointer font-semibold transition duration-300 codepen-button" onClick={mintRandomNFT}>
          <span>MINT RANDOM NFTs</span>
        </button>
      </div>
      <div className="flex-col">
        <button className="flex items-center justify-center text-white px-4 py-2 rounded-full cursor-pointer font-semibold transition duration-300 codepen-button" onClick={getRandomNumber}>
          <span> Random Number</span>
        </button>
      </div>
      <section className="container mx-auto p-8">
        <h2>Here is the Glimpse of our wonderful NFTs Collection </h2>
        <br></br>
      <div className="flex-col">
        <button className="flex items-center justify-center text-white px-4 py-2 rounded-full cursor-pointer font-semibold transition duration-300 codepen-button" onClick={getNFTData}>
          <span> Get a glance of our NFTs Collection</span>
        </button>
      </div>
        <div className="flex flex-row flex-wrap -mx-2">
          {nfts.map((nft) => (
            <span key={nft.id} className="w-full md:w-1/2 h-64 md:h-auto mb-4 px-2">
              <img src={nft.tokenURI} alt={`NFT ${nft.id}`} className="block w-full h-full bg-grey-dark bg-no-repeat bg-center bg-cover" />
            </span>
          ))}
        </div>
      </section>
    </main>
  );

}
