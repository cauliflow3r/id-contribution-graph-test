import Image from "next/image";
import styles from "./page.module.css";
import ContributionGraph from "@/components/ContributionGraph/ContributionGraph";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1
        className={styles.title}
        style={{ color: "white", marginTop: "20px" }}
      >
        Contribution Graph
      </h1>
      <ContributionGraph />
    </main>
  );
}
