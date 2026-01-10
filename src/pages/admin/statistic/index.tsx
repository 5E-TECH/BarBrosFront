import { DollarSign, MoveUp } from "lucide-react";
import { memo } from "react";
import StatisticsChart from "./components/StatisticsChart";
import AnalyticsChart from "./components/AnalyticsChart";
import PageHeader from "../../../shared/components/pageHeader";

const Statistics = () => {
  return (
    <div>
      <div className='mb-6'>
        <PageHeader title="Statistics" />
      </div>
      <div className="flex justify-between gap-40">
        <div className="border-2 border-[#EAEAEA] rounded-xl px-6 py-7 flex justify-between gap-3 dark:border-[#424242]">
          <div className="flex flex-col">
            <span className="text-helpertext font-normal text-[15px]">Kun</span>
            <strong className="text-maintext text-[30px] font-medium flex">
              1 000 000{" "}
              <span className="text-[15px] text-[#49C96D] font-normal pl-2.5 flex items-center">
                <MoveUp size={15} /> 50.8%
              </span>
            </strong>
          </div>
          <div className="w-[88px] h-[88px] bg-[#fff4e6] rounded-2xl flex justify-center items-center">
            <DollarSign size={50} strokeWidth={3} color="#FA8B00" />
          </div>
        </div>

        <div className="border-2 border-[#EAEAEA] rounded-xl px-6 py-7 flex justify-between gap-3 dark:border-[#424242]">
          <div className="flex flex-col">
            <span className="text-helpertext font-normal text-[15px]">Kun</span>
            <strong className="text-maintext text-[30px] font-medium flex">
              1 000 000{" "}
              <span className="text-[15px] text-[#49C96D] font-normal pl-2.5 flex items-center">
                <MoveUp size={15} /> 50.8%
              </span>
            </strong>
          </div>
          <div className="w-[88px] h-[88px] bg-[#fff4e6] rounded-2xl flex justify-center items-center">
            <DollarSign size={50} strokeWidth={3} color="#FA8B00" />
          </div>
        </div>

        <div className="border-2 border-[#EAEAEA] rounded-xl px-6 py-7 flex justify-between gap-3 dark:border-[#424242]">
          <div className="flex flex-col">
            <span className="text-helpertext font-normal text-[15px]">Kun</span>
            <strong className="text-maintext text-[30px] font-medium flex">
              1 000 000{" "}
              <span className="text-[15px] text-[#49C96D] font-normal pl-2.5 flex items-center">
                <MoveUp size={15} /> 50.8%
              </span>
            </strong>
          </div>
          <div className="w-[88px] h-[88px] bg-[#fff4e6] rounded-2xl flex justify-center items-center">
            <DollarSign size={50} strokeWidth={3} color="#FA8B00" />
          </div>
        </div>
      </div>
      <div className="h-[402px] w-full flex gap-[30px] mt-[30px]">
        <div className="w-[50%]">
          <StatisticsChart />
        </div>
        <div className="w-[50%]">
          <AnalyticsChart />
        </div>
      </div>
    </div>
  );
};

export default memo(Statistics);
