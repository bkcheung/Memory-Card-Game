import Card from "./Card"
import { useState, useEffect } from "react"

interface gameProps {
    score: () => void
}
function GameArea({ score }: gameProps) {
    const [villagers, setVillagers] = useState<Villager[]>([])
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
                const villagers = await response.json();
                setVillagers(villagers);
            } catch (error) {
                console.log(error);
            }
        }
        getCharData();
    }, []) //only call API when mounting component
    useEffect(() => {
        if(villagers.length){
            const randVillagers = parseResponse(villagers);
            const newCards = randVillagers.map((villager, index)=>{
                return <Card
                        key={index}
                        score={score} 
                        vName={villager.name} 
                        img={villager.image_url}
                        ></Card>
            })
            setCards(newCards);
        }     
    }, [villagers, score])
    
    return (
        <div id="game">
            {cards}
        </div>
    )
}
type Villager = {
    name: string;
    image_url: string;
}
function parseResponse(res:Villager[]){
    const villagers: Villager[] = []
    if (res.length) {
        const randIds = randomIds();
        randIds.map((id:number)=>{
            const parsedVillager = {name:res[id].name, 'image_url':res[id].image_url};
            villagers.push(parsedVillager)
        })
    }
    return villagers
}
function randomIds() {
    const numCards = 8;
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
export default GameArea