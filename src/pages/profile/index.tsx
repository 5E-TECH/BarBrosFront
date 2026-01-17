import React, { memo, useState } from "react";
import shelby from "../../shared/assets/profile.jpg";
import ButtonCom from "../../shared/components/button";
import { ChevronLeft, Eye, EyeClosed, X } from "lucide-react";
import PageHeader from "../../shared/components/pageHeader";
import { useNavigate, useParams } from "react-router-dom";
import { useProfile } from "./service/useProfile";
import Popup from "../../shared/ui/Popup";
import { useAdmins } from "../admin/users/service/useAdmin";
import DetailsLoading from "../../shared/components/loadings/detailsLoading";

const Profile = () => {
  const [show, setShow] = useState(false);
  const [saw, setSaw] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    phone_number: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const { getMyAccount } = useProfile();
  const { updateAdmin } = useAdmins();
  const { id } = useParams();
  const { data } = getMyAccount();
  const datas = data?.data;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateAdmin.mutate({
      id: id!,
      data: form,
    });
  };

  const handleEdit = (datas: any) => {
    setForm({
      full_name: datas.full_name,
      phone_number: datas.phone_number,
      username: datas.username,
      password: "",
    });
    setShow(true);
  };

  if (!data) {
    return <DetailsLoading />;
  }

  return (
    <div className="flex flex-col gap-6 md:p-0">
      <div
        onClick={() => navigate("/")}
        className="cursor-pointer flex gap-1 items-center mb-2 md:mb-6"
      >
        <ChevronLeft
          size={30}
          color="gray"
          className="mt-[-9px] md:mt-[-3px]"
        />
        <PageHeader title="Profile" />
      </div>

      <div className="flex flex-col md:flex-row justify-between w-full px-6 md:px-10 py-6 md:py-9 rounded-2xl dark:bg-[#191a1f] gap-6 md:gap-0">
        <div className="w-full md:w-[15%] flex flex-col items-center gap-4">
          <img
            src={shelby}
            alt=""
            className="w-[100px] h-[100px] rounded-full object-cover border-2 border-gray-100 dark:border-gray-800"
          />
          <span className="text-helpertext font-medium bg-gray-50 dark:bg-gray-800 px-4 py-1 rounded-full text-md">
            {datas?.role}
          </span>
        </div>

        <div className="w-full md:w-[85%] flex flex-col gap-6 md:gap-8 md:mt-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <div className="flex flex-col w-full">
              <label className="text-helpertext text-[14px] md:text-[16px] font-medium pb-1">
                FullName:
              </label>
              <span className="text-maintext text-[15px] md:text-[16px] font-medium border border-[#E8E9EB] px-4 md:px-8 py-3 rounded-[15px] dark:border-[#30333c]">
                {datas?.full_name}
              </span>
            </div>
            <div className="flex flex-col w-full">
              <label className="text-helpertext text-[14px] md:text-[16px] font-medium pb-1">
                Phone Number:
              </label>
              <span className="text-maintext text-[15px] md:text-[16px] font-medium border border-[#E8E9EB] px-4 md:px-8 py-3 rounded-[15px] dark:border-[#30333c]">
                {datas?.phone_number}
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full md:w-[62%] items-end">
            <div className="flex flex-col w-full">
              <label className="text-helpertext text-[14px] md:text-[16px] font-medium pb-1">
                Username:
              </label>
              <span className="text-maintext text-[15px] md:text-[16px] font-medium border border-[#E8E9EB] px-4 md:px-8 py-3 rounded-[15px] dark:border-[#30333c]">
                {datas?.username}
              </span>
            </div>

            <div className="w-full md:w-auto flex justify-end mt-2 md:mt-0 md:px-3">
              <ButtonCom
                onClick={() => handleEdit(datas)}
                title="Edit"
                type="button"
              />
            </div>
          </div>
        </div>
      </div>

      <Popup isShow={show} onClose={() => setShow(false)}>
        <div className="bg-white w-[95vw] md:w-[500px] rounded-xl px-6 md:px-8 py-8 md:py-10 dark:bg-[#1f222b] mx-auto">
          <div className="flex justify-end mb-4">
            <div
              onClick={() => setShow(false)}
              className="inline-flex items-center justify-center
               bg-[#e5e2e2] p-2 rounded-xl
               cursor-pointer hover:bg-red-400"
            >
              <X size={18} color="#3F434A" />
            </div>
          </div>

          <form
            action=""
            onSubmit={handleSave}
            className="dark:text-white max-h-[70vh] overflow-y-auto px-1"
          >
            <div className="flex flex-col mb-6 md:mb-9">
              <label htmlFor="" className="text-helpertext mb-2.5 text-sm">
                FullName
              </label>
              <input
                type="text"
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                placeholder="Enter name"
                className="border border-[#E8E9EB] rounded-xl px-4 py-3 md:py-[15px] outline-0 bg-transparent dark:border-gray-700"
              />
            </div>
            <div className="flex flex-col mb-6 md:mb-9">
              <label htmlFor="" className="text-helpertext mb-2.5 text-sm">
                Phone Number
              </label>
              <input
                type="text"
                name="phone_number"
                value={form.phone_number}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="border border-[#E8E9EB] rounded-xl px-4 py-3 md:py-[15px] outline-0 bg-transparent dark:border-gray-700"
              />
            </div>
            <div className="flex flex-col mb-6 md:mb-9">
              <label htmlFor="" className="text-helpertext mb-2.5 text-sm">
                Login
              </label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter login"
                className="border border-[#E8E9EB] rounded-xl px-4 py-3 md:py-[15px] outline-0 bg-transparent dark:border-gray-700"
              />
            </div>
            <div className="flex flex-col mb-6 md:mb-9">
              <label htmlFor="" className="text-helpertext mb-2.5 text-sm">
                Password
              </label>
              <div className="border border-[#E8E9EB] rounded-xl px-4 py-[15px] dark:border-gray-700 dark:bg-transparent flex items-center justify-between gap-4">
                <input
                  type={saw ? "text" : "password"}
                  name="password"
                  id="password"
                  onChange={handleChange}
                  value={form.password}
                  placeholder="Enter Password"
                  className="outline-0 w-full"
                />
                <button
                  type="button"
                  onClick={() => setSaw(!saw)}
                  className="cursor-pointer"
                >
                  {show ? (
                    <EyeClosed size={20} color="gray" />
                  ) : (
                    <Eye size={20} color="gray" />
                  )}
                </button>
              </div>
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

export default memo(Profile);
