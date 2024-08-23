interface cardProps{
    score: ()=>void
}
function Card({score}:cardProps){
    return(
        <button className="card" onClick={score}></button>
    )
}

export default Card