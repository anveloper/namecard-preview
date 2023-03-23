import { Suspense } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "styles/App.module.css";

const App = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Suspense fallback={<div className={styles.loading}>Loading...</div>}>
        <Outlet />
      </Suspense>
      <div className={styles.buttonGroup}>
        <button
          className={styles.button}
          onClick={() => {
            navigate("frame");
          }}
        >
          Frame
        </button>
        <button
          className={styles.button}
          onClick={() => {
            navigate("mockup");
          }}
        >
          Mockup
        </button>
        <button
          className={styles.button}
          onClick={() => {
            navigate("sample");
          }}
        >
          Sample
        </button>
      </div>
    </div>
  );
};

export default App;
