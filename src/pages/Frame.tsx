import { useEffect, useRef, useState } from "react";

import styles from "styles/pages/Frame.module.css";

import FRAME from "assets/frame.jpg";
import FRONT from "assets/front.jpg";
import BACK from "assets/back.jpg";

const Frame = () => {
  const [frame, setFrame] = useState<string>(FRAME);
  const [front, setFront] = useState<string>(FRONT);
  const [back, setBack] = useState<string>(BACK);

  const contentRef = useRef<HTMLDivElement | null>(null);

  const [isFocus, setIsFocus] = useState<boolean>(false);
  // action
  const [rotateX, setRotateX] = useState(0.0);
  const [rotateY, setRotateY] = useState(0.0);
  const [transition, setTransition] = useState("all .3s ease");
  const [translateZ, setTranslateZ] = useState("0px");

  // mouse
  const mousemoveOn = (e: MouseEvent) => {
    let xAxis = (window.innerWidth / 2 - e.pageX) / 8;
    let yAxis = (window.innerHeight / 2 - e.pageY) / 8;
    setRotateX(xAxis);
    setRotateY(yAxis);
  };
  const mouseenterOn = (e: MouseEvent) => {
    setTransition("none");
    setTranslateZ("100px");
  };

  const mouseleaveOn = (e: MouseEvent) => {
    setRotateX(0.0);
    setRotateY(0.0);
    setTransition("all .3s ease");
    setTranslateZ("0px");
  };

  //touch
  const touchmoveOn = (ev: TouchEvent) => {
    let xAxis = (window.innerWidth / 2 - ev.touches[0].pageX) / 8;
    let yAxis = (window.innerHeight / 2 - ev.touches[0].pageY) / 8;
    setRotateX(xAxis);
    setRotateY(yAxis);
  };
  const touchstartOn = (ev: TouchEvent) => {
    setTransition("none");
    setTranslateZ("100px");
  };

  const touchendOn = (ev: TouchEvent) => {
    setRotateX(0.0);
    setRotateY(0.0);
    setTransition("all .3s ease");
    setTranslateZ("0px");
  };

  useEffect(() => {
    if (!contentRef.current) return;
    const content: HTMLDivElement = contentRef.current;
    // mouse
    content.addEventListener("mousemove", mousemoveOn);
    content.addEventListener("mouseenter", mouseenterOn);
    content.addEventListener("mouseleave", mouseleaveOn);
    // touch
    content.addEventListener("touchmove", touchmoveOn);
    content.addEventListener("touchstart", touchstartOn);
    content.addEventListener("touchend", touchendOn);
    return () => {
      // mouse
      content.removeEventListener("mousemove", mousemoveOn);
      content.removeEventListener("mouseenter", mouseenterOn);
      content.addEventListener("mouseleave", mouseleaveOn);
      // touch
      content.removeEventListener("touchmove", touchmoveOn);
      content.removeEventListener("touchstart", touchstartOn);
      content.removeEventListener("touchend", touchendOn);
    };
  });

  useEffect(() => {
    if (contentRef.current) {
      if (isFocus) contentRef.current.blur();
      else contentRef.current.focus();
    }
  }, [isFocus]);

  return (
    <div className={styles.frame} style={{ backgroundImage: `url(${frame})` }}>
      <div
        className={styles.flip}
        ref={contentRef}
        tabIndex={0}
        onClick={() => {
          setIsFocus(!isFocus);
        }}
        style={{
          transform: `translate(-50%, -50%) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
          transition: `${transition}`,
        }}
      >
        <div
          className={styles.card}
          style={{
            // transform: `translateZ(${translateZ})`,
            transition: "all .3s ease",
          }}
        >
          <div
            className={styles.front}
            style={{ backgroundImage: `url(${front})` }}
          ></div>
          <div
            className={styles.back}
            style={{ backgroundImage: `url(${back})` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
export default Frame;
