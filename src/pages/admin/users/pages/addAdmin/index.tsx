import React, { memo, useState, type FormEvent } from "react";
import PageHeader from "../../../../../shared/components/pageHeader";
import { ChevronLeft, UserRoundPlus, X } from "lucide-react";
import ButtonCom from "../../../../../shared/components/button";
import { useNavigate } from "react-router-dom";
import { useAdmins } from "../../service/useAdmin";

const initialState = {
  full_name: "",
  email: "",
  phone_number: "",
  password: "",
};

const AddUser = () => {
  const [form, setForm] = useState(initialState);

  const { createAdmin } = useAdmins();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createAdmin.mutate(form, {
      onSuccess: () => {
        setForm(initialState);
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div
        onClick={() => navigate(-1)}
        className="cursor-pointer flex gap-1 items-center mb-6"
      >
        <ChevronLeft size={30} />
        <PageHeader title="Add Admin" />
      </div>
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
            <h3 className="text-maintext font-medium text-[28px]">Add Admin</h3>
            <div className="bg-[#e5e2e2] px-2 py-2 rounded-xl cursor-pointer hover:bg-red-400">
              <X color="#3F434A" />
            </div>
          </div>

          <form action="" onSubmit={handleSubmit}>
            <div className="flex flex-col mb-9">
              <label htmlFor="" className="text-helpertext mb-2.5">
                FullName
              </label>
              <input
                type="text"
                name="full_name"
                id="full_name"
                onChange={handleChange}
                value={form.full_name}
                placeholder="Enter FullName"
                className="border border-[#E8E9EB] rounded-xl px-4 py-[15px] outline-0"
              />
            </div>

            <div className="flex flex-col mb-9">
              <label htmlFor="" className="text-helpertext mb-2.5">
                Phone number
              </label>
              <input
                type="number"
                name="phone_number"
                id="phone_number"
                onChange={handleChange}
                value={form.phone_number}
                placeholder="Enter PhoneNumber"
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
                id="email"
                onChange={handleChange}
                value={form.email}
                placeholder="Enter Login"
                className="border border-[#E8E9EB] rounded-xl px-4 py-[15px] outline-0"
              />
            </div>

            <div className="flex flex-col mb-9">
              <label htmlFor="" className="text-helpertext mb-2.5">
                Password
              </label>
              <input
                type="number"
                name="password"
                id="password"
                onChange={handleChange}
                value={form.password}
                placeholder="Enter Password"
                className="border border-[#E8E9EB] rounded-xl px-4 py-[15px] outline-0"
              />
            </div>

            <div className="flex justify-end">
              <ButtonCom title="Add Admin" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default memo(AddUser);
