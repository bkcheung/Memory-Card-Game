import { Villager } from "./gameHelpers";

interface cardProps {
  score: () => void;
  villager: Villager;
  clicked: string[];
  setClicked: React.Dispatch<React.SetStateAction<string[]>>;
  setReset: React.Dispatch<React.SetStateAction<boolean>>;
}
function Card({ score, villager, clicked, setClicked, setReset }: cardProps) {
  return (
    <button
      className="bg-white/50 rounded-xl flex flex-col items-center"
      onClick={() => {
        if (!clicked.includes(`${villager.name}`)) {
          setClicked([...clicked, `${villager.name}`]);
          score();
        } else {
          setClicked([]);
          setReset(true);
        }
      }}
    >
      <img src={villager.image_url} className="h-5/6 p-4"></img>
      <div>{villager.name}</div>
    </button>
  );
}

export default Card;
