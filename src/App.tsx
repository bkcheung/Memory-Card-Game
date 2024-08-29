import { useEffect, useState } from "react";
import "./index.css";
import Header from "./Header";
import GameArea from "./components/GameArea";
import Footer from "./components/Footer";

function App() {
  const storeScore = localStorage.getItem("highScore")
    ? Number(localStorage.getItem("highScore"))
    : 0;
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(storeScore);

  const incrementScore = () => {
    const newScore = score + 1;
    if (newScore > highScore) setHighScore(newScore);
    setScore(newScore);
  };
  const resetScore = () => {
    setScore(0);
  };
  useEffect(() => {
    localStorage.setItem("highScore", JSON.stringify(highScore));
  }, [highScore]);

  return (
    <div id="page">
      <Header highScore={highScore}></Header>
      <GameArea currScore={score} score={incrementScore} resetScore={resetScore}></GameArea>
      <Footer />
    </div>
  );
}

export default App;
