import Card from "./Card"

interface gameProps{
    score: ()=>void
}
function GameArea({score}:gameProps){

    return(
        <div id="game">
            <Card score={score}/>
            <Card score={score}/>
            <Card score={score}/>
            <Card score={score}/>
            <Card score={score}/>
            <Card score={score}/>
            <Card score={score}/>
            <Card score={score}/>
            <Card score={score}/>
            <Card score={score}/>
        </div>
    )
}

export default GameArea