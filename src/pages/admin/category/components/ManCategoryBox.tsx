import { memo, useState, type FormEvent } from "react";
import { SquarePen, X } from "lucide-react";
import { useCategory } from "../service/useCategory";
import { BASE_ASSETS_URL } from "../../../../shared/const";
import CategoryLoading from "../../../../shared/components/loadings/categoryLoading";
import Popup from "../../../../shared/ui/Popup";
import ButtonCom from "../../../../shared/components/button";

const ManCategoryBox = () => {
  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [img, setImg] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  

  const [form, setForm] = useState({
    name: "",
    categoryType: "",
  });
  const { getCategoryMan, updateCategory } = useCategory();
  const datas = getCategoryMan?.data?.data || [];

  const processedData = datas.map((element: any) => {
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

    if (!selectedId) return;

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("categoryType", form.categoryType);

    if (img) {
      formData.append("img", img);
    }

    updateCategory.mutate(
      {
        id: selectedId,
        data: formData,
      },
      {
        onSuccess: () => {
          setShow(false);
          setSelectedId(null);
          setImg(null);
          setPreview(null);
          setForm({
            name: "",
            categoryType: "",
          });
        },
      }
    );
  };

  const handleEdit = (data: any) => {
    setSelectedId(data.id);
    setForm({
      name: data.name,
      categoryType: data.categoryType,
    });
    setPreview(data.img);
    setImg(null); 
    setShow(true);
  };

  if (getCategoryMan.isLoading) {
    return <CategoryLoading />;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {processedData.length > 0 &&
          processedData.map((data: any) => (
            <div
              key={data.id}
              className="gap-4 bg-white rounded-xl px-4 py-3 border border-gray-100 shadow-sm hover:shadow-md transition"
            >
              <div
                
                className="flex justify-end mb-2"
              >
                <SquarePen onClick={() => handleEdit(data)} size={20} className="text-main hover:text-main cursor-pointer " />
              </div>

              <div className="flex items-center justify-between">
                <h3 className="text-gl font-bold text-maintext truncate">
                  {data.name}
                </h3>
                <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden shrink-0">
                  {data.img ? (
                    <img
                      src={data.img}
                      alt={data.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-xs text-helpertext">No Image</span>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>

      <Popup isShow={show} onClose={() => setShow(false)}>
        <div className="bg-white w-[500px] rounded-xl px-8 py-10">
          <div className="flex justify-end">
            <div
              onClick={() => setShow(false)}
              className="inline-flex items-center justify-center
                  bg-[#e5e2e2] p-2 rounded-xl cursor-pointer hover:bg-red-400 transition"
            >
              <X size={18} color="#3F434A" />
            </div>
          </div>

          <form onSubmit={handleSave}>
            <div className="flex flex-col mb-9">
              <label className="text-helpertext mb-2.5">Category Name</label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Enter category name"
                className="border border-[#E8E9EB] rounded-xl px-4 py-[15px] outline-0 focus:border-main"
              />
            </div>

            <div className="flex flex-col mb-9">
              <label className="text-helpertext mb-2.5">Category Type</label>
              <select
                name="categoryType"
                value={form.categoryType}
                onChange={handleChange}
                required
                className="border border-[#E8E9EB] rounded-xl px-4 py-[15px] outline-0 focus:border-main"
              >
                <option value="" disabled>
                  Select Category type
                </option>
                <option value="man">Man</option>
                <option value="woman">Woman</option>
              </select>
            </div>

            <div className="flex flex-col mb-12">
              <label className="text-helpertext mb-2.5">Category Image</label>
              <label className="border border-dashed border-[#E8E9EB] rounded-xl h-[150px] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition">
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
                    className="h-full object-contain rounded-xl"
                  />
                ) : (
                  <span className="text-helpertext text-sm">
                    Click to upload image
                  </span>
                )}
              </label>
              <p className="text-xs text-helpertext mt-2">
                {img
                  ? "New image selected"
                  : "Current image will be kept if not changed"}
              </p>
            </div>

            <div className="flex justify-end">
              <ButtonCom
                title="Save"
                type="submit"
              />
            </div>
          </form>
        </div>
      </Popup>
    </div>
  );
};

export default memo(ManCategoryBox);
