import { useContext } from "react";
import { NavToggleContext } from "../../../context/NavToggleContext";
import s from "./burgerMenu.module.scss";

export default function BurgerMenu() {
  const { toggleNav, setToggleNav } = useContext(NavToggleContext);

  return (
    <div
      className={s.burgerMenu}
      onClick={() => {
        setToggleNav(!toggleNav);
        console.log("testtesttest");
      }}
    >
      <span
        // onClick={handleClick}
        className={`${s.burgerMenu__burgerElement} ${toggleNav ? s.burgerMenu__toggleNav : ""}`}
      ></span>
      <span className={s.burgerMenu__burgerElement}></span>
      <span className={s.burgerMenu__burgerElement}></span>
    </div>
  );
}
