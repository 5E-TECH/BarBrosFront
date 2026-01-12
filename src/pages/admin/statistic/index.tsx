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
      <div
        className="grid grid-cols-3 gap-20 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 "
      >
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
 <div className="
  w-full
  mt-[30px]
  flex
  gap-[30px]
  xl:flex-row
  flex-col
">
  <div className="w-full xl:w-1/2 h-[402px]">
    <StatisticsChart />
  </div>

  <div className="w-full xl:w-1/2 h-[402px]">
    <AnalyticsChart />
  </div>
</div>

    </div>
  );
};

export default memo(Statistics);
