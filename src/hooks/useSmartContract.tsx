import { useCallback } from "react";
import { BrowserProvider, Contract, ethers, JsonRpcSigner } from "ethers";
import lsp7Json from "../json/lsp7/lsp7.json";
import { useGrid } from "../context/GridProvider";

export const useSmartContract = () => {
  const { client, contextAccounts, walletConnected } = useGrid();

  const getProvider = async (): Promise<BrowserProvider> => {
    if (!window.lukso) {
      throw new Error("Lukso provider is not available on window object.");
    }
    return new ethers.BrowserProvider(window.lukso);
  };

  const getSigner = useCallback(async (): Promise<JsonRpcSigner> => {
    const browserProvider = await getProvider();
    return browserProvider.getSigner();
  }, []);

  const getContractInstance = useCallback(
    async (
      contractAddress: string,
      signer: ethers.Signer
    ): Promise<Contract> => {
      return new ethers.Contract(contractAddress, lsp7Json.abi, signer);
    },
    []
  );

  {
    /**
   this is the method to interact using ethers.js but we reccomend to use 
  */
  }
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
    [getSigner, getContractInstance]
  );

  const executeFunctionWithGridProvider = useCallback(async () => {
    try {
      if (!client || !walletConnected) {
        console.log("Client or wallet is not connected.");
        return;
      }
      const amount = 1; // Example amount for minting
      const contractAddress = "0x86d112121996f767ab50bc9aad23c5454b72b739";

      console.log("Initializing provider and signer...");
      const provider = await getProvider();
      const signer = await provider.getSigner();

      console.log("Creating contract instance...");
      const contract = new ethers.Contract(
        contractAddress,
        lsp7Json.abi,
        signer
      );

      console.log(`Encoding data for mint function with amount: ${amount}`);
      const data = contract.interface.encodeFunctionData("mint", [
        contractAddress, // Target address (mint recipient)
        ethers.parseUnits(amount.toString(), "ether"), // Amount in the correct format
      ]);

      console.log("Encoded data:", data);

      const tx = {
        from: contextAccounts[0], // Sender address
        to: contractAddress, // Contract address
        data: data, // Function data
        value: ethers.parseUnits(amount.toString(), "ether"), // Optional ETH value
      };

      console.log("Prepared transaction:", tx);

      // Sending the transaction via the grid provider
      console.log("Sending transaction...");
      const txResponse = await client.sendTransaction({
        tx,
      });

      console.log("Transaction response:", txResponse);
    } catch (error) {
      console.error("Transaction failed:", error);
      throw error;
    }
  }, []);

  return {
    executeFunction,
    executeFunctionWithGridProvider,
    getSigner,
    getContractInstance,
  };
};
