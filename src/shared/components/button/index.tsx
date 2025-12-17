import { memo, type FC } from "react";

interface Props {
  title: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const ButtonCom: FC<Props> = ({ title, type, onClick }) => {
  return (
    <div>
      <button
        onClick={onClick}
        type={type}
        className="bg-main text-white py-[15px] px-12 rounded-xl cursor-pointer font-medium"
      >
        {title}
      </button>
    </div>
  );
};

export default memo(ButtonCom);
