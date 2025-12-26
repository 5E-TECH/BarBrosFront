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
    // phone_number: "",
    // email: "",
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

    const updateData: any = {
      full_name: form.full_name,
    };

    if (form.password.trim() !== "") {
      updateData.password = form.password;
    }

    updateAdmin.mutate({
      id: id!,
      data: form,
    });
    setShow(false);
    setForm({
      full_name: "",
      password: "",
    });
  };

  const handleEdit = () => {
    if(admin) {
      setForm({
        full_name: admin.full_name,
        password: ""
      })
    }
    setShow(true)
  }

  if (!data) {
    return <DetailsLoading />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div
        onClick={() => navigate(-1)}
        className="cursor-pointer flex gap-1 items-center mb-6"
      >
        <ChevronLeft size={30} />
        <PageHeader title="AdminDetail" />
      </div>

      <div className="flex justify-between w-full gap-12 bg-white px-10 py-9 rounded-2xl">
        <div className="w-[15%] flex flex-col items-center gap-4">
          <img
            src={shelby}
            alt=""
            className="w-[100px] h-[100px] rounded-full object-cover"
          />
          <span className="text-helpertext font-medium">{admin?.role}</span>
        </div>

        <div className="w-[85%] flex flex-col gap-8 mt-8">
          <div className="flex gap-8">
            <div className="flex flex-col w-full">
              <label className="text-helpertext text-[16px] font-medium pb-1">
                FullName:
              </label>
              <span className="flex justify-between text-maintext text-[16px] font-medium border border-[#E8E9EB] px-8 py-3 rounded-[15px]">
                {admin?.full_name}
              </span>
            </div>
            <div className="flex flex-col w-full">
              <label className="text-helpertext text-[16px] font-medium pb-1">
                Phone Number:
              </label>
              <span className="flex justify-between text-maintext text-[16px] font-medium border border-[#E8E9EB] px-8 py-3 rounded-[15px]">
                {admin?.phone_number}
              </span>
            </div>
          </div>

          <div className="flex gap-8 w-[65%]">
            <div className="flex flex-col w-full">
              <label className="text-helpertext text-[16px] font-medium pb-1">
                Login:
              </label>
              <span className="flex justify-between text-maintext text-[16px] font-medium border border-[#E8E9EB] px-8 py-3 rounded-[15px]">
                {admin?.email}
              </span>
            </div>
            <div className="w-[1150px] flex flex-1 justify-end mt-6 px-8">
              <ButtonCom
                onClick={handleEdit}
                title="Edit"
                type="button"
              />
            </div>
          </div>
        </div>
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

          <form action="" onSubmit={handleSave}>
            <div className="flex flex-col mb-9">
              <label htmlFor="" className="text-helpertext mb-2.5">
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
                id="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="border border-[#E8E9EB] rounded-xl px-4 py-[15px] outline-0"
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
