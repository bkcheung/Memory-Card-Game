import ReactHowler from "react-howler";
import { useState } from "react";
import cx from "classnames";
interface headerProps {
  highScore: number;
}
function Header({ highScore }: headerProps) {
  const [play, setPlay] = useState(true);
  return (
    <header className="flex flex-col items-center mt-4 md:mt-12">
      <div className="flex items-center">
        <div className="bg-[url('/wood.png')] bg-contain bg-no-repeat w-[16rem] md:w-[28rem] h-[4.75rem] md:h-[8rem] md:mt-4"></div>
        <div className="bg-[url('/leaf.png')] bg-contain bg-no-repeat flex flex-col items-center justify-center text-white text-sm md:text-lg w-28 h-28 md:w-36 md:h-36">
          <div>High</div>
          <div>Score: {highScore}</div>
        </div>
      </div>
      <div className="flex items-center">
        <button
          id="music"
          className={cx("bg-contain bg-no-repeat bg-center w-14 h-14 md:mr-4", !play && "bg-[url('music-off.png')]", play && "bg-[url('/music.png')]")}
          onClick={() => setPlay(!play)}
          aria-label="music"
        >
          <ReactHowler src="/bgm.flac" playing={play} loop={true} />
        </button>
        <div className="md:text-xl text-white text-center pt-4">
          Click on each villager once to score points; no repeats!
        </div>
      </div>
    </header>
  );
}

export default Header;
