import { memo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  ChevronLeft, 
  X, 
  // Clock, 
  Calendar,
  Star,
  Scissors,
} from "lucide-react";
import PageHeader from "../../../../../shared/components/pageHeader";
import profile from "../../../../../shared/assets/profile.jpg";
import ButtonCom from "../../../../../shared/components/button";
import DetailsLoading from "../../../../../shared/components/loadings/detailsLoading";
import ServiceTable from "../../components/serviceTable";
import { useBarber } from "../../service/useBarber";
import { useService } from "../../service/useService";

const initialState = {
  name: "",
  phoneNumber: "",
  location: "",
};

const BarberDetail = () => {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState(initialState);

  const { getBarberById } = useBarber();
  const { getAllServicesByBarber } = useService();
  const { id } = useParams();
  console.log(id);
  
  const { data } = getBarberById(id);
  const datas = data?.data;
  
  // Fetch services by barber ID
  const { data: servicesData, isLoading: servicesLoading } = getAllServicesByBarber(id);
  const barberServices = servicesData?.data || [];
  
  const navigate = useNavigate();

  const handleChange = (e:any) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEdit = () => {
    if (datas) {
      setForm({
        name: datas.full_name || "",
        phoneNumber: datas.phone_number || "",
        location: datas.barberShop?.location || "",
      });
    }
    setShow(true);
  };

  if (!datas) {
    return <DetailsLoading />;
  }

  // Calculate statistics
  const totalBookings = datas.booking?.length || 0;
  const totalServices = barberServices.length || 0;
  const avgRating = parseFloat(datas.avg_reyting) || 0;

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
          <PageHeader title="Barber Detail" />
        </div>

        <div className="flex flex-col lg:flex-row justify-between w-full gap-8 lg:gap-12 bg-white px-6 md:px-10 py-9 rounded-2xl dark:bg-[#191a1f] shadow-sm">
          <div className="w-full lg:w-[15%] flex flex-col items-center border-b lg:border-b-0 pb-6 lg:pb-0">
            <img
              src={
                datas?.img
                  ? `${import.meta.env.VITE_ASSET_BASE_URL}${datas?.img}`
                  : profile
              }
              alt={datas?.full_name}
              className="w-[100px] h-[100px] rounded-full object-cover mb-4"
            />
            <span
              className={`px-4 py-1 rounded-full text-xs font-bold uppercase text-white mb-3 ${
                datas?.is_avaylbl ? "bg-green-500" : "bg-orange-500"
              }`}
            >
              {datas?.is_avaylbl ? "Available" : "Busy"}
            </span>
            <span className="text-helpertext font-medium bg-gray-50 dark:bg-gray-800 px-4 py-1 rounded-full text-sm">
              {datas?.role}
            </span>
          </div>

          <div className="w-full lg:w-[85%] flex flex-col gap-6 md:gap-8 mt-4 lg:mt-8">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              <div className="flex flex-col w-full">
                <label className="text-helpertext text-[14px] md:text-[16px] font-medium pb-1.5">
                  Full Name:
                </label>
                <span className="text-maintext text-[15px] md:text-[16px] font-medium border border-[#E8E9EB] px-5 md:px-8 py-3 rounded-[15px] dark:border-[#30333c]">
                  {datas?.full_name}
                </span>
              </div>
              <div className="flex flex-col w-full">
                <label className="text-helpertext text-[14px] md:text-[16px] font-medium pb-1.5">
                  Phone Number:
                </label>
                <span className="text-maintext text-[15px] md:text-[16px] font-medium border border-[#E8E9EB] px-5 md:px-8 py-3 rounded-[15px] dark:border-[#30333c]">
                  {datas?.phone_number}
                </span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              <div className="flex flex-col w-full">
                <label className="text-helpertext text-[14px] md:text-[16px] font-medium pb-1.5">
                  Username:
                </label>
                <span className="text-maintext text-[15px] md:text-[16px] font-medium border border-[#E8E9EB] px-5 md:px-8 py-3 rounded-[15px] dark:border-[#30333c] break-all">
                  @{datas?.username}
                </span>
              </div>
              <div className="flex flex-col w-full">
                <label className="text-helpertext text-[14px] md:text-[16px] font-medium pb-1.5">
                  Location:
                </label>
                <span className="text-maintext text-[15px] md:text-[16px] font-medium border border-[#E8E9EB] px-5 md:px-8 py-3 rounded-[15px] dark:border-[#30333c]">
                  {datas?.barberShop?.location}
                </span>
              </div>
            </div>

            <div className="w-full flex justify-end mt-4">
              <ButtonCom onClick={handleEdit} title="Edit" type="button" />
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-[#191a1f] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-maintext dark:text-white mb-1">
            {totalBookings}
          </h3>
          <p className="text-sm text-helpertext font-medium">Total Bookings</p>
        </div>

        <div className="bg-white dark:bg-[#191a1f] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
              <Scissors className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-maintext dark:text-white mb-1">
            {totalServices}
          </h3>
          <p className="text-sm text-helpertext font-medium">Services Offered</p>
        </div>

        <div className="bg-white dark:bg-[#191a1f] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
              <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-maintext dark:text-white mb-1">
            {avgRating.toFixed(1)}
          </h3>
          <p className="text-sm text-helpertext font-medium">Average Rating</p>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-white dark:bg-[#191a1f] rounded-2xl p-6 md:p-8 shadow-sm mb-8">
        {/* <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-maintext dark:text-white">
            Services & Expertise
          </h3>
          <span className="text-sm font-medium text-main">
            {totalServices} Services
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {barberServices?.slice(0, 6).map((service:any) => (
            <div
              key={service.id}
              className="border border-[#E8E9EB] dark:border-[#30333c] rounded-xl p-4 hover:border-main dark:hover:border-main transition-all hover:shadow-md"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-maintext dark:text-white">
                  {service.name}
                </h4>
                <div className="flex items-center gap-1 text-xs text-main">
                  <Clock size={14} />
                  <span>{service.duration_minutes}min</span>
                </div>
              </div>
              <p className="text-sm text-helpertext line-clamp-2">
                {service.description}
              </p>
            </div>
          ))}
        </div> */}

        {/* Pass barber's services to ServiceTable */}
        <ServiceTable services={barberServices} isLoading={servicesLoading} />
      </div>

      {/* Work Schedule */}
      <div className="bg-white dark:bg-[#191a1f] rounded-2xl p-6 md:p-8 shadow-sm">
        <h3 className="text-xl md:text-2xl font-bold text-maintext dark:text-white mb-6">
          Work Schedule
        </h3>

        <div className="space-y-3">
          {datas?.barberSchuld?.map((schedule:any) => (
            <div
              key={schedule.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-[#E8E9EB] dark:border-[#30333c] rounded-xl hover:border-main dark:hover:border-main transition-colors gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-semibold text-maintext dark:text-white capitalize">
                  {schedule.day_of_week}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-helpertext sm:ml-5">
                <span className="font-medium">
                  {schedule.start_time.slice(0, 5)} - {schedule.end_time.slice(0, 5)}
                </span>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-helpertext rounded-lg text-xs font-medium w-fit">
                  Break: {schedule.break_time}min
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#1f222b] w-full max-w-md rounded-xl shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-[#E8E9EB] dark:border-[#30333c]">
              <h3 className="text-xl font-semibold text-maintext dark:text-white">
                Edit Barber Profile
              </h3>
              <button
                onClick={() => setShow(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X size={20} className="text-helpertext" />
              </button>
            </div>

            <form className="p-6 space-y-5">
              <div className="flex flex-col">
                <label className="text-helpertext text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="border border-[#E8E9EB] dark:border-[#30333c] rounded-xl px-4 py-3 outline-none focus:border-main dark:bg-transparent text-maintext dark:text-white transition-colors"
                  placeholder="Enter full name"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-helpertext text-sm font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  className="border border-[#E8E9EB] dark:border-[#30333c] rounded-xl px-4 py-3 outline-none focus:border-main dark:bg-transparent text-maintext dark:text-white transition-colors"
                  placeholder="Enter phone number"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-helpertext text-sm font-medium mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="border border-[#E8E9EB] dark:border-[#30333c] rounded-xl px-4 py-3 outline-none focus:border-main dark:bg-transparent text-maintext dark:text-white transition-colors"
                  placeholder="Enter location"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShow(false)}
                  className="flex-1 px-4 py-3 border border-[#E8E9EB] dark:border-[#30333c] text-helpertext rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <ButtonCom title="Save" type="submit" />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(BarberDetail);