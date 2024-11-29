// GameArea.tsx
import Card from "./Card";
import { useState, useEffect } from "react";
import cx from "classnames";
import { Villager, randVillagers } from "./gameHelpers";

interface GameProps {
  currScore: number;
  score: () => void;
  resetScore: () => void;
}
function GameArea({ score, resetScore, currScore }: GameProps) {
  const [villagers, setVillagers] = useState<Villager[]>([]);
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const [cards, setCards] = useState<JSX.Element[]>([]);
  const [clicked, setClicked] = useState<string[]>([]);
  const [reset, setReset] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    const getCharData = async () => {
      try {
        // Create AbortController for the fetch
        const controller = new AbortController();
        const response = await fetch(
          "https://api.nookipedia.com/villagers?species=cat&game=nl",
          {
            method: "GET",
            headers: {
              "X-API-KEY": `${import.meta.env.VITE_AC_KEY}`,
              "Accept-Version": "1.0.0",
            },
            signal: controller.signal,
          }
        );

        if (!response.ok) throw new Error("Error, please check API request");

        // Get total size of data from headers if available
        const totalSize = Number(response.headers.get('content-length')) || 0;
        const reader = response.body?.getReader();
        let receivedLength = 0;

        // Read the response stream
        const chunks: Uint8Array[] = [];
        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            chunks.push(value);
            receivedLength += value.length;

            // Calculate and update progress
            if (totalSize) {
              const progress = (receivedLength / totalSize) * 100;
              setLoadingProgress(Math.round(progress));
            }
          }
        }

        // Combine chunks and parse JSON
        const allChunks = new Uint8Array(receivedLength);
        let position = 0;
        for (const chunk of chunks) {
          allChunks.set(chunk, position);
          position += chunk.length;
        }

        const result = JSON.parse(new TextDecoder().decode(allChunks));
        setVillagers(result);
      } catch (error: unknown) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getCharData();
  }, []); // only call API when mounting component

  useEffect(() => {
    if (villagers.length) {
      if(clicked.length === villagers.length) setWon(true);
      else{
        const rVillagers = randVillagers(villagers, clicked);
        const newCards = rVillagers.map((villager, index) => {
          return (
            <Card
              key={index}
              score={score}
              villager={villager}
              clicked={clicked}
              setClicked={setClicked}
              setReset={setReset}
            ></Card>
          );
        });
        setCards(newCards);
      }
    }
  }, [villagers, clicked, score]);

  if (loading) {
    return (
      <div className="text-white flex flex-col items-center gap-2">
        <p>Loading...</p>
        <div className="w-64 h-4 bg-white/30 rounded-full">
          <div 
            className="h-full bg-white rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${loadingProgress}%` }}
          ></div>
        </div>
        <p>{loadingProgress}%</p>
      </div>
    );
  }

  if (error) return <p className="text-white">A network error was encountered</p>;

  return (
    <main className="flex flex-col justify-center items-center w-full h-[60%] ">
      <div className="text-white">Score: {currScore}/{villagers.length}</div>  
      <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-2 md: gap-6 p-4">{cards}</div>
      <div
        className={cx(
          "bg-black/70 fixed top-0 left-0 flex items-center justify-center min-h-lvh min-w-full",
          !reset && "hidden",
        )}>
        <button
          aria-label="gameover"
          className="bg-[url('/gameover.jpg')] bg-cover bg-bottom w-80 md:w-[50vw] h-48 md:h-[50vh] rounded-lg md:rounded-3xl"
          onClick={() => {
            resetScore();
            setReset(false);
            setClicked([]);
          }}
        ></button>
      </div>
      <div
        className={cx(
          "bg-black/70 fixed top-0 left-0 flex items-center justify-center min-h-lvh min-w-full",
          !won && "hidden",
        )}>
        <button
          aria-label="gameWon"
          className="bg-[url('/gameWon.jpg')] bg-cover bg-bottom w-80 md:w-[50vw] h-48 md:h-[50vh] rounded-lg md:rounded-3xl"
          onClick={() => {
            resetScore();
            setWon(false);
            setClicked([]);
          }}
        ></button>
      </div>
    </main>
  );
}

export default GameArea;
