import Card from "./Card";
import { useState, useEffect } from "react";
import cx from "classnames";
import { Villager, randVillagers } from "./gameHelpers";

interface gameProps {
  currScore: number;
  score: () => void;
  resetScore: () => void;
}
function GameArea({ score, resetScore, currScore }: gameProps) {
  const [villagers, setVillagers] = useState<Villager[]>([]);
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);

  const [cards, setCards] = useState<JSX.Element[]>([]);
  const [clicked, setClicked] = useState<string[]>([]);
  const [reset, setReset] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    const getCharData = async () => {
      try {
        const response = await fetch(
          "https://api.nookipedia.com/villagers?species=cat&game=nl",
          {
            method: "GET",
            headers: {
              "X-API-KEY": `${import.meta.env.VITE_AC_KEY}`,
              "Accept-Version": "1.0.0",
            },
          },
        );
        if (!response.ok) throw new Error("Error, please check API request");
        const villagers = await response.json();
        setVillagers(villagers);
      } catch (error:unknown) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }       
    getCharData();
  }, []); //only call API when mounting component
  useEffect(() => {
    if (villagers.length) {
      if(clicked.length===villagers.length) setWon(true);
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

  if (loading) return <p className="text-white">Loading...</p>;
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
