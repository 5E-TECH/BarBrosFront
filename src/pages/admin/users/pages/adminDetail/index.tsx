import React, { memo, useState, type FormEvent } from "react";
import PageHeader from "../../../../../shared/components/pageHeader";
import shelby from "../../../../../shared/assets/shelby.png";
import ButtonCom from "../../../../../shared/components/button";
import Popup from "../../../../../shared/ui/Popup";
import { ChevronLeft, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useAdmins } from "../../service/useAdmin";
import DetailsLoading from "../../../../../shared/components/loadings/detailsLoading";

const AdminDetail = () => {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    password: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const { getByIdAdmin, updateAdmin } = useAdmins();
  const { data } = getByIdAdmin({ id });
  const admin = data?.data;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateAdmin.mutate({
      id: id!,
      data: form,
    });
    setShow(false);
    setForm({ full_name: "", password: "" });
  };

  const handleEdit = () => {
    if (admin) {
      setForm({ full_name: admin.full_name, password: "" });
    }
    setShow(true);
  };

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
        <PageHeader title="Admin Detail" />
      </div>

      <div className="flex flex-col lg:flex-row justify-between w-full gap-8 lg:gap-12 bg-white px-6 md:px-10 py-9 rounded-2xl dark:bg-[#191a1f] shadow-sm">
        <div className="w-full lg:w-[15%] flex flex-col items-center gap-4 border-b lg:border-b-0 pb-6 lg:pb-0">
          <img
            src={shelby}
            alt=""
            className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] rounded-full object-cover shadow-md"
          />
          <span className="text-helpertext font-medium bg-gray-50 dark:bg-gray-800 px-4 py-1 rounded-full text-sm">
            {admin?.role}
          </span>
        </div>

        <div className="w-full lg:w-[85%] flex flex-col gap-6 md:gap-8 mt-4 lg:mt-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <div className="flex flex-col w-full">
              <label className="text-helpertext text-[14px] md:text-[16px] font-medium pb-1.5">
                FullName:
              </label>
              <span className="text-maintext text-[15px] md:text-[16px] font-medium border border-[#E8E9EB] px-5 md:px-8 py-3 rounded-[15px] dark:border-[#30333c] break-all">
                {admin?.full_name}
              </span>
            </div>
            <div className="flex flex-col w-full">
              <label className="text-helpertext text-[14px] md:text-[16px] font-medium pb-1.5">
                Phone Number:
              </label>
              <span className="text-maintext text-[15px] md:text-[16px] font-medium border border-[#E8E9EB] px-5 md:px-8 py-3 rounded-[15px] dark:border-[#30333c]">
                {admin?.phone_number}
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-end gap-6 md:gap-8">
            <div className="flex flex-col w-full md:w-[49%]">
              <label className="text-helpertext text-[14px] md:text-[16px] font-medium pb-1.5">
                Login:
              </label>
              <span className="text-maintext text-[15px] md:text-[16px] font-medium border border-[#E8E9EB] px-5 md:px-8 py-3 rounded-[15px] dark:border-[#30333c] break-all">
                {admin?.email}
              </span>
            </div>
            <div className="w-full md:w-auto flex justify-end">
              <ButtonCom onClick={handleEdit} title="Edit" type="button" />
            </div>
          </div>
        </div>
      </div>

      <Popup isShow={show} onClose={() => setShow(false)}>
        <div className="bg-white w-[90vw] max-w-[500px] rounded-xl px-6 md:px-8 py-8 md:py-10 dark:bg-[#1f222b]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold dark:text-white">
              Edit Admin
            </h3>
            <div
              onClick={() => setShow(false)}
              className="inline-flex items-center justify-center bg-[#e5e2e2] p-2 rounded-xl cursor-pointer hover:bg-red-400 dark:bg-[#cbcccf] transition"
            >
              <X size={18} color="#3F434A" />
            </div>
          </div>

          <form action="" onSubmit={handleSave} className="dark:text-white">
            <div className="flex flex-col mb-6 md:mb-9">
              <label htmlFor="full_name" className="text-helpertext mb-2.5">
                FullName
              </label>
              <input
                type="text"
                name="full_name"
                id="full_name"
                required
                value={form.full_name}
                onChange={handleChange}
                placeholder="Enter name"
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
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="border border-[#E8E9EB] rounded-xl px-4 py-[15px] outline-0 dark:border-gray-700 dark:bg-transparent"
              />
            </div>
            <div className="flex justify-end">
              <ButtonCom title="Save" type="submit" />
            </div>
          </form>
        </div>
      </Popup>
    </div>
  );
};

export default memo(AdminDetail);
