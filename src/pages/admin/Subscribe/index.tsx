import { memo, useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, X } from "lucide-react";
import { useSubscription } from "./service/useSubscription";
import TableLoading from "../../../shared/components/loadings/tableLoading";
import Popup from "../../../shared/ui/Popup";

interface SubscriptionForm {
  name: string;
  duration_months: number;
  price: number;
  is_active: boolean;
}

const initialFormState: SubscriptionForm = {
  name: "",
  duration_months: 1,
  price: 0,
  is_active: true,
};

const Subscribe: FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<SubscriptionForm>(initialFormState);

  const { getAllSubscription, createSubscription } = useSubscription();

  const { data, isLoading, refetch } = getAllSubscription();
  const plans = data?.data || [];

  const handleOpenCreate = () => {
    setForm(initialFormState);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setForm(initialFormState);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "number"
          ? parseFloat(value) || 0
          : type === "checkbox"
            ? (e.target as HTMLInputElement).checked
            : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    createSubscription.mutate(form, {
      onSuccess: () => {
        handleCloseModal();
        refetch();
      },
    });
  };

  if (isLoading) return <TableLoading />;

  return (
    <div className=" bg-gray-50 dark:bg-[#191a1f]">
      <div className="bg-white dark:bg-[#191a1f] border-b border-gray-200 dark:border-[#1f222b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Subscription Plans
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Manage your subscription offerings
              </p>
            </div>
            <button
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FA8B00] hover:bg-[#E07D00] text-white font-semibold rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              <Plus size={20} />
              New Plan
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Plans Grid */}
        {plans.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200  p-12 text-center">
            <div className="max-w-sm mx-auto">
              <div className="w-16 h-16 bg-orange-50 dark:bg-orange-900/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-[#FA8B00]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No plans yet
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Get started by creating your first subscription plan
              </p>
              <button
                onClick={handleOpenCreate}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#FA8B00] hover:bg-[#E07D00] text-white font-medium rounded-lg transition-colors"
              >
                <Plus size={18} />
                Create Plan
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan: any, index: number) => {
              // Orange-based accent colors
              const accentColors = [
                "from-[#FA8B00] to-[#FF9500]",
                "from-[#FF9500] to-[#FFA500]",
                "from-[#E07D00] to-[#FA8B00]",
                "from-[#FFA500] to-[#FFB84D]",
                "from-[#FF8C42] to-[#FFA500]",
                "from-[#FA8B00] to-[#FFB84D]",
              ];
              const colorClass = accentColors[index % accentColors.length];

              return (
                <div
                  key={plan.id}
                  onClick={() => navigate(`/subscribe-detail/${plan.id}`)}
                  className="group relative bg-white dark:bg-[#1f222b] rounded-xl border border-gray-200 dark:border-gray-800 hover:border-[#FA8B00]/30 dark:hover:border-[#FA8B00]/30 transition-all duration-200 cursor-pointer overflow-hidden hover:shadow-lg"
                >
                  {/* Top Accent Bar */}
                  <div className={`h-1.5 bg-linear-to-r ${colorClass}`}></div>

                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-[#FA8B00] transition-colors">
                          {plan.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {plan.duration_months}{" "}
                          {plan.duration_months === 1 ? "month" : "months"}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          plan.is_active
                            ? "bg-orange-100 text-[#FA8B00] dark:bg-orange-900/30 dark:text-orange-400"
                            : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                        }`}
                      >
                        {plan.is_active ? "Active" : "Inactive"}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-gray-900 dark:text-white">
                          {plan.price.toLocaleString()}
                        </span>
                        <span className="text-lg font-medium text-gray-500 dark:text-gray-400">
                          UZS
                        </span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-100 dark:border-gray-800 pt-6">
                      {/* Details */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            Created
                          </span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {new Date(
                              Number(plan.created_at),
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>

                      {/* View Details Link */}
                      <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                        <div className="flex items-center justify-between text-sm font-medium text-[#FA8B00] dark:text-orange-400 group-hover:gap-2 transition-all">
                          <span>View details</span>
                          <svg
                            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Create Modal */}
      <Popup isShow={showModal} onClose={handleCloseModal}>
        <div className="bg-white dark:bg-[#1f222b] w-[90vw] max-w-lg rounded-xl overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 dark:border-[#191a1f]">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#191a1f] dark:text-white">
                Create New Plan
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Plan Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Enter plan name"
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-[#FA8B00] focus:border-[#FA8B00] dark:bg-[#191a1f] dark:text-white transition-shadow"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="duration_months"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Duration (Months)
                </label>
                <input
                  type="number"
                  name="duration_months"
                  id="duration_months"
                  required
                  min="1"
                  value={form.duration_months}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-[#FA8B00] focus:border-[#FA8B00] dark:bg-[#191a1f] dark:text-white transition-shadow"
                />
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Price (UZS)
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  required
                  min="0"
                  step="1"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-[#FA8B00] focus:border-[#FA8B00] dark:bg-[#191a1f] dark:text-white transition-shadow"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg">
              <input
                type="checkbox"
                name="is_active"
                id="is_active"
                checked={form.is_active}
                onChange={handleChange}
                className="w-4 h-4 rounded border-gray-300 text-[#FA8B00] focus:ring-[#FA8B00]"
              />
              <label
                htmlFor="is_active"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Set as active plan
              </label>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleCloseModal}
                className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2.5 bg-[#FA8B00] hover:bg-[#E07D00] text-white font-medium rounded-lg transition-colors shadow-sm cursor-pointer"
              >
                Create Plan
              </button>
            </div>
          </form>
        </div>
      </Popup>
      {/* <Outlet /> */}
    </div>
  );
};

export default memo(Subscribe);
