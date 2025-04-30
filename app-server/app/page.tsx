import Image from "next/image";
import styles from "./page.module.css";
import SignInSignUp from "./SignInSignUp";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <SignInSignUp />
      </main>
    </div>
  );
}
