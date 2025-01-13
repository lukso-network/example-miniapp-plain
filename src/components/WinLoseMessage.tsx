import { ethers } from "ethers";
import lsp7Json from '../json/lsp7/lsp7.json'
import { useEffect } from "react";
import { useGrid } from "../context/GridProvider";

type getContractInstanceProps = {
    contractAddress: string,
    signer:any
}

const getContractInstance = async (
    {
    contractAddress,
    signer
    }: getContractInstanceProps
  ) =>{
    return new ethers.Contract(contractAddress, lsp7Json.abi, signer);
};

type LSPFunctionProps = {
    functionName: string,
    contractAddress: string,
}

const executeLSPFunction = async (
    {
    functionName,
    contractAddress,
    } : LSPFunctionProps
  ) => {
    try {
        const {provider, client, accounts, contextAccounts, walletConnected } = useGrid();
        console.log(provider, 'provider')
        let signer = client
        let params = [accounts[0], 1, false, '0x']
    //   const signer = await provider.getSigner();      
      const contract = await getContractInstance(
        {
            contractAddress, 
            signer
        });
      const tx = await contract[functionName](...params)
      await tx.wait();
      console.log("Transaction successful:", tx);
    } catch (error) {
      console.error("Transaction failed:", error);
    }
};

type Props = {
    winMessage: boolean,
    newGame: () => void
}
/* simple popup that will show a game won message if winMessage is true or a game lost message if game was lost. newGame will reset the game with a new word  */
function WinLoseMessage(
    { 
        winMessage, 
        newGame 
    }: Props
    ) 
    {

    useEffect(() => {
        if (winMessage) {
          executeLSPFunction({
            functionName: "mint",
            contractAddress: '0x046bfc3C8f991d96684E2916Fb51ae4B56A5B6FA',
          });
        }
    }, [winMessage]);

    

    return (
        <div
            className="absolute z-20 w-screen h-screen flex items-start justify-center bg-white"
        >
            <div
                className="bg-white flex flex-col items-center justify-center p-3 rounded-2xl mt-40 md:mt-80"
            >
                <h1 
                    className={`${ winMessage ? 'text-[#233742]' : 'text-[#233742]'} text-3xl font-bold mb-5`}
                >
                    { winMessage ? 'Congrats you won! 😸' : 'Sorry you lost! 😿' }
                </h1>
            
                <button 
                    className='bg-[#233742] text-white px-4 py-1 rounded-full mb-5'
                    onClick={newGame}
                >
                    { winMessage ? 'New Game' : 'Restart' }
                </button>
            </div>
            <button onClick={()=> 
                 executeLSPFunction({
                    functionName: "mint",
                    contractAddress: '0x046bfc3C8f991d96684E2916Fb51ae4B56A5B6FA',
                  })}>
                     getNFT </button>
        </div>
    )
}
export default WinLoseMessage