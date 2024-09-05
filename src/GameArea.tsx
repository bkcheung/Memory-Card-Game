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
      fetch(
          "https://api.nookipedia.com/villagers?species=cat&game=nl",
          {
            method: "GET",
            headers: {
              "X-API-KEY": `${import.meta.env.VITE_AC_KEY}`,
              "Accept-Version": "1.0.0",
            },
          },
        )
        .then((response)=>{
          if(response.status>=400){
            throw new Error("server error");
          }
          return response.json();
          })
        .then((response) => {
          setVillagers(response);
        })
        .catch((error) => setError(error))
        .finally(()=> setLoading(false));
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
