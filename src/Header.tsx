import ReactHowler from "react-howler";
import { useState } from "react";
import cx from "classnames";
interface headerProps {
  highScore: number;
}
function Header({ highScore }: headerProps) {
  const [play, setPlay] = useState(true);
  return (
    <>
      <div className="flex items-center">
        <div id="title"></div>
        <div id="score" className="text-sm md:text-lg">
          <div>High</div>
          <div>Score: {highScore}</div>
        </div>
      </div>
      <div className="flex items-center">
        <button
          id="music"
          className={cx("", !play && "off")}
          onClick={() => setPlay(!play)}
        >
          <ReactHowler src="/bgm.flac" playing={play} loop={true} />
        </button>
        <div className="text-lg md:text-xl text-white text-center">
          Click on each villager once to score points; no repeats!
        </div>
      </div>
    </>
  );
}

export default Header;
