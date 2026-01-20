import { memo } from "react";
import PageHeader from "../../../../../shared/components/pageHeader";
import shelby from "../../../../../shared/assets/shelby.png";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useUsers } from "../../service/useUser";
import DetailsLoading from "../../../../../shared/components/loadings/detailsLoading";

const UserDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { getByIdUsers } = useUsers();
  const { data } = getByIdUsers({ id });
  const user = data?.data;

  if (!data) {
    return <DetailsLoading />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div
        onClick={() => navigate(-1)}
        className="cursor-pointer flex gap-1 items-center mb-2 md:mb-6"
      >
        <ChevronLeft
          size={30}
          color="gray"
          className="mt-[-9px] md:mt-[-3px]"
        />
        <PageHeader title="User Detail" />
      </div>

      <div className="flex flex-col lg:flex-row w-full gap-8 lg:gap-12 bg-white px-6 md:px-10 py-9 rounded-2xl dark:bg-[#191a1f] shadow-sm">
        <div className="w-full lg:w-[150px] flex flex-col items-center border-b lg:border-b-0 pb-6 lg:pb-0">
          <img
            src={shelby}
            alt="User Profile"
            className="w-[100px] h-[100px] rounded-full mb-4 object-cover shadow-sm"
          />
          <span className="text-helpertext font-medium bg-gray-50 dark:bg-gray-800 px-4 py-1 rounded-full text-sm">
            {user?.role}
          </span>
        </div>

        <div className="flex flex-col gap-6 md:gap-8 w-full mt-4 lg:mt-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <div className="flex flex-col w-full">
              <label className="text-helpertext text-[14px] md:text-[16px] font-medium pb-1.5">
                FullName:
              </label>
              <span className="flex justify-between text-maintext text-[15px] md:text-[16px] font-medium border border-[#E8E9EB] px-5 md:px-8 py-3 rounded-[15px] dark:border-[#30333c] break-all">
                {user?.full_name}
              </span>
            </div>

            <div className="flex flex-col w-full">
              <label className="text-helpertext text-[14px] md:text-[16px] font-medium pb-1.5">
                Phone Number:
              </label>
              <span className="flex justify-between text-maintext text-[15px] md:text-[16px] font-medium border border-[#E8E9EB] px-5 md:px-8 py-3 rounded-[15px] dark:border-[#30333c]">
                {user?.phone_number}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(UserDetail);
