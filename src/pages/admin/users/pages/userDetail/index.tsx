import { memo, useState } from "react";
import PageHeader from "../../../../../shared/components/pageHeader";
import shelby from "../../../../../shared/assets/shelby.png";
import ButtonCom from "../../../../../shared/components/button";
import Popup from "../../../../../shared/ui/Popup";
import { X } from "lucide-react";

const UserDetail = () => {
  const [show, setShow] = useState(false);

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
              <h4 className="text-maintext text-xl font-bold">Password</h4>
              <span className="text-helpertext text-xl font-medium">1230</span>
            </div>

            <div className="flex flex-1 justify-between px-8"></div>
          </div>
        </div>
      </div>

      <div className="w-[1150px] flex justify-end mt-6">
        <ButtonCom onClick={() => setShow(true)} title="Edit" type="button" />
      </div>

      <Popup isShow={show} onClose={() => setShow(false)}>
        <div className="bg-white w-[500px] rounded-xl px-8 py-10">
          <div className="flex justify-end">
            <div
              onClick={() => setShow(false)}
              className="inline-flex items-center justify-center
               bg-[#e5e2e2] p-2 rounded-xl
               cursor-pointer hover:bg-red-400"
            >
              <X size={18} color="#3F434A" />
            </div>
          </div>

          <form action="">
            <div className="flex flex-col mb-9">
              <label htmlFor="" className="text-helpertext mb-2.5">
                Name
              </label>
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter name"
                className="border border-[#E8E9EB] rounded-xl px-4 py-[15px] outline-0"
              />
            </div>
            <div className="flex flex-col mb-9">
              <label htmlFor="" className="text-helpertext mb-2.5">
                Surname
              </label>
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter surname"
                className="border border-[#E8E9EB] rounded-xl px-4 py-[15px] outline-0"
              />
            </div>
            <div className="flex flex-col mb-9">
              <label htmlFor="" className="text-helpertext mb-2.5">
                Phone Number
              </label>
              <input
                type="number"
                name=""
                id=""
                placeholder="Enter phone number"
                className="border border-[#E8E9EB] rounded-xl px-4 py-[15px] outline-0"
              />
            </div>
            <div className="flex flex-col mb-9">
              <label htmlFor="" className="text-helpertext mb-2.5">
                Login
              </label>
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter login"
                className="border border-[#E8E9EB] rounded-xl px-4 py-[15px] outline-0"
              />
            </div>
            <div className="flex flex-col mb-9">
              <label htmlFor="" className="text-helpertext mb-2.5">
                Password
              </label>
              <input
                type="number"
                name=""
                id=""
                placeholder="Enter password"
                className="border border-[#E8E9EB] rounded-xl px-4 py-[15px] outline-0"
              />
            </div>
            <div className="flex justify-end">
              <ButtonCom title="Save" />
            </div>
          </form>
        </div>
      </Popup>
    </div>
  );
};

export default memo(UserDetail);
