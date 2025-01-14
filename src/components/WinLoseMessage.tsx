import { useEffect } from "react";
import { useSmartContract } from "../hooks/useSmartContract";
import { useGrid } from "../context/GridProvider";

type Props = {
  winMessage: boolean;
  newGame: () => void;
};

function WinLoseMessage({ winMessage, newGame }: Props) {
  const { contextAccounts } = useGrid();
  const { executeFunction } = useSmartContract();

  useEffect(() => {
    if (winMessage) {
      (async () => {
        try {
          await executeFunction(
            "0x046bfc3C8f991d96684E2916Fb51ae4B56A5B6FA", // Contract address of the smart contract to interact
            "mint", // Function name
            [contextAccounts[0], 1, false, "0x"] // Function params in order!
          );
        } catch (error) {
          console.error("Error executing mint function:", error);
        }
      })();
    }
  }, [winMessage]);

  return (
    <div className="absolute z-20 w-full h-full flex items-start justify-center bg-white">
      <div className="bg-white flex flex-col items-center justify-center rounded-2xl ">
        <h1
          className={`${
            winMessage ? "text-[#233742]" : "text-[#233742]"
          } text-3xl font-bold mb-5`}
        >
          {winMessage ? "Congrats you won! 😸" : "Sorry you lost! 😿"}
        </h1>

        <button
          className="bg-[#233742] text-white px-4 py-1 rounded-full mb-5"
          onClick={newGame}
        >
          {winMessage ? "New Game" : "Restart"}
        </button>
      </div>
    </div>
  );
}

export default WinLoseMessage;