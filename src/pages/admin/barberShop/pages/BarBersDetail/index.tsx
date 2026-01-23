import { memo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  ChevronLeft, 
  X, 
  Calendar,
  Star,
  Scissors,
  Upload,
} from "lucide-react";
import PageHeader from "../../../../../shared/components/pageHeader";
import profile from "../../../../../shared/assets/profile.jpg";
import ButtonCom from "../../../../../shared/components/button";
import DetailsLoading from "../../../../../shared/components/loadings/detailsLoading";
import ServiceTable from "../../components/serviceTable";
import { useBarber } from "../../service/useBarber";
import { useService } from "../../service/useService";
import { toast } from "react-toastify";
import Popup from "../../../../../shared/ui/Popup";

const initialState = {
  full_name: "",
  phone_number: "",
  bio: "",
  is_avaylbl: true,
  img: null as File | null,
};

const BarberDetail = () => {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState(initialState);
  const [previewImage, setPreviewImage] = useState<string>("");

  const { getBarberById, updateBarbershop } = useBarber();
  const { getAllServicesByBarber } = useService();
  const { id } = useParams();
  
  const { data } = getBarberById(id);
  const datas = data?.data;
  
  // Fetch services by barber ID
  const { data: servicesData, isLoading: servicesLoading } = getAllServicesByBarber(id);
  const barberServices = servicesData?.data || [];
  
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prev) => ({ ...prev, img: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => {
    if (datas) {
      setForm({
        full_name: datas.full_name || "",
        phone_number: datas.phone_number || "",
        bio: datas.bio || "",
        is_avaylbl: datas.is_avaylbl || false,
        img: null,
      });
      setPreviewImage("");
    }
    setShow(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Create FormData for multipart/form-data
    const formData = new FormData();
    formData.append("full_name", form.full_name);
    formData.append("phone_number", form.phone_number);
    formData.append("bio", form.bio);
    formData.append("is_avaylbl", form.is_avaylbl.toString());
    
    // Only append image if a new one was selected
    if (form.img) {
      formData.append("img", form.img);
    }

    try {
      await updateBarbershop.mutateAsync({
        id: id,
        data: formData,
      });
      
      toast.success("Barber profile updated successfully!");
      setShow(false);
      setForm(initialState);
      setPreviewImage("");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update barber profile");
      console.error("Update error:", error);
    }
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

            {datas?.bio && (
              <div className="flex flex-col w-full">
                <label className="text-helpertext text-[14px] md:text-[16px] font-medium pb-1.5">
                  Bio:
                </label>
                <span className="text-maintext text-[15px] md:text-[16px] font-medium border border-[#E8E9EB] px-5 md:px-8 py-3 rounded-[15px] dark:border-[#30333c]">
                  {datas?.bio}
                </span>
              </div>
            )}

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
      <Popup isShow={show} onClose={() => setShow(false)}>
        <div className="bg-white w-[90vw] max-w-[500px] max-h-[90vh] overflow-y-auto rounded-xl px-6 md:px-8 py-8 md:py-10 dark:bg-[#1f222b]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-maintext dark:text-white">
              Edit Barber Profile
            </h3>
            <div
              onClick={() => setShow(false)}
              className="inline-flex items-center justify-center bg-[#c1c0c0] p-2 rounded-xl cursor-pointer hover:bg-red-400 transition"
            >
              <X size={18} color="#3F434A" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Image Upload */}
            <div className="flex flex-col items-center">
              <label className="text-helpertext text-sm font-medium mb-2 self-start">
                Profile Image
              </label>
              <div className="relative w-32 h-32 mb-3">
                <img
                  src={
                    previewImage ||
                    (datas?.img
                      ? `${import.meta.env.VITE_ASSET_BASE_URL}${datas?.img}`
                      : profile)
                  }
                  alt="Preview"
                  className="w-full h-full rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
                />
                <label
                  htmlFor="img"
                  className="absolute bottom-0 right-0 p-2 bg-main text-white rounded-full cursor-pointer hover:bg-opacity-90 transition-all shadow-lg"
                >
                  <Upload size={18} />
                </label>
                <input
                  type="file"
                  id="img"
                  name="img"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              <p className="text-xs text-helpertext text-center">
                Click the icon to upload a new image
              </p>
            </div>

            {/* Full Name */}
            <div className="flex flex-col">
              <label htmlFor="full_name" className="text-helpertext mb-2.5">
                Full Name
              </label>
              <input
                type="text"
                name="full_name"
                id="full_name"
                value={form.full_name}
                onChange={handleChange}
                className="border border-[#E8E9EB] rounded-xl px-4 py-[15px] outline-0 focus:border-main dark:border-gray-700 dark:bg-transparent text-maintext dark:text-white"
                placeholder="Enter full name"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col">
              <label htmlFor="phone_number" className="text-helpertext mb-2.5">
                Phone Number
              </label>
              <input
                type="text"
                name="phone_number"
                id="phone_number"
                value={form.phone_number}
                onChange={handleChange}
                className="border border-[#E8E9EB] rounded-xl px-4 py-[15px] outline-0 focus:border-main dark:border-gray-700 dark:bg-transparent text-maintext dark:text-white"
                placeholder="Enter phone number"
                required
              />
            </div>

            {/* Bio */}
            <div className="flex flex-col">
              <label htmlFor="bio" className="text-helpertext mb-2.5">
                Bio
              </label>
              <textarea
                name="bio"
                id="bio"
                value={form.bio}
                onChange={handleChange}
                rows={3}
                className="border border-[#E8E9EB] rounded-xl px-4 py-[15px] outline-0 focus:border-main dark:border-gray-700 dark:bg-transparent text-maintext dark:text-white resize-none"
                placeholder="Enter bio"
              />
            </div>

            {/* Availability */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="is_avaylbl"
                name="is_avaylbl"
                checked={form.is_avaylbl}
                onChange={handleChange}
                className="w-5 h-5 text-main border-gray-300 rounded focus:ring-main"
              />
              <label
                htmlFor="is_avaylbl"
                className="text-helpertext text-sm font-medium cursor-pointer"
              >
                Available for bookings
              </label>
            </div>

            {/* Buttons */}
            <div className="flex justify-end pt-4">
              <ButtonCom 
                title={updateBarbershop.isPending ? "Saving..." : "Save"} 
                type="submit"
                disabled={updateBarbershop.isPending}
              />
            </div>
          </form>
        </div>
      </Popup>
    </div>
  );
};

export default memo(BarberDetail);