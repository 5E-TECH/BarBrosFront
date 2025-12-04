import { DollarSign, DollarSignIcon, MoveUp } from "lucide-react";
import { memo } from "react";

const Statistics = () => {
  return (
    <div>
      <h2 className="text-maintext text-[28px] font-medium mb-[41px]">
        Statistics
      </h2>
      <div className="flex justify-between gap-40">


        <div className="border-2 border-[#EAEAEA] rounded-[8px] px-[24px] py-[28px] flex justify-between gap-[12px]">
          <div className="flex flex-col">
            <span className="text-helpertext font-normal text-[15px]">Kun</span>
            <strong className="text-maintext text-[30px] font-medium flex">
              1 000 000{" "}
              <span className="text-[15px] text-[#49C96D] font-normal pl-[10px] flex items-center">
                <MoveUp size={15} /> 50.8%
              </span>
            </strong>
          </div>
          <div className="w-[88px] h-[88px] bg-[#fff4e6] rounded-2xl flex justify-center items-center">
            <DollarSignIcon size={50} strokeWidth={3} color="#FA8B00" />
          </div>
        </div>

        <div className="border-2 border-[#EAEAEA] rounded-[8px] px-[24px] py-[28px] flex justify-between gap-[12px]">
          <div className="flex flex-col">
            <span className="text-helpertext font-normal text-[15px]">Kun</span>
            <strong className="text-maintext text-[30px] font-medium flex">
              1 000 000{" "}
              <span className="text-[15px] text-[#49C96D] font-normal pl-[10px] flex items-center">
                <MoveUp size={15} /> 50.8%
              </span>
            </strong>
          </div>
          <div className="w-[88px] h-[88px] bg-[#fff4e6] rounded-2xl flex justify-center items-center">
            <DollarSignIcon size={50} strokeWidth={3} color="#FA8B00" />
          </div>
        </div>

        <div className="border-2 border-[#EAEAEA] rounded-[8px] px-[24px] py-[28px] flex justify-between gap-[12px]">
          <div className="flex flex-col">
            <span className="text-helpertext font-normal text-[15px]">Kun</span>
            <strong className="text-maintext text-[30px] font-medium flex">
              1 000 000{" "}
              <span className="text-[15px] text-[#49C96D] font-normal pl-[10px] flex items-center">
                <MoveUp size={15} /> 50.8%
              </span>
            </strong>
          </div>
          <div className="w-[88px] h-[88px] bg-[#fff4e6] rounded-2xl flex justify-center items-center">
            <DollarSignIcon size={50} strokeWidth={3} color="#FA8B00" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Statistics);
