import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import styles from "styles/App.module.css";

type imageType = "frame" | "front" | "back" | "";

const url = [
  "https://source.upsplash.com/user/anniespratt/BcGoZXjyPzA",
  "https://source.upsplash.com/user/anniespratt/7MX4Clmx-K0",
  "https://source.upsplash.com/user/enginakyurt/LnBo8a-bHEo",
  "https://source.upsplash.com/user/terminath0r/s2f7p_q7Xfc",
];

function App() {
  const [frame, setFrame] = useState<string>("");
  const [front, setFront] = useState<string>("");
  const [back, setBack] = useState<string>("");

  const contentRef = useRef<HTMLDivElement | null>(null);

  // action
  const [rotateX, setRotateX] = useState(0.0);
  const [rotateY, setRotateY] = useState(0.0);
  const [transition, setTransition] = useState("all .3s ease");
  const [translateZ, setTranslateZ] = useState("0px");

  // mouse
  const mousemoveOn = (e: MouseEvent) => {
    // console.log(e.pageX, e.pageY);
    let xAxis = (window.innerWidth / 2 - e.pageX) / 12;
    let yAxis = (window.innerHeight / 2 - e.pageY) / 12;
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

  // background
  let timer: NodeJS.Timer | null = null;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getRandomImage = async (type: imageType) => {
    if (!timer) {
      const response = await fetch("https://source.unsplash.com/random/white");
      setIsLoading(true);
      timer = setTimeout(function () {
        timer = null;
        switch (type) {
          case "frame":
            setFrame(response.url);
            break;
          case "front":
            setFront(response.url);
            break;
          case "back":
            setBack(response.url);
            break;
          default:
            break;
        }
        console.log(response.url);
        setIsLoading(false);
      }, 100);
    }
  };

  //touch
  const touchmoveOn = (ev: TouchEvent) => {
    let xAxis = (window.innerWidth / 2 - ev.touches[0].pageX) / 12;
    let yAxis = (window.innerHeight / 2 - ev.touches[0].pageY) / 12;
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
    getRandomImage("frame").then(() => {
      getRandomImage("front").then(() => {
        getRandomImage("back");
      });
    });
  }, []);

  return (
    <div className={styles.container}>
      <Outlet />
      <div
        className={styles.frame}
        style={{ backgroundImage: `url(${frame})` }}
      >
        <div
          className={styles.flip}
          ref={contentRef}
          style={{
            transform: `translate(-50%, -50%) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
            transition: `${transition}`,
          }}
        >
          <div
            className={styles.card}
            style={{
              transform: `translateZ(${translateZ})`,
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
      <div className={styles.buttonGroup}>
        <button
          className={styles.button}
          onClick={() => getRandomImage("frame")}
        >
          배경
        </button>
        <button
          className={styles.button}
          onClick={() => getRandomImage("front")}
        >
          앞면
        </button>
        <button
          className={styles.button}
          onClick={() => getRandomImage("back")}
        >
          뒷면
        </button>
      </div>
    </div>
  );
}

export default App;
