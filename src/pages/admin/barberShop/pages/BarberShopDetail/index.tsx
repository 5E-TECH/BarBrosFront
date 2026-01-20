import { memo, useState, type FormEvent } from "react";
import { useBarberShop } from "../../service/useBarberShop";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../../../../shared/components/pageHeader";
import { ChevronLeft, X } from "lucide-react";
import Popup from "../../../../../shared/ui/Popup";
import profile from "../../../../../shared/assets/profile.jpg";
import ButtonCom from "../../../../../shared/components/button";
import DetailsLoading from "../../../../../shared/components/loadings/detailsLoading";
import BarberTable from "../../components/barberTable";
import ServiceTable from "../../components/serviceTable";

const initialState = {
  name: "",
  phoneNumber: "",
  location: "",
};

const BarberShopDetail = () => {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState(initialState);
  const [barberAndService, setBarberAndService] = useState(true);

  const { getByIdBarbershop, updateBarbershop } = useBarberShop();
  const { id } = useParams();
  const { data } = getByIdBarbershop({ id });
  const datas = data?.data;
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEdit = () => {
    if (datas) {
      setForm({
        name: datas.name || "",
        phoneNumber: datas.phoneNumber || "",
        location: datas.location || "",
      });
    }
    setShow(true);
  };

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;

    updateBarbershop.mutate(
      {
        id: id,
        data: form,
      },
      {
        onSuccess: () => {
          setShow(false);
          setForm(initialState);
        },
      },
    );
  };

  if (!datas) {
    return <DetailsLoading />;
  }

  return (
    <div className="mb-10">
      <div className="flex flex-col gap-6 mb-10 md:mb-15">
        <div
          onClick={() => navigate(-1)}
          className="cursor-pointer flex items-center gap-1 mb-2 md:mb-6"
        >
          <ChevronLeft
            size={30}
            color="gray"
            className="mt-[-9px] md:mt-[-3px]"
          />
          <PageHeader title="BarberShop Detail" />
        </div>

        <div className="flex flex-col lg:flex-row justify-between w-full gap-8 lg:gap-12 bg-white px-6 md:px-10 py-9 rounded-2xl dark:bg-[#191a1f] shadow-sm">
          <div className="w-full lg:w-[15%] flex flex-col items-center border-b lg:border-b-0 pb-6 lg:pb-0">
            <img
              src={
                datas?.img
                  ? `${import.meta.env.VITE_ASSET_BASE_URL}${datas?.img}`
                  : profile
              }
              alt=""
              className="w-[100px] h-[100px] rounded-full object-cover mb-4"
            />
            <span
              className={`px-4 py-1 rounded-full text-xs font-bold uppercase text-white mb-3
            ${datas?.status === "active" ? "bg-green-500" : "bg-red-500"}`}
            >
              {datas.status}
            </span>
            <span className="text-helpertext font-medium bg-gray-50 dark:bg-gray-800 px-4 py-1 rounded-full text-sm">
              {datas?.role}
            </span>
          </div>

          <div className="w-full lg:w-[85%] flex flex-col gap-6 md:gap-8 mt-4 lg:mt-8">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              <div className="flex flex-col w-full">
                <label className="text-helpertext text-[14px] md:text-[16px] font-medium pb-1.5">
                  Name:
                </label>
                <span className="text-maintext text-[15px] md:text-[16px] font-medium border border-[#E8E9EB] px-5 md:px-8 py-3 rounded-[15px] dark:border-[#30333c]">
                  {datas?.name}
                </span>
              </div>
              <div className="flex flex-col w-full">
                <label className="text-helpertext text-[14px] md:text-[16px] font-medium pb-1.5">
                  Phone Number:
                </label>
                <span className="text-maintext text-[15px] md:text-[16px] font-medium border border-[#E8E9EB] px-5 md:px-8 py-3 rounded-[15px] dark:border-[#30333c]">
                  {datas?.phoneNumber}
                </span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              <div className="flex flex-col w-full">
                <label className="text-helpertext text-[14px] md:text-[16px] font-medium pb-1.5">
                  Username:
                </label>
                <span className="text-maintext text-[15px] md:text-[16px] font-medium border border-[#E8E9EB] px-5 md:px-8 py-3 rounded-[15px] dark:border-[#30333c] break-all">
                  {datas?.username}
                </span>
              </div>
              <div className="flex flex-col w-full">
                <label className="text-helpertext text-[14px] md:text-[16px] font-medium pb-1.5">
                  Location:
                </label>
                <span className="text-maintext text-[15px] md:text-[16px] font-medium border border-[#E8E9EB] px-5 md:px-8 py-3 rounded-[15px] dark:border-[#30333c]">
                  {datas?.location}
                </span>
              </div>
            </div>

            <div className="w-full flex justify-end mt-4">
              <ButtonCom onClick={handleEdit} title="Edit" type="button" />
            </div>
          </div>
        </div>

        <Popup isShow={show} onClose={() => setShow(false)}>
          <div className="bg-white w-[90vw] max-w-[500px] rounded-xl px-6 md:px-8 py-8 md:py-10 dark:bg-[#1f222b]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold dark:text-white">
                Edit BarberShop
              </h3>
              <div
                onClick={() => setShow(false)}
                className="inline-flex items-center justify-center bg-[#c1c0c0] p-2 rounded-xl cursor-pointer hover:bg-red-400 transition"
              >
                <X size={18} color="#3F434A" />
              </div>
            </div>

            <form onSubmit={handleSave} className="dark:text-white">
              <div className="flex flex-col mb-6 md:mb-9">
                <label htmlFor="name" className="text-helpertext mb-2.5">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                  className="border border-[#E8E9EB] rounded-xl px-4 py-[15px] outline-0 focus:border-main dark:border-gray-700 dark:bg-transparent"
                />
              </div>

              <div className="flex flex-col mb-6 md:mb-9">
                <label htmlFor="phoneNumber" className="text-helpertext mb-2.5">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  required
                  value={form.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="border border-[#E8E9EB] rounded-xl px-4 py-[15px] outline-0 focus:border-main dark:border-gray-700 dark:bg-transparent"
                />
              </div>

              <div className="flex flex-col mb-6 md:mb-9">
                <label htmlFor="location" className="text-helpertext mb-2.5">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  required
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Enter location"
                  className="border border-[#E8E9EB] rounded-xl px-4 py-[15px] outline-0 focus:border-main dark:border-gray-700 dark:bg-transparent"
                />
              </div>

              <div className="flex justify-end">
                <ButtonCom title="Save" type="submit" />
              </div>
            </form>
          </div>
        </Popup>
      </div>

      <div className="w-full flex justify-center items-center p-6">
        <div className="relative inline-flex bg-gray-100 rounded-full p-1.5 shadow-inner cursor-pointer">
          {/* Sliding background indicator */}
          <div
            className={`absolute top-1.5 bottom-1.5 w-[calc(50%-0.375rem)] bg-main rounded-full shadow-lg transition-all duration-300 ease-out ${
              barberAndService ? "left-1.5" : "left-[calc(50%+0.375rem)]"
            }`}
          />

          {/* Barbers Button */}
          <button
            onClick={() => setBarberAndService(true)}
            className={`relative z-10 px-8 py-3 rounded-full cursor-pointer font-semibold transition-all duration-300 ease-out min-w-[140px] ${
              barberAndService
                ? "text-white scale-105"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Barbers
          </button>

          {/* Services Button */}
          <button
            onClick={() => setBarberAndService(false)}
            className={`relative z-10 px-8 py-3 rounded-full font-semibold transition-all duration-300 ease-out min-w-[140px] ${
              !barberAndService
                ? "text-white scale-105"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Services
          </button>
        </div>
      </div>

      <div className="mt-8">
        {barberAndService ? <BarberTable /> : <ServiceTable />}
      </div>
    </div>
  );
};

export default memo(BarberShopDetail);
