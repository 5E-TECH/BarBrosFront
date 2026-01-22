import { memo, useState, type FormEvent } from "react";
import {
  X,
  Edit2,
  MapPin,
  Phone,
  Calendar,
  CreditCard,
  CheckCircle,
} from "lucide-react";
import { useSubscription } from "../service/useSubscription";
import { useParams } from "react-router-dom";
import Popup from "../../../../shared/ui/Popup";
import ButtonCom from "../../../../shared/components/button";

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
  const { data } = getSubscriptionById(id);

  if (!data || !data.data || data.data.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Ma'lumot topilmadi
          </h2>
          <p className="text-gray-600 mt-2">Subscription ID: {id}</p>
        </div>
      </div>
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

  const handleEdit = (shop: ShopData) => {
    setSelectedShop(shop);
    setEditForm({
      status: shop.subscription.status,
      payment_status: shop.subscription.payment_status,
      payment_model: shop.subscription.payment_model,
    });
    setIsEditOpen(true);
  };

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
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
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
                <p className="text-lg font-semibold text-gray-800">
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
                <p className="text-lg font-semibold text-gray-800">
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
                <p className="text-lg font-semibold text-gray-800">
                  {subscribedShops.length} ta
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">
              Ulangan Barbershoplar
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Barbershop
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Manzil
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Telefon
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Boshlanish
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tugash
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    To'lov
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amallar
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subscribedShops.map((shop: ShopData) => (
                  <tr
                    key={shop.barberShop.id}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={shop.barberShop.img}
                          alt={shop.barberShop.name}
                          onError={(e: any) => {
                            e.target.src = "https://via.placeholder.com/40";
                          }}
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {shop.barberShop.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            @{shop.barberShop.username}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-900 max-w-xs">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                        <span className="truncate">
                          {shop.barberShop.location}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        {shop.barberShop.phoneNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(shop.subscription.start_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(shop.subscription.end_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          shop.subscription.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {shop.subscription.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          shop.subscription.payment_status === "paid"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {shop.subscription.payment_status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(shop)}
                        className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
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
              className="inline-flex items-center justify-center bg-[#c1c0c0] p-2 rounded-xl cursor-pointer hover:bg-red-400 transition"
            >
              <X size={18} color="#3F434A" />
            </div>
          </div>

          <form onSubmit={handleSave} className="dark:text-white">
            <div className="flex flex-col mb-6 md:mb-9">
              <label className="text-helpertext mb-2.5">Barbershop</label>
              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src={selectedShop?.barberShop.img}
                  alt={selectedShop?.barberShop.name}
                  onError={(e: any) => {
                    e.target.src = "https://via.placeholder.com/40";
                  }}
                />
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
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="expired">Expired</option>
              </select>
            </div>

            <div className="flex flex-col mb-6 md:mb-9">
              <label htmlFor="payment_status" className="text-helpertext mb-2.5">
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
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
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
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="online">Online</option>
              </select>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsEditOpen(false)}
                className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-medium dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 transition"
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