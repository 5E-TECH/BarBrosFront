import React, { memo, useState, type FormEvent } from "react";
import PageHeader from "../../../../../shared/components/pageHeader";
import { ChevronLeft, UserRoundPlus } from "lucide-react";
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
  const [disable, setDisable] = useState(false);
  const { createAdmin } = useAdmins();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisable(true);
    createAdmin.mutate(form, {
      onSuccess: () => {
        setForm(initialState);
        setDisable(false);
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
        <ChevronLeft size={30} color="gray" className="mt-[-9px] md:mt-[-3px]"/>
        <PageHeader title="Add Admin" />
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-[200px] items-start">
        <div className="w-full lg:w-auto">
          <div className="flex justify-between items-center px-6 py-7 w-full lg:w-[300px] bg-white rounded-xl dark:bg-[#191a1f] shadow-sm">
            <div className="rounded-2xl bg-[#fff4e6] px-6 py-6 dark:bg-[#1f222b]">
              <UserRoundPlus size={40} color="#FA8B00" />
            </div>
            <h4 className="font-medium text-[20px] dark:text-white">Admin</h4>
          </div>
        </div>

        <div className="w-full lg:max-w-[681px] rounded-2xl py-[22px] px-6 md:px-[42px] bg-white dark:bg-[#191a1f] shadow-sm">
          <div className="mb-6">
            <h3 className="text-maintext font-medium text-[24px] md:text-[28px] dark:text-white">
              Add Admin
            </h3>
          </div>

          <form action="" onSubmit={handleSubmit} className="dark:text-white">
            <div className="flex flex-col mb-6 md:mb-9">
              <label htmlFor="full_name" className="text-helpertext mb-2.5">
                FullName
              </label>
              <input
                type="text"
                name="full_name"
                id="full_name"
                onChange={handleChange}
                value={form.full_name}
                placeholder="Enter FullName"
                className="border border-[#E8E9EB] rounded-xl px-4 py-[15px] outline-0 dark:border-gray-700 dark:bg-transparent"
              />
            </div>

            <div className="flex flex-col mb-6 md:mb-9">
              <label htmlFor="phone_number" className="text-helpertext mb-2.5">
                Phone number
              </label>
              <input
                type="text"
                name="phone_number"
                id="phone_number"
                required
                onChange={handleChange}
                value={form.phone_number}
                placeholder="Enter PhoneNumber"
                className="border border-[#E8E9EB] rounded-xl px-4 py-[15px] outline-0 dark:border-gray-700 dark:bg-transparent"
              />
            </div>

            <div className="flex flex-col mb-6 md:mb-9">
              <label htmlFor="email" className="text-helpertext mb-2.5">
                Login
              </label>
              <input
                type="text"
                name="email"
                id="email"
                onChange={handleChange}
                value={form.email}
                placeholder="Enter Login"
                className="border border-[#E8E9EB] rounded-xl px-4 py-[15px] outline-0 dark:border-gray-700 dark:bg-transparent"
              />
            </div>

            <div className="flex flex-col mb-6 md:mb-9">
              <label htmlFor="password" className="text-helpertext mb-2.5">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                value={form.password}
                placeholder="Enter Password"
                className="border border-[#E8E9EB] rounded-xl px-4 py-[15px] outline-0 dark:border-gray-700 dark:bg-transparent"
              />
            </div>

            <div className="flex justify-end mt-4">
              <div className="w-full md:w-auto">
                <ButtonCom title="Add Admin" type="submit" disabled={disable} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default memo(AddUser);
