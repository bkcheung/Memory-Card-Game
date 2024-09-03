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
      } catch (error) {
        console.log(error);
      }
    };
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

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-white">Score: {currScore}/{villagers.length}</div>  
      <div id="game">{cards}</div>
      <div
        className={cx(
          "bg-white/30 fixed top-0 left-0 flex items-center justify-center min-h-lvh min-w-full",
          !reset && "hidden",
        )}>
        <button
          aria-label="gameover"
          id="gameover"
          onClick={() => {
            resetScore();
            setReset(false);
            setClicked([]);
          }}
        ></button>
      </div>
      <div
        className={cx(
          "bg-white/30 fixed top-0 left-0 flex items-center justify-center min-h-lvh min-w-full",
          !won && "hidden",
        )}>
        <button
          aria-label="gameWon"
          id="gameWon"
          onClick={() => {
            resetScore();
            setWon(false);
            setClicked([]);
          }}
        ></button>
      </div>
    </div>
  );
}


export default GameArea;
