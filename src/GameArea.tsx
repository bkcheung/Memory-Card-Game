import Card from "./Card";
import { useState, useEffect } from "react";
import cx from "classnames";

interface gameProps {
  score: () => void;
  resetScore: () => void;
}
function GameArea({ score, resetScore }: gameProps) {
  const [villagers, setVillagers] = useState<Villager[]>([]);
  const [cards, setCards] = useState<JSX.Element[]>([]);
  const [clicked, setClicked] = useState<string[]>([]);
  const [reset, setReset] = useState(false);

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
      const randVillagers = parseResponse(villagers);
      const newCards = randVillagers.map((villager, index) => {
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
  }, [villagers, clicked, score]);

  return (
    <div className="flex justify-center">
      <div id="game">{cards}</div>
      <div
        className={cx(
          "bg-white/30 fixed top-0 left-0 flex items-center justify-center min-h-lvh min-w-full",
          !reset && "hidden",
        )}
      >
        <button
          id="gameover"
          onClick={() => {
            resetScore();
            setReset(false);
          }}
        ></button>
      </div>
    </div>
  );
}
export type Villager = {
  name: string;
  image_url: string;
};
function parseResponse(res: Villager[]) {
  const villagers: Villager[] = [];
  if (res.length) {
    const randIds = randomIds(res.length);
    randIds.map((id: number) => {
      const parsedVillager = {
        name: res[id].name,
        image_url: res[id].image_url,
      };
      villagers.push(parsedVillager);
    });
  }
  return villagers;
}
function randomIds(numVillagers: number) {
  const numCards = 6;
  const ids: number[] = [];
  let i = 0;
  while (i < numCards) {
    const index = Math.floor(Math.random() * numVillagers);
    if (!ids.includes(index)) {
      ids.push(index);
      i++;
    }
  }
  return ids;
}

export default GameArea;
