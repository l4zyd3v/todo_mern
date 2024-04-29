import s from "./header.module.css";
import { GoBell } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import BurgerMenu from "./components/BurgerMenu";

export default function Header() {
  return (
    <header className={s.header}>
      <BurgerMenu />
      <div className={s.rightSideWrapper}>
        <FiSearch className={s.icons} />
        <GoBell className={s.icons} />
      </div>
    </header>
  );
}
