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
          console.log("win message", winMessage);
          await executeFunctionWithUProvider();
        } catch (error) {
          console.error("Error executing mint function:", error);
        }
      })();
    }
  }, [winMessage]);

  return (
    <div className="absolute shadow-2xl rounded-md p-9 z-20 bg-color flex-col flex items-center justify-center bg-white">
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
