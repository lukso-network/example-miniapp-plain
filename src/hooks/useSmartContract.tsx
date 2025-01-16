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

  {
    /**
       In order to send a transaction using `up-provider`, we need to target a specific function of the smart contract,
       In this case, the target is the `mint` function. The process involves encoding the required parameters for the
       function in the correct order and then sending the encoded data as part of the transaction.
      
       @params {string} contractAddress - The address of the smart contract we want to interact with.
       @params mintArgs - The arguments for the `mint` function, encoded in the proper format:
         - `contextAccounts[0]` {string}: The recipient address for the minted tokens.
         - `ethers.parseUnits(amount.toString(), "wei")` {BigNumber}: The amount to be minted, converted into the smallest
           unit (e.g., wei or equivalent).
         - `false` {boolean}: A flag indicating whether the recipient should be notified (default is false).
         - `"0x"` {string}: Optional data field, typically used for extra information (default is an empty hex string).
      
       @example
       Here's how we encode the data for the `mint` function and send the transaction:
      
       // Step 1: Encode the function data
       const data = contract.interface.encodeFunctionData("mint", [
         contextAccounts[0],
         ethers.parseUnits(amount.toString(), "wei"),
         false,
         "0x"
       ]);
            
       // Step 2: Send the transaction using the UP provider

       const txResponse = await client.sendTransaction({
         account: contextAccounts[0] as `0x${string}`, // Sender account, msg.sender
         to: contractAddress as `0x${string}`,         // Target smart contract address
         data: data,                                  // Encoded function data
       });
            
       @returns {Promise<void>} Logs the transaction response or throws an error if the transaction fails.
      */
  }

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
      const contract = await getContractInstance(contractAddress, signer);

      const mintArgs: [string, bigint, boolean, string] = [
        contextAccounts[0] as `0x${string}`,
        ethers.parseUnits(amount.toString(), "wei"), // Amount could be ethers or wei
        false as boolean,
        "0x" as string,
      ];

      const data = contract.interface.encodeFunctionData("mint", mintArgs);

      // Sending the transaction via the grid provider
      console.log("Sending transaction...");
      const txResponse = await client.sendTransaction({
        account: contextAccounts[0] as `0x${string}`,
        to: contractAddress as `0x${string}`,
        data: data,
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
