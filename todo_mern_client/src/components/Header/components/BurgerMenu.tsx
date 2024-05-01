import { useContext } from "react";
import { NavToggleContext } from "../../../context/NavToggleContext";
import s from "./burgerMenu.module.css";

export default function BurgerMenu() {
  const { toggleNav, setToggleNav } = useContext(NavToggleContext);

  // const handleClick = () => {
  //   if (toggleNav) {
  //     console.log("lol clicked!!!!");
  //     setToggleNav(false);
  //   }
  // };

  console.log(toggleNav);

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
        className={`${s.burgerElement} ${toggleNav ? s.toggleNav : ""}`}
      ></span>
      <span className={s.burgerElement}></span>
      <span className={s.burgerElement}></span>
    </div>
  );
}
