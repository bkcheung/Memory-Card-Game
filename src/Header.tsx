interface headerProps{
    score: number,
    highScore: number
}
function Header({score, highScore}:headerProps){
    return(
        <>
          <div className="flex items-center">
            <div id="title"></div>
            <div id="score" className="text-sm md:text-lg">
                <div>Score: {score}</div>
                <div>Record: {highScore}</div>
            </div>
          </div>
            <div className="pl-10 text-lg md:text-xl text-white"> 
                Click on each villager once to score points; no repeats!
            </div>
        </>
    )
}

export default Header