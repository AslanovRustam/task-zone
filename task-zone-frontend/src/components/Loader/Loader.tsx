import { ClockLoader } from "react-spinners";

import style from "./loader.module.css";

export const Loader = () => {
  return (
    <div className={style.backdrop}>
      <ClockLoader color="#36bed6" />
    </div>
  );
};
