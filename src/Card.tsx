interface cardProps{
    score: ()=>void
    vName: string
    img: string
}
function Card({score, vName, img}:cardProps){
    return(
        <button className="bg-white/50 rounded-xl flex flex-col items-center" onClick={score}>
            <img src={img} className="h-5/6 p-4"></img>
            <div>{vName}</div>
        </button>
    )
}

export default Card