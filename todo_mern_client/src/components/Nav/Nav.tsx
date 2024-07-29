import s from "./nav.module.scss";
import { FaTasks } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { IoAnalyticsSharp } from "react-icons/io5";

type UserFirstLastName = {
  firstname: string;
  lastname: string;
};

export default function Nav({ firstname, lastname }: UserFirstLastName) {
  return (
    <nav className={s.nav}>
      <div className={s.nav__profilePicWrapper}>
        <img
          src="https://1.bp.blogspot.com/-A432NOOC2xI/Va89mmZe_kI/AAAAAAAAA3o/ueZfNQMZS54/s1600/10700304_10154665644540183_2359334464494389137_o.jpg"
          alt="Profile picture"
          className={s.nav__profilePic}
        />
      </div>
      <h4 className={s.nav__profileName}>
        <span className={s.nav__profileName__top}>{firstname}</span>
        <span className={s.nav__profileName__bottom}>{lastname}</span>
      </h4>
      <ul className={s.nav__listOfNavLinks}>
        <li className={s.nav__li}>
          <FaTasks className={s.nav__icons} />
          <a href="#" className={s.nav__navLink}>
            All Tasks
          </a>
        </li>
        <li className={s.nav__li}>
          <BiCategory className={s.nav__icons} />
          <a href="#" className={s.nav__navLink}>
            All categories
          </a>
        </li>
        <li className={s.nav__li}>
          <IoAnalyticsSharp className={s.nav__icons} />
          <a href="#" className={s.nav__navLink}>
            Analytics
          </a>
        </li>
      </ul>
      <div className={s.nav__consistancyWrapper}>Graph</div>
    </nav>
  );
}
