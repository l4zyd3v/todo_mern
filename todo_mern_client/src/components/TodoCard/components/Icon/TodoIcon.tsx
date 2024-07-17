import s from "./todoicon.module.css";

export default function TodoIcon({ color }: { color: string | undefined }) {
  return (
    <div style={{ border: `2px solid ${color}` }} className={s.icon}></div>
  );
}
