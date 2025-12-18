import React, { memo, useState, type FormEvent } from "react";
import PageHeader from "../../../../shared/components/pageHeader";
import { Dumbbell, Plus, X } from "lucide-react";
import Popup from "../../../../shared/ui/Popup";
import { useCategory } from "../service/useCategory";
import { BASE_ASSETS_URL } from "../../../../shared/const";

const initialState = { name: "" };

const CategoryBox = () => {
  const [show, setShow] = useState(false);
  const [img, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "" });

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
                <button className="bg-main text-white rounded-xl px-4 py-2.5 cursor-pointer">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </Popup>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-6">
        {datas.length > 0 ? (
          datas.map((data: any) => (
            <div
              key={data.id}
              className="flex items-center justify-between gap-4 bg-white rounded-xl px-4 py-3 border border-gray-100 shadow-sm hover:shadow-md transition cursor-pointer"
            >
              <h3 className="text-sm font-semibold text-gray-800 truncate">
                {data.name}
              </h3>
              <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden shrink-0">
                {data.img ? (
                  // <img
                  //   src={data.img}
                  //   alt={data.name}
                  //   className="w-full h-full object-contain"
                  // />
                  <Dumbbell color="blue" size={30}/>
                ) : (
                  <span className="text-xs text-gray-400">No Image</span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-400">
            No categories found
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(CategoryBox);
