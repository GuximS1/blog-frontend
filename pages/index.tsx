import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Content from "../components";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Content />
      <div
        style={{
          minHeight: "20vh",
          background: "linear-gradient(rgb(0, 1, 51) 0%, rgb(15, 16, 72) 100%)",
        }}
      ></div>
    </div>
  );
};

export default Home;
