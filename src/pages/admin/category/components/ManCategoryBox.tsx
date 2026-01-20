import { memo, useState, type FormEvent } from "react";
import { SquarePen, X, ChevronDown } from "lucide-react"; // ChevronDown qo'shildi
import { useCategory } from "../service/useCategory";
import { BASE_ASSETS_URL } from "../../../../shared/const";
import CategoryLoading from "../../../../shared/components/loadings/categoryLoading";
import Popup from "../../../../shared/ui/Popup";
import ButtonCom from "../../../../shared/components/button";
import { useNavigate } from "react-router-dom";

const ManCategoryBox = () => {
  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [img, setImg] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [disable, setDisable] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    categoryType: "",
  });
  const { getCategory, updateCategory } = useCategory();
  const datas = getCategory?.data?.data || [];

    const flWoman = datas.filter((data: any) => data.categoryType === "man")

  const processedData = flWoman.map((element: any) => {
    let imgUrl = element.img;
    if (imgUrl && !/^https?:\/\//.test(imgUrl)) {
      imgUrl = `${BASE_ASSETS_URL}${
        imgUrl.startsWith("/") ? "" : "/"
      }${imgUrl}`;
    }
    return { ...element, img: imgUrl };
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImg(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisable(true);
    setErrorMessage(null);

    if (!selectedId) return;

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("categoryType", form.categoryType);
    if (img) formData.append("img", img);

    updateCategory.mutate(
      { id: selectedId, data: formData },
      {
        onSuccess: () => {
          setDisable(false);
          setShow(false);
          setErrorMessage(null);
        },
        onError: (error: any) => {
          setDisable(false);
          const serverError =
            error?.response?.data?.message ||
            "Something went wrong. Please try again.";
          setErrorMessage(serverError);
        },
      }
    );
  };

  const handleEdit = (data: any) => {
    setSelectedId(data.id);
    setForm({ name: data.name, categoryType: data.categoryType });
    setPreview(data.img);
    setImg(null);
    setShow(true);
  };

  if (getCategory.isLoading) {
    return <CategoryLoading />;
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
        {processedData.length > 0 &&
          processedData
            .filter((data: any) => !data.is_deleted)
            .map((data: any) => (
              <div
                onClick={() => navigate(`category-detail/${data.id}`)}
                key={data.id}
                className="bg-white rounded-2xl px-4 py-4 border border-gray-100 shadow-sm hover:shadow-md transition cursor-pointer dark:bg-[#1f222b] dark:border-0"
              >
                <div className="flex justify-end mb-1">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(data);
                    }}
                  >
                    <SquarePen size={20} className="text-main" />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-base font-bold text-maintext truncate dark:text-white">
                    {data.name}
                  </h3>
                  <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={data.img}
                      alt={data.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            ))}
      </div>

      <Popup isShow={show} onClose={() => setShow(false)}>
        <div className="bg-white w-[92vw] max-w-[480px] rounded-2xl px-5 md:px-8 py-7 md:py-10 dark:bg-[#1f222b] shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg md:text-xl font-bold dark:text-white">
              Edit Category
            </h3>
            <div
              onClick={() => setShow(false)}
              className="inline-flex items-center justify-center bg-gray-100 dark:bg-gray-800 p-2 rounded-xl cursor-pointer hover:bg-red-500 group transition"
            >
              <X
                size={18}
                className="text-gray-600 dark:text-gray-300 group-hover:text-white"
              />
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-5 md:space-y-7">
            <div className="flex flex-col">
              <label className="text-helpertext text-sm mb-2 font-medium">
                Category Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Enter name"
                className="border border-[#E8E9EB] rounded-xl px-4 py-3.5 md:py-[15px] outline-0 focus:border-main dark:border-gray-700 dark:text-white w-full"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-helpertext text-sm mb-2 font-medium">
                Category Type
              </label>
              <div className="relative">
                <select
                  name="categoryType"
                  value={form.categoryType}
                  onChange={handleChange}
                  required
                  className="appearance-none border border-[#E8E9EB] rounded-xl px-4 py-3.5 md:py-[15px] outline-0 focus:border-main dark:border-gray-700 dark:text-white w-full cursor-pointer"
                >
                  <option value="" disabled>
                    Select Type
                  </option>
                  <option value="man" className="dark:bg-gray-700">
                    Man
                  </option>
                  <option value="woman" className="dark:bg-gray-700">
                    Woman
                  </option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <ChevronDown size={18} />
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-helpertext text-sm mb-2 font-medium">
                Category Image
              </label>
              <label className="border-2 border-dashed border-[#E8E9EB] rounded-2xl h-[130px] md:h-[150px] flex items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-[#191a1f] transition dark:border-gray-700 overflow-hidden">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="h-full w-full object-contain p-2"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-helpertext text-xs">
                      Click to upload image
                    </span>
                  </div>
                )}
              </label>
            </div>

            <div className="space-y-3 pt-2">
              {errorMessage && (
                <p className="text-red-500 text-sm font-medium animate-pulse">
                  {errorMessage}
                </p>
              )}

              <div className="flex justify-end">
                <ButtonCom
                  title={disable ? "Saving..." : "Save Changes"}
                  type="submit"
                  disabled={disable}
                />
              </div>
            </div>
          </form>
        </div>
      </Popup>
    </div>
  );
};

export default memo(ManCategoryBox);
