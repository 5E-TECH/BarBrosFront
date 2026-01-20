import { memo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  ChevronLeft, 
  X, 
  MapPin, 
  Phone, 
  User, 
  Clock, 
  Calendar,
  Star,
  Scissors,
  Edit3
} from "lucide-react";
import profile from "../../../../../shared/assets/profile.jpg";
import ButtonCom from "../../../../../shared/components/button";
import DetailsLoading from "../../../../../shared/components/loadings/detailsLoading";
import ServiceTable from "../../components/serviceTable";
import { useBarber } from "../../service/useBarber";

const initialState = {
  name: "",
  phoneNumber: "",
  location: "",
};

const BarberShopDetail = () => {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState(initialState);

  const { getBarberById } = useBarber();
  const { id } = useParams();
  const { data } = getBarberById(1);
  const datas = data?.data;
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
  const totalServices = datas.service?.length || 0;
  const avgRating = parseFloat(datas.avg_reyting) || 0;

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f1015] pb-10">
      {/* Header with Back Button */}
      <div className="mb-8">
        <div
          onClick={() => navigate(-1)}
          className="cursor-pointer flex items-center gap-2 mb-6 hover:gap-3 transition-all"
        >
          <ChevronLeft
            size={30}
            className="text-gray-600 dark:text-gray-400"
          />
          <h1 className="text-2xl md:text-3xl font-bold text-maintext dark:text-white">
            Barber Detail
          </h1>
        </div>

        {/* Main Profile Card */}
        <div className="bg-white dark:bg-[#191a1f] rounded-2xl shadow-sm overflow-hidden">
          {/* Profile Header Section */}
          <div className="flex flex-col lg:flex-row gap-8 p-6 md:p-10">
            {/* Left Side - Profile Image & Status */}
            <div className="flex flex-col items-center lg:items-start gap-4 lg:w-1/4">
              <div className="relative">
                <img
                  src={
                    datas?.img
                      ? `${import.meta.env.VITE_ASSET_BASE_URL}${datas?.img}`
                      : profile
                  }
                  alt={datas?.full_name}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2">
                  <span
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase text-white shadow-md ${
                      datas?.is_avaylbl ? "bg-green-500" : "bg-orange-500"
                    }`}
                  >
                    {datas?.is_avaylbl ? "Available" : "Busy"}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center lg:items-start gap-2 w-full">
                <span className="px-4 py-1.5 bg-gray-100 dark:bg-gray-800 text-helpertext rounded-full text-sm font-medium">
                  {datas?.role}
                </span>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold text-maintext dark:text-white">
                    {avgRating.toFixed(1)} Rating
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side - Information */}
            <div className="flex-1 space-y-6">
              {/* Name and Edit Button */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-maintext dark:text-white mb-2">
                    {datas?.full_name}
                  </h2>
                  <p className="text-helpertext leading-relaxed max-w-2xl">
                    {datas?.bio}
                  </p>
                </div>
                <ButtonCom onClick={handleEdit} title="Edit" type="button" />
              </div>

              {/* Contact Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-helpertext text-sm font-medium mb-2">
                    Phone Number:
                  </label>
                  <div className="flex items-center gap-3 border border-[#E8E9EB] dark:border-[#30333c] px-5 py-3 rounded-[15px]">
                    <Phone className="w-4 h-4 text-helpertext" />
                    <span className="text-maintext dark:text-white font-medium">
                      {datas?.phone_number}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-helpertext text-sm font-medium mb-2">
                    Username:
                  </label>
                  <div className="flex items-center gap-3 border border-[#E8E9EB] dark:border-[#30333c] px-5 py-3 rounded-[15px]">
                    <User className="w-4 h-4 text-helpertext" />
                    <span className="text-maintext dark:text-white font-medium break-all">
                      @{datas?.username}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col md:col-span-2">
                  <label className="text-helpertext text-sm font-medium mb-2">
                    Barbershop Location:
                  </label>
                  <div className="flex items-center gap-3 border border-[#E8E9EB] dark:border-[#30333c] px-5 py-3 rounded-[15px]">
                    <MapPin className="w-4 h-4 text-helpertext" />
                    <span className="text-maintext dark:text-white font-medium">
                      {datas?.barberShop?.location}
                    </span>
                  </div>
                </div>
              </div>
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
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-maintext dark:text-white">
            Services & Expertise
          </h3>
          <span className="text-sm font-medium text-main">
            {totalServices} Services
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {datas?.service?.slice(0, 6).map((service:any) => (
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
        </div>

        <ServiceTable />
      </div>

      {/* Work Schedule */}
      <div className="bg-white dark:bg-[#191a1f] rounded-2xl p-6 md:p-8 shadow-sm mb-8">
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

      {/* Barbershop Info */}
      <div className="bg-white dark:bg-[#191a1f] rounded-2xl p-6 md:p-8 shadow-sm">
        <h3 className="text-xl md:text-2xl font-bold text-maintext dark:text-white mb-6">
          Barbershop Information
        </h3>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <img
              src={`${import.meta.env.VITE_ASSET_BASE_URL}${datas?.barberShop?.img}`}
              alt={datas?.barberShop?.name}
              className="w-full h-48 object-cover rounded-xl shadow-md"
            />
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <h4 className="text-xl font-bold text-maintext dark:text-white mb-2">
                {datas?.barberShop?.name}
              </h4>
              <p className="text-helpertext">
                {datas?.barberShop?.descripton}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-main flex-shrink-0" />
                <span className="text-sm text-maintext dark:text-white">
                  {datas?.barberShop?.location}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-main flex-shrink-0" />
                <span className="text-sm text-maintext dark:text-white">
                  {datas?.barberShop?.phoneNumber}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                <span className="text-sm text-maintext dark:text-white">
                  {parseFloat(datas?.barberShop?.avg_rating).toFixed(1)} Rating
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase text-white ${
                    datas?.barberShop?.status === "active"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {datas?.barberShop?.status}
                </span>
              </div>
            </div>
          </div>
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

export default memo(BarberShopDetail);