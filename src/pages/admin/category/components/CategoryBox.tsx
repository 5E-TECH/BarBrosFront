import React, { memo, useState, type FormEvent } from "react";
import PageHeader from "../../../../shared/components/pageHeader";
import { EllipsisVertical, Plus, X } from "lucide-react";
import Popup from "../../../../shared/ui/Popup";
import { useCategory } from "../service/useCategory";
import { BASE_ASSETS_URL } from "../../../../shared/const";
import ButtonCom from "../../../../shared/components/button";
import CategoryLoading from "../../../../shared/components/loadings/categoryLoading";

const initialState = { name: "" };

const CategoryBox = () => {
  const [show, setShow] = useState(false);
  const [img, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "" });

  const [openId, setOpenId] = useState<number | null>(null);

  const { createCategory, getCategory } = useCategory();
  const datas = getCategory?.data?.data || [];

  datas.forEach((element: any) => {
    let imgUrl = element.img;

    if (!/^https?:\/\//.test(imgUrl)) {
      imgUrl = `${BASE_ASSETS_URL}${
        imgUrl.startsWith("/") ? "" : "/"
      }${imgUrl}`;
    }

    element.img = imgUrl;
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    if (img) formData.append("img", img);

    createCategory.mutate(formData, {
      onSuccess: () => {
        setForm(initialState);
        setImage(null);
        setPreview(null);
        setShow(false);
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  if (!datas) {
    return <CategoryLoading />;
  }

  return (
    <div>
      <div className="flex justify-between">
        <PageHeader title="Categories" />
        <button
          onClick={() => setShow(true)}
          className="bg-main flex gap-2.5 text-white rounded-xl px-3 py-4 cursor-pointer font-medium"
        >
          <Plus size={22} /> Add Category
        </button>

        <Popup isShow={show} onClose={() => setShow(false)}>
          <div className="bg-white w-[500px] rounded-xl px-8 py-10">
            <div className="flex justify-end">
              <div
                onClick={() => setShow(false)}
                className="inline-flex items-center justify-center
                  bg-[#e5e2e2] p-2 rounded-xl cursor-pointer hover:bg-red-400"
              >
                <X size={18} color="#3F434A" />
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col mb-9">
                <label className="text-helpertext mb-2.5">Category Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter category name"
                  className="border border-[#E8E9EB] rounded-xl px-4 py-[15px] outline-0"
                />
              </div>

              <div className="flex flex-col mb-12">
                <label className="text-helpertext mb-2.5">Category Image</label>
                <label className="border border-dashed border-[#E8E9EB] rounded-xl h-[150px] flex items-center justify-center cursor-pointer hover:bg-gray-50">
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
              </div>

              <div className="flex justify-end">
                <ButtonCom title="Submit" type="submit" />
              </div>
            </form>
          </div>
        </Popup>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-6">
        {datas.length > 0 &&
          datas.map((data: any) => (
            <div
              key={data.id}
              className="gap-4 bg-white rounded-xl px-4 py-3 border border-gray-100 shadow-sm hover:shadow-md transition cursor-pointer"
            >
              <div className="relative">
                <div
                  onClick={() => setOpenId(openId === data.id ? null : data.id)}
                  className="flex justify-end mb-2 cursor-pointer"
                >
                  <EllipsisVertical size={20} />
                </div>

                {openId === data.id && (
                  <div className="absolute right-0 top-6 z-20 w-32 font-medium bg-white border border-gray-100 rounded-lg shadow-md">
                    <button className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 cursor-pointer">
                      Edit
                    </button>

                    <button className="w-full px-4 py-2 text-sm text-left text-red-500 hover:bg-red-50 cursor-pointer">
                      Delete
                    </button>
                  </div>
                )}
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
    </div>
  );
};

export default memo(CategoryBox);
