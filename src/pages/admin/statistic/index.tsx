import { DollarSign, MoveUp } from "lucide-react";
import { memo } from "react";
import StatisticsChart from "./components/StatisticsChart";
import AnalyticsChart from "./components/AnalyticsChart";
import PageHeader from "../../../shared/components/pageHeader";

const Statistics = () => {
  return (
    <div>
      <div className="mb-6">
        <PageHeader title="Statistics" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-20">
        <div className="border-2 border-[#EAEAEA] rounded-xl px-4 py-5 md:px-6 md:py-7 flex justify-between items-center gap-3 dark:border-[#424242] dark:bg-[#191a1f]">
          <div className="flex flex-col">
            <span className="text-helpertext font-normal text-[14px] md:text-[15px]">
              Kun
            </span>
            <strong className="text-maintext dark:text-white text-[24px] md:text-[30px] font-medium flex flex-wrap items-baseline">
              1 000 000
              <span className="text-[13px] md:text-[15px] text-[#49C96D] font-normal pl-2 flex items-center">
                <MoveUp size={14} /> 50.8%
              </span>
            </strong>
          </div>
          <div className="w-[60px] h-[60px] md:w-[88px] md:h-[88px] bg-[#fff4e6] rounded-2xl flex justify-center items-center shrink-0">
            <DollarSign
              size={30}
              className="md:w-[50px] md:h-[50px]"
              strokeWidth={3}
              color="#FA8B00"
            />
          </div>
        </div>

        <div className="border-2 border-[#EAEAEA] rounded-xl px-4 py-5 md:px-6 md:py-7 flex justify-between items-center gap-3 dark:border-[#424242] dark:bg-[#191a1f]">
          <div className="flex flex-col">
            <span className="text-helpertext font-normal text-[14px] md:text-[15px]">
              Hafta
            </span>
            <strong className="text-maintext dark:text-white text-[24px] md:text-[30px] font-medium flex flex-wrap items-baseline">
              7 000 000
              <span className="text-[13px] md:text-[15px] text-[#49C96D] font-normal pl-2 flex items-center">
                <MoveUp size={14} /> 12.4%
              </span>
            </strong>
          </div>
          <div className="w-[60px] h-[60px] md:w-[88px] md:h-[88px] bg-[#fff4e6] rounded-2xl flex justify-center items-center shrink-0">
            <DollarSign
              size={30}
              className="md:w-[50px] md:h-[50px]"
              strokeWidth={3}
              color="#FA8B00"
            />
          </div>
        </div>

        <div className="border-2 border-[#EAEAEA] rounded-xl px-4 py-5 md:px-6 md:py-7 flex justify-between items-center gap-3 dark:border-[#424242] dark:bg-[#191a1f]">
          <div className="flex flex-col">
            <span className="text-helpertext font-normal text-[14px] md:text-[15px]">
              Oy
            </span>
            <strong className="text-maintext dark:text-white text-[24px] md:text-[30px] font-medium flex flex-wrap items-baseline">
              30 000 000
              <span className="text-[13px] md:text-[15px] text-[#49C96D] font-normal pl-2 flex items-center">
                <MoveUp size={14} /> 8.2%
              </span>
            </strong>
          </div>
          <div className="w-[60px] h-[60px] md:w-[88px] md:h-[88px] bg-[#fff4e6] rounded-2xl flex justify-center items-center shrink-0">
            <DollarSign
              size={30}
              className="md:w-[50px] md:h-[50px]"
              strokeWidth={3}
              color="#FA8B00"
            />
          </div>
        </div>
      </div>
      <div className="w-full mt-5 md:mt-[30px] flex gap-5 md:gap-[30px] flex-col xl:flex-row">
        <div className="w-full xl:w-1/2 h-[300px] md:h-[402px] bg-white dark:bg-[#191a1f] rounded-xl">
          <StatisticsChart />
        </div>
        <div className="w-full xl:w-1/2 h-[300px] md:h-[402px] bg-white dark:bg-[#191a1f] rounded-xl">
          <AnalyticsChart />
        </div>
      </div>
    </div>
  );
};

export default memo(Statistics);
