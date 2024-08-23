interface headerProps{
    score: number,
    highScore: number
}
function Header({score, highScore}:headerProps){
    return(
        <>
          <div className="flex items-center">
            <div id="title"></div>
            <div id="score" className="flex flex-col items-center justify-center text-white">
                <div>Score: {score}</div>
                <div>High Score: {highScore}</div>
            </div>
          </div>
            <div className="pl-10 text-xl text-white"> 
                Click on each villager once to score points; no repeats!
            </div>
        </>
    )
}

export default Header