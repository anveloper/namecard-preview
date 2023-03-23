import React, { useEffect, useState } from "react";

import styles from "styles/pages/Mockup.module.css";

import FRAME1 from "assets/frame.jpg";
import FRAME2 from "assets/frame0.jpg";
import FRAME3 from "assets/frame1.jpg";
import FRONT from "assets/front.jpg";
import BACK from "assets/back.jpg";

import { FcNext, FcPrevious, FcStackOfPhotos } from "react-icons/fc";

const styleArr = [
  { front: styles.op1f, back: styles.op1b },
  { front: styles.op2f, back: styles.op2b },
  { front: styles.op3f, back: styles.op3b },
  { front: styles.op4f, back: styles.op4b },
];
const backgroundArr = [FRAME1, FRAME2, FRAME3];

const Mockup = () => {
  const [frame, setFrame] = useState<string>(FRAME1);
  const [front, setFront] = useState<string>(FRONT);
  const [back, setBack] = useState<string>(BACK);

  const max = styleArr.length;
  const [num, setNum] = useState<number>(0);
  const bgMax = backgroundArr.length;
  const [bg, setBg] = useState<number>(0);

  useEffect(() => {
    setFrame(backgroundArr[bg]);
  }, [bg]);

  return (
    <div className={styles.mockup} style={{ backgroundImage: `url(${frame})` }}>
      <div
        className={`${styles.back} ${styleArr[num].back}`}
        style={{ backgroundImage: `url(${back})` }}
      ></div>
      <div
        className={`${styles.front} ${styleArr[num].front}`}
        style={{ backgroundImage: `url(${front})` }}
      ></div>
      <div className={styles.buttonGroup}>
        <FcPrevious
          onClick={() => {
            if (num > 0) setNum(num - 1);
            else setNum(max - 1);
          }}
        />
        <FcStackOfPhotos
          onClick={() => {
            if (bg !== bgMax - 1) setBg(bg + 1);
            else setBg(0);
          }}
        />
        <FcNext
          onClick={() => {
            if (num < max - 1) setNum(num + 1);
            else setNum(0);
          }}
        />
      </div>
    </div>
  );
};

export default Mockup;
