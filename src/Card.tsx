// Card.tsx
import { Villager } from "./gameHelpers";
import { useState, useRef } from "react";
import cx from "classnames";

interface cardProps {
  score: () => void;
  villager: Villager;
  clicked: string[];
  setClicked: React.Dispatch<React.SetStateAction<string[]>>;
  setReset: React.Dispatch<React.SetStateAction<boolean>>;
}

function Card({ score, villager, clicked, setClicked, setReset }: cardProps) {
  const [isSelected, setIsSelected] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);


  const handleClick = () => {
    setIsSelected(true);
    
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => {
        console.log("Audio playback failed:", error);
      });
    }

    // Set feedback
    const isCorrect = !clicked.includes(`${villager.name}`);
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    
    setTimeout(() => {
      if (isCorrect) {
        setClicked([...clicked, `${villager.name}`]);
        score();
      } else {
        setReset(true);
      }
      setIsSelected(false);
      setFeedback(null);
    }, 500);
  };

  return (
    <>
    <button
      className={cx(
        "relative bg-white/50 rounded-xl flex flex-col items-center transition-all duration-500",
        "hover:bg-white/60 hover:scale-[1.02] hover:shadow-lg",
        "active:scale-95",
          isSelected && "animate-select pointer-events-none",
          feedback === 'correct' && "border-green-500/30 border-8",
          feedback === 'incorrect' && "border-red-500/30 border-8",
      )}
      onClick={handleClick}
    >
      <img src={villager.image_url} className="h-5/6 p-4" alt={villager.name}></img>
            <div>{villager.name}</div>
    </button>
      <audio 
        ref={audioRef} 
        preload="auto"
        src="/flip.mp3">
      </audio>
    </>
  );
}

export default Card;
