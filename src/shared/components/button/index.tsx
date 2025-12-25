import { memo, type FC } from "react";

interface Props {
  title: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const ButtonCom: FC<Props> = ({
  title,
  type = "button",
  onClick,
  disabled = false, 
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`py-[11px] px-11 rounded-xl font-medium
        ${disabled
          ? "bg-orange-300 text-white cursor-not-allowed"
          : "bg-main text-white cursor-pointer"
        }`}
    >
      {title}
    </button>
  );
};

export default memo(ButtonCom);
