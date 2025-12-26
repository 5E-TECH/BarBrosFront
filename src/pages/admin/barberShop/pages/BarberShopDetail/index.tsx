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

const initialState = {
  name: "",
  phoneNumber: "",
  location: "",
};

const BarberShopDetail = () => {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState(initialState);

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
      }
    );
    setShow(false);
  };

  if (!datas) {
    return <DetailsLoading />;
  }

  return (
    <div>
      <div className="flex flex-col gap-6 mb-15">
        <div
          onClick={() => navigate(-1)}
          className="cursor-pointer flex gap-1 items-center mb-6"
        >
          <ChevronLeft size={30} />
          <PageHeader title="BarberShopDetail" />
        </div>

        <div className="flex justify-between w-full gap-12 bg-white px-10 py-9 rounded-2xl">
          <div className="w-[15%] flex flex-col items-center">
            <img
              src={
                datas?.img
                  ? `${import.meta.env.VITE_ASSET_BASE_URL}${datas?.img}`
                  : profile
              }
              alt=""
              className="w-[100px] h-[100px] rounded-full object-cover mb-2"
            />
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium text-white
            ${datas?.status === "active" ? "bg-green-500" : "bg-red-500"}`}
            >
              {datas.status}
            </span>
            <span className="text-helpertext font-medium pt-1">
              {datas?.role}
            </span>
          </div>

          <div className="w-[85%] flex flex-col gap-8 mt-8">
            <div className="flex gap-8">
              <div className="flex flex-col w-full">
                <label className="text-helpertext text-[16px] font-medium pb-1">
                  Name:
                </label>
                <span className="flex justify-between text-maintext text-[16px] font-medium border border-[#E8E9EB] px-8 py-3 rounded-[15px]">
                  {datas?.name}
                </span>
              </div>
              <div className="flex flex-col w-full">
                <label className="text-helpertext text-[16px] font-medium pb-1">
                  Phone Number:
                </label>
                <span className="flex justify-between text-maintext text-[16px] font-medium border border-[#E8E9EB] px-8 py-3 rounded-[15px]">
                  {datas?.phoneNumber}
                </span>
              </div>
            </div>

            <div className="flex gap-8">
              <div className="flex flex-col w-full">
                <label className="text-helpertext text-[16px] font-medium pb-1">
                  Username:
                </label>
                <span className="flex justify-between text-maintext text-[16px] font-medium border border-[#E8E9EB] px-8 py-3 rounded-[15px]">
                  {datas?.username}
                </span>
              </div>
              <div className="flex flex-col w-full">
                <label className="text-helpertext text-[16px] font-medium pb-1">
                  Location:
                </label>
                <span className="flex justify-between text-maintext text-[16px] font-medium border border-[#E8E9EB] px-8 py-3 rounded-[15px]">
                  {datas?.location}
                </span>
              </div>
            </div>
            <div className="w-[1150px] flex flex-1 justify-end">
              <ButtonCom onClick={handleEdit} title="Edit" type="button" />
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
               cursor-pointer hover:bg-red-400 transition"
              >
                <X size={18} color="#3F434A" />
              </div>
            </div>

            <form onSubmit={handleSave}>
              <div className="flex flex-col mb-9">
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
                  className="border border-[#E8E9EB] rounded-xl px-4 py-[15px] outline-0 focus:border-main"
                />
              </div>

              <div className="flex flex-col mb-9">
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
                  className="border border-[#E8E9EB] rounded-xl px-4 py-[15px] outline-0 focus:border-main"
                />
              </div>

              <div className="flex flex-col mb-9">
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
                  className="border border-[#E8E9EB] rounded-xl px-4 py-[15px] outline-0 focus:border-main"
                />
              </div>

              <div className="flex justify-end">
                <ButtonCom title="Save" type="submit" />
              </div>
            </form>
          </div>
        </Popup>
      </div>

      <div>
        <BarberTable />
      </div>
    </div>
  );
};

export default memo(BarberShopDetail);
