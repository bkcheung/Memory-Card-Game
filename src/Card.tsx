import { Villager } from "./GameArea"

interface cardProps{
    score: ()=>void
    resetScore: ()=>void
    villager: Villager
    clicked: string[]
    setClicked:React.Dispatch<React.SetStateAction<string[]>>
}
function Card({score, resetScore, villager, clicked, setClicked}:cardProps){

    return(
        <button className="bg-white/50 rounded-xl flex flex-col items-center" 
            onClick={()=>{
                if(!clicked.includes(`${villager.name}`)){
                    setClicked([...clicked,`${villager.name}`])
                    score();
                }
                else{
                    console.log('Game over')
                    resetScore();
                    setClicked([]);
                }
            }}>
            <img src={villager.image_url} className="h-5/6 p-4"></img>
            <div>{villager.name}</div>
        </button>
    )
}

export default Card