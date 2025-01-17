import { useEffect } from "react";
import { useSmartContract } from "../hooks/useSmartContract";

type Props = {
  winMessage: boolean;
  newGame: () => void;
};

function WinLoseMessage({ winMessage, newGame }: Props) {
  const { executeFunctionWithUProvider } = useSmartContract();

  useEffect(() => {
    if (winMessage) {
      (async () => {
        try {
          await executeFunctionWithUProvider();
        } catch (error) {
          console.error("Error executing mint function:", error);
        }
      })();
    }
  }, [winMessage]);

  return (
    <div className="absolute z-20 w-full flex-col h-full flex items-center justify-center bg-white">
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
  );
}

export default WinLoseMessage;
