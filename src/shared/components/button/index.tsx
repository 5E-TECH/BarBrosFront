import { memo, type FC } from "react";

interface Props {
  title: string;
  type?: "button" | "submit" | "reset";
}

const ButtonCom: FC<Props> = ({ title, type }) => {
  return (
    <div>
      <button
        type={type}
        className="bg-main text-white py-[15px] px-12 rounded-xl cursor-pointer"
      >
        {title}
      </button>
    </div>
  );
};

export default memo(ButtonCom);
