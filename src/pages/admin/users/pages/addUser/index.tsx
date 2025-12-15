import { memo } from "react";
import PageHeader from "../../../../../shared/components/pageHeader";
import { UserRoundPlus } from "lucide-react";

const AddUser = () => {
  return (
    <div>
      <PageHeader title="Add Admin" />
      <div className="flex gap-[200px]">
        <div>
          <div className="flex justify-between items-center px-8 py-7 w-[300px] bg-white rounded-xl">
            <div className="rounded-2xl bg-[#fff4e6] px-6 py-6">
              <UserRoundPlus size={40} color="#FA8B00" />
            </div>
            <h4 className="font-medium text-[20px]">Admin</h4>
          </div>
        </div>

        <div className="w-[681px] rounded-2xl py-[22px] px-[42px] bg-white">
          <div className="flex justify-between mb-3.5">
            <h3 className="text-maintext font-medium text-[28px]">
              Admin qo'shish
            </h3>
            {/* <div className="bg-[#C4C4C4] px-2 py-2 rounded-xl cursor-pointer hover:bg-red-500">
              <X color="#3F434A"/>
            </div> */}
          </div>

          <div className="flex flex-col mb-9">
            <label htmlFor="" className="text-helpertext mb-2.5">
              Ism
            </label>
            <input
              type="text"
              name=""
              id=""
              placeholder="Ismmingizni kiriting"
              className="border border-[#E8E9EB] rounded-xl px-4 py-[15px] outline-0"
            />
          </div>

          <div className="flex flex-col mb-9">
            <label htmlFor="" className="text-helpertext mb-2.5">
              Familiya
            </label>
            <input
              type="text"
              name=""
              id=""
              placeholder="Familiyangizni kiriting"
              className="border border-[#E8E9EB] rounded-xl px-4 py-[15px] outline-0"
            />
          </div>

          <div className="flex flex-col mb-9">
            <label htmlFor="" className="text-helpertext mb-2.5">
              Telefon raqam
            </label>
            <input
              type="number"
              name=""
              id=""
              placeholder="Telefon raqamingizni kiriting"
              className="border border-[#E8E9EB] rounded-xl px-4 py-[15px] outline-0"
            />
          </div>

          <div className="flex justify-between">
            <div className="flex flex-col mb-9">
              <label htmlFor="" className="text-helpertext mb-2.5">
                Login
              </label>
              <input
                type="text"
                name=""
                id=""
                placeholder="Login kiriting"
                className="border border-[#E8E9EB] rounded-xl px-4 py-[15px] outline-0"
              />
            </div>

            <div className="flex flex-col mb-9">
              <label htmlFor="" className="text-helpertext mb-2.5">
                Parol
              </label>
              <input
                type="number"
                name=""
                id=""
                placeholder="Parol kiriting"
                className="border border-[#E8E9EB] rounded-xl px-4 py-[15px] outline-0"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button className="bg-main text-white py-[15px] px-12 rounded-xl cursor-pointer">
              Admin qo'shish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(AddUser);
