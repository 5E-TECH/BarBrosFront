import React, { memo, useState } from "react";
import shelby from "../../shared/assets/shelby.png";
import ButtonCom from "../../shared/components/button";
import { ChevronLeft, X } from "lucide-react";
import PageHeader from "../../shared/components/pageHeader";
import { useNavigate, useParams } from "react-router-dom";
import { useProfile } from "./service/useProfile";
import Popup from "../../shared/ui/Popup";
import { useAdmins } from "../admin/users/service/useAdmin";
import DetailsLoading from "../../shared/components/loadings/detailsLoading";

const Profile = () => {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    phone_number: "",
    email: "",
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
    datas.id;
    setForm({
      full_name: datas.full_name,
      phone_number: datas.phone_number,
      email: datas.email,
      password: "",
    });
    setShow(true);
  };

  if (!data) {
    <DetailsLoading />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div
        onClick={() => navigate("/")}
        className="cursor-pointer flex gap-1 items-center mb-6"
      >
        <ChevronLeft size={30} color="gray" />
        <PageHeader title="Profile" />
      </div>

      <div className="flex justify-between w-full gap-12 bg-white px-10 py-9 rounded-2xl dark:bg-[#191a1f]">
        <div className="w-[15%] flex flex-col items-center gap-4">
          <img
            src={shelby}
            alt=""
            className="w-[100px] h-[100px] rounded-full object-cover"
          />
          <span className="text-helpertext font-medium">{datas?.role}</span>
        </div>

        <div className="w-[85%] flex flex-col gap-8 mt-8">
          <div className="flex gap-8">
            <div className="flex flex-col w-full">
              <label className="text-helpertext text-[16px] font-medium pb-1">
                FullName:
              </label>
              <span className="flex justify-between text-maintext text-[16px] font-medium border border-[#E8E9EB] px-8 py-3 rounded-[15px] dark:border-[#9a9a9c]">
                {datas?.full_name}
              </span>
            </div>
            <div className="flex flex-col w-full">
              <label className="text-helpertext text-[16px] font-medium pb-1">
                Phone Number:
              </label>
              <span className="flex justify-between text-maintext text-[16px] font-medium border border-[#E8E9EB] px-8 py-3 rounded-[15px] dark:border-[#9a9a9c]">
                {datas?.phone_number}
              </span>
            </div>
          </div>

          <div className="flex gap-8 w-[65%]">
            <div className="flex flex-col w-full">
              <label className="text-helpertext text-[16px] font-medium pb-1">
                Login:
              </label>
              <span className="flex justify-between text-maintext text-[16px] font-medium border border-[#E8E9EB] px-8 py-3 rounded-[15px] dark:border-[#9a9a9c]">
                {datas?.email}
              </span>
            </div>
            <div className="w-[1150px] flex flex-1 justify-end mt-6 px-8">
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
        <div className="bg-white w-[500px] rounded-xl px-8 py-10 dark:bg-[#1f222b]">
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

          <form action="" onSubmit={handleSave} className="dark:text-white">
            <div className="flex flex-col mb-9">
              <label htmlFor="" className="text-helpertext mb-2.5">
                FullName
              </label>
              <input
                type="text"
                name="full_name"
                id=""
                value={form.full_name}
                onChange={handleChange}
                placeholder="Enter name"
                className="border border-[#E8E9EB] rounded-xl px-4 py-[15px] outline-0"
              />
            </div>
            <div className="flex flex-col mb-9">
              <label htmlFor="" className="text-helpertext mb-2.5">
                Phone Number
              </label>
              <input
                type="text"
                name="phone_number"
                id=""
                value={form.phone_number}
                onChange={handleChange}
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
                name="email"
                id=""
                value={form.email}
                onChange={handleChange}
                placeholder="Enter login"
                className="border border-[#E8E9EB] rounded-xl px-4 py-[15px] outline-0"
              />
            </div>
            <div className="flex flex-col mb-9">
              <label htmlFor="" className="text-helpertext mb-2.5">
                Password
              </label>
              <input
                type="text"
                name="password"
                id=""
                value={form.password}
                onChange={handleChange}
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

export default memo(Profile);
