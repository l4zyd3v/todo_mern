import s from "./burgerMenu.module.css";

export default function BurgerMenu() {
  return (
    <div className={s.burgerMenu}>
      <span className={s.burgerElement}></span>
      <span className={s.burgerElement}></span>
    </div>
  );
}
