import { memo } from "react";
import PageHeader from "../../../../../shared/components/pageHeader";
import shelby from "../../../../../shared/assets/shelby.png";
import ButtonCom from "../../../../../shared/components/button";

const UserDetail = () => {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="UserDetail" />

      <div className="w-[1150px] flex gap-12 bg-white px-10 py-9 rounded-2xl">
        <div>
          <img
            src={shelby}
            alt=""
            className="w-[110px] h-[100px] rounded-[50%] object-cover"
          />
        </div>

        <div className="flex flex-col gap-8 w-full">
          <div className="flex gap-8">
            <div className="flex flex-1 justify-between border border-[#f0f2f5] shadow-xl rounded-3xl px-8 py-3">
              <h4 className="text-maintext text-xl font-bold">Name</h4>
              <span className="text-helpertext text-xl font-medium">
                Bahodir
              </span>
            </div>

            <div className="flex flex-1 justify-between border border-[#f0f2f5] shadow-xl rounded-3xl px-8 py-3">
              <h4 className="text-maintext text-xl font-bold">Surname</h4>
              <span className="text-helpertext text-xl font-medium">
                Nabijanov
              </span>
            </div>
          </div>

          <div className="flex gap-8">
            <div className="flex flex-1 justify-between border border-[#f0f2f5] shadow-xl rounded-3xl px-8 py-3">
              <h4 className="text-maintext text-xl font-bold">Phone Number</h4>
              <span className="text-helpertext text-xl font-medium">
                +998942325567
              </span>
            </div>

            <div className="flex flex-1 justify-between border border-[#f0f2f5] shadow-xl rounded-3xl px-8 py-3">
              <h4 className="text-maintext text-xl font-bold">Login</h4>
              <span className="text-helpertext text-xl font-medium">
                Hucker
              </span>
            </div>
          </div>

          <div className="flex gap-8">
            <div className="flex flex-1 justify-between border border-[#f0f2f5] shadow-xl rounded-3xl px-8 py-3">
              <h4 className="text-maintext text-xl font-bold">Login</h4>
              <span className="text-helpertext text-xl font-medium">
                Hucker
              </span>
            </div>

            <div className="flex flex-1 invisible"></div>
          </div>
        </div>
      </div>

      <div className="w-[1150px] flex justify-end mt-6">
        <ButtonCom title="Edit" type="button" />
      </div>
    </div>
  );
};

export default memo(UserDetail);
