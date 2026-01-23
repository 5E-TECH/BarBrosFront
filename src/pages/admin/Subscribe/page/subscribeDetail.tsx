import { memo, useState, type FormEvent } from "react";
import {
  X,
  MapPin,
  Phone,
  Calendar,
  CreditCard,
  CheckCircle,
  ChevronLeft,
} from "lucide-react";
import { useSubscription } from "../service/useSubscription";
import { useNavigate, useParams } from "react-router-dom";
import Popup from "../../../../shared/ui/Popup";
import ButtonCom from "../../../../shared/components/button";
import TableLoading from "../../../../shared/components/loadings/tableLoading";
import PageHeader from "../../../../shared/components/pageHeader";
import Search from "../../../../shared/components/Search";

// Type definitions
interface BarberShop {
  id: string;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  img: string;
  description: string;
  phoneNumber: string;
  username: string;
  status: string;
  avg_rating: string;
}

interface Plan {
  id: string;
  name: string;
  duration_months: number;
  price: number;
  is_active: boolean;
}

interface Subscription {
  id: string;
  barber_shop_id: string;
  plan_id: string;
  start_at: string;
  end_at: string;
  status: string;
  payment_model: string;
  payment_status: string;
  plan: Plan;
}

interface ShopData {
  barberShop: BarberShop;
  subscription: Subscription;
}

const SubscribeDetail = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedShop, setSelectedShop] = useState<ShopData | null>(null);
  const [editForm, setEditForm] = useState({
    status: "",
    payment_status: "",
    payment_model: "",
  });

  const { id } = useParams();

  const { getSubscriptionById, updateSubscription } = useSubscription();
  const { data, isLoading } = getSubscriptionById(id);

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <>
        <TableLoading />
      </>
    );
  }

  const subscribedShops: ShopData[] = data.data;
  const planData = subscribedShops[0]?.subscription?.plan;

  const formatDate = (timestamp: string) => {
    return new Date(parseInt(timestamp)).toLocaleDateString("uz-UZ", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("uz-UZ").format(price) + " UZS";
  };

  // const handleEdit = (shop: ShopData) => {
  //   setSelectedShop(shop);
  //   setEditForm({
  //     status: shop.subscription.status,
  //     payment_status: shop.subscription.payment_status,
  //     payment_model: shop.subscription.payment_model,
  //   });
  //   setIsEditOpen(true);
  // };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedShop) return;

    updateSubscription.mutate(
      {
        id: selectedShop.subscription.id,
        data: editForm,
      },
      {
        onSuccess: () => {
          setIsEditOpen(false);
          setSelectedShop(null);
        },
      },
    );
  };

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
        <PageHeader title="Subscription Detail" />
      </div>
      <div className="mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 mb-6 dark:bg-[#191a1f]">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-maintext">
              Subscription Plan Details
            </h1>
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-semibold">
              {planData?.name || "N/A"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Davomiyligi</p>
                <p className="text-lg font-semibold dark:text-white">
                  {planData?.duration_months || 0} oy
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <CreditCard className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Narxi</p>
                <p className="text-lg font-semibold dark:text-white">
                  {planData?.price ? formatPrice(planData.price) : "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Obunachi soni</p>
                <p className="text-lg font-semibold dark:text-white">
                  {subscribedShops.length} ta
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden dark:bg-[#191a1f]">
          <div className="pt-6 px-12">
            <Search />
          </div>

          <div className="overflow-x-auto dark:bg-[#191a1f] px-4">
            <table className="mt-[31px] mb-20 w-full">
              <thead className="uppercase text-helpertext border-b border-[#e8e9eb] dark:border-[#1f222b]">
                <tr>
                  <th className="pl-10 pb-3 text-left">BarberShop Name</th>
                  <th className="pl-6 pb-3 text-left">Address</th>
                  <th className="pl-6 pb-3 text-left">Phone number</th>
                  <th className="pl-6 pb-3 text-left">Start</th>
                  <th className="pl-6 pb-3 text-left">End</th>
                  <th className="pl-6 pb-3 text-left">Status</th>
                  <th className="pl-6 pb-3 text-left">Payment</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {subscribedShops.map((shop: ShopData) => (
                  <tr
                    key={shop.barberShop.id}
                    className="border-b border-[#e8e9eb] hover:bg-gray-50 cursor-pointer dark:hover:bg-[#1f222b] dark:border-[#1f222b] text-[#3F434A] dark:text-white"
                  >
                    <td className="py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={shop.barberShop.img}
                          alt={shop.barberShop.name}
                          onError={(e: any) => {
                            e.target.src = "https://via.placeholder.com/40";
                          }}
                        />
                        <div className="">
                          <div className="text-md font-medium">
                            {shop.barberShop.name}
                          </div>
                          <div className="text-md text-gray-500">
                            @{shop.barberShop.username}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-md max-w-xs">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400 shrink-0" />
                        <span className="truncate">
                          {shop.barberShop.location}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-md">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        {shop.barberShop.phoneNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-md">
                      {formatDate(shop.subscription.start_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-md">
                      {formatDate(shop.subscription.end_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold text-white rounded-full ${
                          shop.subscription.status === "active"
                            ? "bg-green-500"
                            : "bg-red-600"
                        }`}
                      >
                        {shop.subscription.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full text-white ${
                          shop.subscription.payment_status === "paid"
                            ? "bg-green-500"
                            : "bg-main"
                        }`}
                      >
                        {shop.subscription.payment_status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Modal using Popup component */}
      <Popup isShow={isEditOpen} onClose={() => setIsEditOpen(false)}>
        <div className="bg-white w-[90vw] max-w-[500px] rounded-xl px-6 md:px-8 py-8 md:py-10 dark:bg-[#1f222b]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold dark:text-white">
              Edit Subscription
            </h3>
            <div
              onClick={() => setIsEditOpen(false)}
              className="inline-flex items-center justify-center bg-[#c1c0c0] p-2 rounded-xl cursor-pointer hover:bg-red-500 transition"
            >
              <X size={18} color="#3F434A" />
            </div>
          </div>

          <form onSubmit={handleSave} className="dark:text-white">
            <div className="flex flex-col mb-6 md:mb-9">
              <label className="text-helpertext mb-2.5">Barbershop</label>
              <div className="border border-[#e9e9e9] dark:border-gray-700 rounded-2xl p-3">
                <div>
                  <p className="text-maintext font-semibold dark:text-white">
                    {selectedShop?.barberShop.name}
                  </p>
                  <p className="text-sm text-helpertext">
                    @{selectedShop?.barberShop.username}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col mb-6 md:mb-9">
              <label htmlFor="status" className="text-helpertext mb-2.5">
                Subscription Status
              </label>
              <select
                name="status"
                id="status"
                required
                value={editForm.status}
                onChange={handleChange}
                className="border border-[#E8E9EB] rounded-xl px-4 py-[15px] outline-0 focus:border-main dark:border-gray-700 dark:bg-transparent"
              >
                <option value="active" className="dark:bg-[#1f222b]">
                  Active
                </option>
                <option value="inactive" className="dark:bg-[#1f222b]">
                  Inactive
                </option>
                <option value="expired" className="dark:bg-[#1f222b]">
                  Expired
                </option>
              </select>
            </div>

            <div className="flex flex-col mb-6 md:mb-9">
              <label
                htmlFor="payment_status"
                className="text-helpertext mb-2.5"
              >
                Payment Status
              </label>
              <select
                name="payment_status"
                id="payment_status"
                required
                value={editForm.payment_status}
                onChange={handleChange}
                className="border border-[#E8E9EB] rounded-xl px-4 py-[15px] outline-0 focus:border-main dark:border-gray-700 dark:bg-transparent"
              >
                <option value="paid" className="dark:bg-[#1f222b]">
                  Paid
                </option>
                <option value="pending" className="dark:bg-[#1f222b]">
                  Pending
                </option>
                <option value="failed" className="dark:bg-[#1f222b]">
                  Failed
                </option>
              </select>
            </div>

            <div className="flex flex-col mb-6 md:mb-9">
              <label htmlFor="payment_model" className="text-helpertext mb-2.5">
                Payment Model
              </label>
              <select
                name="payment_model"
                id="payment_model"
                required
                value={editForm.payment_model}
                onChange={handleChange}
                className="border border-[#E8E9EB] rounded-xl px-4 py-[15px] outline-0 focus:border-main dark:border-gray-700 dark:bg-transparent"
              >
                <option value="cash" className="dark:bg-[#1f222b]">
                  Cash
                </option>
                <option value="card" className="dark:bg-[#1f222b]">
                  Card
                </option>
                <option value="online" className="dark:bg-[#1f222b]">
                  Online
                </option>
              </select>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsEditOpen(false)}
                className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-medium dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 transition cursor-pointer"
              >
                Bekor qilish
              </button>
              <ButtonCom title="Saqlash" type="submit" />
            </div>
          </form>
        </div>
      </Popup>
    </div>
  );
};

export default memo(SubscribeDetail);