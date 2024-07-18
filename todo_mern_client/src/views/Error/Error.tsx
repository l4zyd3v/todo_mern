import s from "./error.module.css";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div className={s.wrapper}>
      <h1 className={s.heading1}>Oopsy, something went wrong</h1>
      <Link className={s.link} to="/">
        Go back to the <span className={s.homeText}>Home</span> page
      </Link>
    </div>
  );
}
