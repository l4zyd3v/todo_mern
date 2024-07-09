import s from "./nav.module.css";
import { FaTasks } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { IoAnalyticsSharp } from "react-icons/io5";

type UserFirstLastName = {
  firstname: string;
  lastname: string;
};

export default function Nav({ firstname, lastname }: UserFirstLastName) {
  console.log("firstname", firstname);

  return (
    <nav className={s.nav}>
      <div className={s.profilePicWrapper}>
        <img
          src="https://1.bp.blogspot.com/-A432NOOC2xI/Va89mmZe_kI/AAAAAAAAA3o/ueZfNQMZS54/s1600/10700304_10154665644540183_2359334464494389137_o.jpg"
          alt="Profile picture"
          className={s.profilePic}
        />
      </div>
      <h4 className={s.profileName}>
        <span className={s.profileName__top}>{firstname}</span>
        <span className={s.profileName__bottom}>{lastname}</span>
      </h4>
      <ul className={s.listOfNavLinks}>
        <li className={s.li}>
          <FaTasks className={s.icons} />
          <a href="#" className={s.navLink}>
            All Tasks
          </a>
        </li>
        <li className={s.li}>
          <BiCategory className={s.icons} />
          <a href="#" className={s.navLink}>
            All categories
          </a>
        </li>
        <li className={s.li}>
          <IoAnalyticsSharp className={s.icons} />
          <a href="#" className={s.navLink}>
            Analytics
          </a>
        </li>
      </ul>
      <div className={s.consistancyWrapper}>Graph</div>
    </nav>
  );
}
