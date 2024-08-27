import Card from "./Card"
import { useState, useEffect } from "react"

type Villager = {
    name: string;
    image_url: string;
}
function parseResponse(res:Villager[]){
    const villagers: Villager[] = []
    if (res.length) {
        const randIds = randomIds(10);
        randIds.map((id:number)=>{
            const parsedVillager = {name:res[id].name, 'image_url':res[id].image_url};
            villagers.push(parsedVillager)
        })
    }
    return villagers
}
function randomIds(numCards: number) {
    const ids: number[] = [];
    let i = 0;
    while (i < numCards) {
        const index = Math.floor(Math.random() * numCards);
        if (!ids.includes(index)) {
            ids.push(index);
            i++;
        }
    }
    return ids;
}
interface gameProps {
    score: () => void
}

function GameArea({ score }: gameProps) {
    const [cards, setCards] = useState<JSX.Element[]>([]);

    useEffect(() => {
        const getCharData = async () => {
            try {
                const response = await fetch("https://api.nookipedia.com/villagers?species=cat&game=nl", {
                    method: "GET",
                    headers: {
                        "X-API-KEY": `${import.meta.env.VITE_AC_KEY}`,
                        "Accept-Version": "1.0.0"
                    }
                })
                if (!response.ok) throw new Error('Error, please check API request');
                await response.json().then((responseVillagers: Villager[]) => {
                    const villagers = parseResponse(responseVillagers);
                    const newCards = villagers.map((villager, index)=>{
                        return <Card
                                key={index}
                                score={score} 
                                vName={villager.name} 
                                img={villager.image_url}
                                ></Card>
                    })
                    setCards(newCards);
                })
            } catch (error) {
                console.log(error);
            }
        }
        getCharData();
    }, [score])

    return (
        <div id="game">
            {cards}
        </div>
    )
}
export default GameArea