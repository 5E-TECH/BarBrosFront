import { memo, useState, type FormEvent, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Plus, X, UploadCloud } from "lucide-react";
import PageHeader from "../../../../shared/components/pageHeader";
import Popup from "../../../../shared/ui/Popup";
import ButtonCom from "../../../../shared/components/button";
import { useService } from "../service/useService";

const initialState = {
  name: "",
  description: "",
  duration_minutes: "",
};

const CategoryDetail = () => {
  const navigate = useNavigate();
  const { id: categoryId } = useParams();

  const [disable, setDisable] = useState(false);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { createService, uploadServiceImage } = useService();

  // Fayl tanlash va preview qilish
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // Input o'zgarishlarini boshqarish
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Yakuniy tozalash funksiyasi
  const handleFinalize = () => {
    setForm(initialState);
    setFile(null);
    setPreview(null);
    setShow(false);
    setDisable(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisable(true);
    setErrorMessage(null);

    const serviceData = {
      ...form,
      duration_minutes: Number(form.duration_minutes),
      category_id: Number(categoryId),
    };

    // 1-bosqich: Servis yaratish
    createService.mutate(serviceData, {
      onSuccess: (response) => {
        // API dan qaytgan ID ni tekshirish (response.data.id yoki response.id bo'lishi mumkin)
        const newServiceId = response?.data?.id || response?.id;

        // 2-bosqich: Agar ID bo'lsa va rasm tanlangan bo'lsa
        if (newServiceId && file) {
          const formData = new FormData();
          formData.append("image", file);
          formData.append("service_id", String(newServiceId));

          uploadServiceImage.mutate(formData, {
            onSuccess: () => {
              handleFinalize(); // Ikkalasi ham muvaffaqiyatli
            },
            onError: () => {
              setErrorMessage("Servis yaratildi, lekin rasm yuklashda xato.");
              setDisable(false);
            },
          });
        } else {
          // Rasm yo'q bo'lsa, servisning o'zi yetarli
          handleFinalize();
        }
      },
      onError: (error: any) => {
        setDisable(false);
        setErrorMessage(
          error?.response?.data?.message ||
            "Xizmat yaratishda xatolik yuz berdi.",
        );
      },
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div
          onClick={() => navigate(-1)}
          className="cursor-pointer flex gap-1 items-center mb-6"
        >
          <ChevronLeft
            size={30}
            color="gray"
            className="mt-[-9px] md:mt-[-3px]"
          />
          <PageHeader title="Category Detail" />
        </div>

        <button
          onClick={() => setShow(true)}
          className="w-full sm:w-auto bg-main flex items-center justify-center gap-2.5 text-white rounded-xl px-5 py-4 font-medium hover:opacity-90 transition cursor-pointer"
        >
          <Plus size={22} /> Add Service
        </button>

        <Popup isShow={show} onClose={() => setShow(false)}>
          <div className="bg-white w-[92vw] max-w-[480px] rounded-2xl px-5 md:px-8 py-7 md:py-10 dark:bg-[#1f222b] dark:text-white shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg md:text-xl font-bold">New Service</h3>
              <div
                onClick={() => setShow(false)}
                className="p-2 bg-gray-100 dark:bg-gray-800 rounded-xl cursor-pointer hover:bg-red-500 transition group"
              >
                <X
                  size={18}
                  className="text-gray-600 dark:text-gray-300 group-hover:text-white"
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
              {/* Rasm yuklash maydoni */}
              <div className="flex flex-col">
                <label className="text-helpertext text-sm mb-2 font-medium italic">
                  Service Image
                </label>
                <label className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl h-[140px] flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-[#24262d] transition overflow-hidden">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  {preview ? (
                    <img
                      src={preview}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-400">
                      <UploadCloud size={32} />
                    </div>
                  )}
                </label>
              </div>

              {/* Form ma'lumotlari */}
              <div className="flex flex-col">
                <label className="text-helpertext text-sm mb-2 font-medium">
                  Service Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Service name"
                  className="border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-main dark:bg-transparent"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-helpertext text-sm mb-2 font-medium">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  placeholder="Service description"
                  className="border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-main dark:bg-transparent"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-helpertext text-sm mb-2 font-medium">
                  Duration (Min)
                </label>
                <input
                  type="number"
                  name="duration_minutes"
                  value={form.duration_minutes}
                  onChange={handleChange}
                  required
                  placeholder="30"
                  className="border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-main dark:bg-transparent"
                />
              </div>

              {errorMessage && (
                <p className="text-red-500 text-sm font-medium">
                  {errorMessage}
                </p>
              )}

              <div className="flex justify-end pt-4">
                <ButtonCom
                  title={disable ? "Processing..." : "Confirm"}
                  type="submit"
                  disabled={disable}
                />
              </div>
            </form>
          </div>
        </Popup>
      </div>
    </div>
  );
};

export default memo(CategoryDetail);
