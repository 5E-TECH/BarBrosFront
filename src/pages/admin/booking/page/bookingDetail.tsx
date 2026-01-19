import { memo } from "react";
import PageHeader from "../../../../shared/components/pageHeader";
import {
  Calendar1,
  ChevronLeft,
  Clock9,
  CreditCard,
  Phone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
// import { useBooking } from "../service/useBooking";

const BookingDetail = () => {
  const navigate = useNavigate();

  //   const { getByIdBooking } = useBooking();
  //   const { data } = getByIdBooking();
  //   console.log(data);
  return (
    <div>
      <div
        onClick={() => navigate(-1)}
        className="cursor-pointer flex gap-1 items-center mb-2 md:mb-6"
      >
        <ChevronLeft
          size={30}
          color="gray"
          className="mt-[-9px] md:mt-[-3px]"
        />
        <PageHeader title="Booking Detail" />
      </div>

      <div className="flex gap-11">
        <div className="w-full rounded-2xl px-10 py-10 dark:text-white dark:bg-[#191a1f]">
          <div className="flex justify-between border-b border-[#1f222b] pb-10">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div>
                  <span className="font-bold text-xl">SERVICE NAME: </span>
                </div>
                <strong className="text-xl">Hair cut</strong>
              </div>
              <div className="flex items-center gap-4 mb-3">
                <div>
                  <Phone size={26} color="orange" />
                </div>
                <strong className="font-bold text-2xl">
                  +998 94 232 55 67
                </strong>
              </div>
              <div className="flex items-center gap-4 mb-3">
                <div>
                  <CreditCard size={26} color="orange" />
                </div>
                <strong className="font-bold text-xl">cash</strong>
              </div>
            </div>
            <div>
              <span className="text-xl bg-amber-500 rounded-2xl px-4 py-1">
                pending
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center mt-10">
            <div>
              <div className="flex items-center gap-2">
                <Calendar1 size={22} color="orange" />
                <span className="text-sm text-maintext font-semibold">
                  DATE
                </span>
              </div>
              <p className="font-bold text-[22px] pt-1">2026-01-01</p>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <Clock9 size={22} color="orange" />
                <span className="text-sm text-maintext font-semibold">
                  TIME
                </span>
              </div>
              <p className="font-bold text-[22px] pt-1">12:30:00</p>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <CreditCard size={22} color="orange" />
                <span className="text-sm text-maintext font-semibold">
                  DURATION MIN
                </span>
              </div>
              <p className="font-bold text-[22px] pt-1">30 minuts</p>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <CreditCard size={22} color="orange" />
                <span className="text-sm text-maintext font-semibold">
                  PAYMENT MODAL
                </span>
              </div>
              <div className="w-[70%] bg-amber-500 rounded-2xl font-medium text-[16px] flex justify-center items-center py-1 mt-2">
                <p>pending</p>
              </div>
            </div>
          </div>
        </div>

        <div className="dark:text-white dark:bg-[#191a1f] rounded-2xl px-10 py-10 w-[40%]">
          <div className="w-[60px] h-[60px] flex justify-center items-center border rounded-[50%]">
            User
          </div>
          <div>
            <h1 className="text-2xl font-bold">Barber Style</h1>
            <span className="text-[14px]">barber: Bahodir Nabijanov</span>
            <div className="w-[60%] border rounded-2xl py-4 px-5 text-center">
              <p className="text-gray-400 text-[13px] font-semibold">RATING</p>
              <strong className="text-xl">5.0</strong>
            </div>
            <p>barberni</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(BookingDetail);
