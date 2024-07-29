import s from "./error.module.scss";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <main className={s.main}>
      <h1 className={s.main__heading1}>Oopsy, something went wrong</h1>
      <Link className={s.main__link} to="/">
        <span className={s.main__homeText}>Go back</span>
      </Link>
    </main>
  );
}
