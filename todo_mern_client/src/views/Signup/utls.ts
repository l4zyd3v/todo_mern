import {  FieldErrors,} from "react-hook-form";
import { FaArrowLeftLong } from "react-icons/fa6";
import { CiLock, CiUnlock } from "react-icons/ci";


function handlePasskwordIconVisibility  (showPassword: boolean)  {
  return showPassword ? (
    <CiLock className={s.togglePasswordVisibility_icons} />
  ) : (
    <CiUnlock className={s.togglePasswordVisibility_icons} />
  );
};


const handleIconPlacement = (
  e: React.ChangeEvent<HTMLInputElement>,
  setPasswordLockIconVisibilitb: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const value = e.target.value as HTMLInputElement["value"];

  if (value) {
    setPasswordLockIconVisibilitb(false);
  } else {
    setPasswordLockIconVisibilitb(true);
  }
};

function handleInputError  (
  errors: FieldErrors<Inputs>,
  inputName: keyof Inputs | undefined,
) {
  if (inputName === undefined) return;

  // return errors[inputName] && (
  //     <span className={s.inputError}>
  //       <FaArrowLeftLong className={s.errorArrow} /> required
  //     </span>
  // );
if(errors[inputName]){
return (

      <span className={s.inputError}>
        <FaArrowLeftLong className={s.errorArrow} /> required
      </span>
)
  }
};

export { handlePasskwordIconVisibility, handleIconPlacement, handleInputError};
