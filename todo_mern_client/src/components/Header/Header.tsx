import { useState } from "react";
import s from "./header.module.scss";
import { GoBell } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import BurgerMenu from "./components/BurgerMenu";

export default function Header() {
  return (
    <header className={s.header}>
      <BurgerMenu />
      <div className={s.header__rightSideWrapper}>
        <FiSearch className={s.header__icons} />
        <GoBell className={s.header__icons} />
      </div>
    </header>
  );
}
