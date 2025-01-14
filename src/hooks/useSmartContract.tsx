import { useCallback } from "react";
import { BrowserProvider, Contract, ethers, JsonRpcSigner } from "ethers";
import lsp7Json from "../json/lsp7/lsp7.json";


export const useSmartContract = () => {

    const getProvider = (): BrowserProvider => {
    if (!window.lukso) {
        throw new Error("Lukso provider is not available on window object.");
    }
    return new ethers.BrowserProvider(window.lukso);
    };

  const getSigner = useCallback(async () : Promise<JsonRpcSigner> => {
    const browserProvider = getProvider();
    return browserProvider.getSigner();
  }, []);

  const getContractInstance = useCallback(
    async (contractAddress: string, signer: ethers.Signer) : Promise<Contract> => {
      return new ethers.Contract(contractAddress, lsp7Json.abi, signer);
    },[]);

  const executeFunction = useCallback(
    async (contractAddress: string, functionName: string, params: any[]) => {
      try {
        const signer = await getSigner(); // would be nice to change this one with provider and signer from gridProvider.
        const contract = await getContractInstance(contractAddress, signer); // same for the interaction with the smart contract.
        const tx = await contract[functionName](...params);
        await tx.wait();
        console.log("Transaction successful:", tx);
        return tx;
      } catch (error) {
        console.error("Transaction failed:", error);
        throw error;
      }
    },
    [getSigner, getContractInstance,]
  );

  return {
    executeFunction,
    getSigner,
    getContractInstance,
  };
};