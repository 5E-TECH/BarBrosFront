import { memo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar1,
  ChevronLeft,
  Clock9,
  CreditCard,
  Phone,
  Timer,
  User,
  type LucideIcon,
} from "lucide-react";
import PageHeader from "../../../../shared/components/pageHeader";
import { FaMoneyBill } from "react-icons/fa";
// import { useBooking } from "../service/useBooking";

const InfoBlock = ({
  icon: Icon,
  label,
  value,
  color = "orange",
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  color?: string;
}) => (
  <div className="min-w-[120px]">
    <div className="flex items-center gap-2">
      <Icon size={20} color={color} className="md:w-[22px]" />
      <span className="text-[10px] md:text-sm text-gray-500 dark:text-maintext font-semibold uppercase">
        {label}
      </span>
    </div>
    <p className="font-bold text-lg md:text-[22px] pt-1">{value}</p>
  </div>
);

const BookingDetail = () => {
  const navigate = useNavigate();

  // const { getByIdBooking } = useBooking();

  const bookingData = {
    serviceName: "Hair cut",
    phoneNumber: "+998 94 232 55 67",
    paymentMethod: "cash",
    money: 50,
    status: "pending",
    date: "2026-01-01",
    time: "12:30:00",
    duration: "30 minuts",
    paymentStatus: "pending",
    barberName: "Barber Style",
    specialist: "Bahodir Nabijanov",
    rating: "5.0",
    barberPhone: "+998942325567",
  };

  return (
    <div className="p-2 md:p-0">
      <div
        onClick={() => navigate(-1)}
        className="cursor-pointer flex gap-1 items-center mb-4 md:mb-6 w-fit"
      >
        <ChevronLeft size={30} className="text-gray-500" />
        <PageHeader title="Booking Detail" />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-11">
        <div className="flex-1 rounded-2xl p-6 md:p-10 bg-white dark:bg-[#191a1f] shadow-sm border border-gray-100 dark:border-none text-black dark:text-white">
          <div className="flex flex-col sm:flex-row justify-between border-b border-gray-100 dark:border-[#1f222b] pb-8 md:pb-10 gap-4">
            <div>
              <div className="flex items-center gap-4 mb-4 md:mb-6">
                <span className="font-bold text-lg md:text-lg">
                  Service Name:{" "}
                </span>
                <strong className="text-xl md:text-xl uppercase">
                  {bookingData.serviceName}
                </strong>
              </div>

              <div className="flex items-center gap-4 mb-3">
                <Phone size={24} className="text-main" />
                <strong className="font-bold text-xl md:text-2xl">
                  {bookingData.phoneNumber}
                </strong>
              </div>

              <div className="flex items-center gap-4 mb-3">
                <CreditCard size={24} className="text-main" />
                <strong className="font-bold text-lg md:text-xl uppercase">
                  {bookingData.paymentMethod}
                </strong>
              </div>

              <div className="flex items-center gap-4 mb-3">
                <FaMoneyBill size={24} className="text-main" />
                <strong className="font-bold text-lg md:text-xl uppercase">
                  {bookingData.money} UZS
                </strong>
              </div>
            </div>

            <div className="sm:text-right">
              <span className="inline-block text-lg md:text-xl bg-main rounded-2xl px-4 py-1 font-medium text-white">
                {bookingData.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 md:mt-10">
            <InfoBlock icon={Calendar1} label="Date" value={bookingData.date} />
            <InfoBlock icon={Clock9} label="Time" value={bookingData.time} />
            <InfoBlock
              icon={Timer}
              label="Duration"
              value={bookingData.duration}
            />

            <div className="min-w-[120px]">
              <div className="flex items-center gap-2">
                <CreditCard size={20} className="text-main" />
                <span className="text-[10px] md:text-sm text-gray-500 dark:text-maintext font-semibold uppercase">
                  Payment Modal
                </span>
              </div>
              <div className="w-full sm:w-[120px] bg-main rounded-2xl font-medium text-sm md:text-[16px] flex justify-center items-center py-1 mt-2 text-white">
                {bookingData.paymentStatus}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[35%] xl:w-[40%] bg-white dark:bg-[#191a1f] rounded-2xl py-8 md:py-10 flex flex-col items-center shadow-sm border border-gray-100 dark:border-none dark:text-white">
          <div className="w-[70px] h-[70px] md:w-[81px] md:h-[81px] flex justify-center items-center rounded-full bg-gray-100 dark:bg-[#1f222b] mb-4">
            <User size={30} className="text-gray-600 dark:text-gray-300" />
          </div>

          <div className="text-center w-full px-6">
            <h1 className="text-xl md:text-2xl font-bold pb-1">
              {bookingData.barberName}
            </h1>
            <span className="text-sm text-gray-500 dark:text-helpertext italic">
              Barber: {bookingData.specialist}
            </span>

            <div className="flex gap-2 sm:gap-6 mt-6 md:mt-8">
              <div className="flex-1 rounded-2xl py-4 px-1 md:px-2 text-center bg-gray-50 dark:bg-[#1f222b]">
                <p className="text-gray-500 dark:text-helpertext text-[10px] md:text-[13px] font-semibold uppercase">
                  Rating
                </p>
                <strong className="text-lg md:text-xl text-main">
                  {bookingData.rating}
                </strong>
              </div>
              <div className="flex-[1.5] sm:flex-1 rounded-2xl py-4 px-1 md:px-2 text-center bg-gray-50 dark:bg-[#1f222b]">
                <p className="text-gray-500 dark:text-helpertext text-[10px] md:text-[13px] font-semibold uppercase">
                  Phone
                </p>
                <strong className="text-[14px] sm:text-sm md:text-lg leading-tight block mt-1 whitespace-nowrap tabular-nums">
                  {bookingData.barberPhone}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(BookingDetail);
