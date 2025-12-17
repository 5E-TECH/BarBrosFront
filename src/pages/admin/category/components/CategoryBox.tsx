import React, { memo, useState, type FormEvent } from "react";
import PageHeader from "../../../../shared/components/pageHeader";
import { Plus, X } from "lucide-react";
import Popup from "../../../../shared/ui/Popup";
import { useCategory } from "../service/useCategory";

const initialState = {
  name: "",
};

const CategoryBox = () => {
  const [show, setShow] = useState(false);
  const [_image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [form, setForm] = useState({name: ""});

  const { createCategory } = useCategory()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newUser = { ...form };

    createCategory.mutate(newUser, {
      onSuccess: () => {
        setForm(initialState);
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex justify-between">
      <PageHeader title="Categories"/>
      <div>
        <button
          onClick={() => setShow(true)}
          className="bg-main flex gap-2.5 text-white rounded-xl px-3 py-4 cursor-pointer font-medium"
        >
          <Plus size={22} />
          Add Category
        </button>
      </div>

      <Popup isShow={show} onClose={() => setShow(false)}>
        <div className="bg-white w-[500px] rounded-xl px-8 py-10">
          <div className="flex justify-end">
            <div
              onClick={() => setShow(false)}
              className="inline-flex items-center justify-center
               bg-[#e5e2e2] p-2 rounded-xl
               cursor-pointer hover:bg-red-400"
            >
              <X size={18} color="#3F434A" />
            </div>
          </div>

          <form action="" onSubmit={handleSubmit}>
            <div className="flex flex-col mb-9">
              <label htmlFor="" className="text-helpertext mb-2.5">
                Category Name
              </label>
              <input
                type="text"
                name=""
                id=""
                value={form.name}
                onChange={handleChange}
                placeholder="Enter category name"
                className="border border-[#E8E9EB] rounded-xl px-4 py-[15px] outline-0"
              />
            </div>

            <div className="flex flex-col mb-12">
              <label className="text-helpertext mb-2.5">Category Image</label>

              <label
                className="border border-dashed border-[#E8E9EB]
               rounded-xl h-[150px]
               flex items-center justify-center
               cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />

                {!preview ? (
                  <span className="text-helpertext text-sm">
                    Click to upload image
                  </span>
                ) : (
                  <img
                    src={preview}
                    alt="preview"
                    className="h-full object-contain rounded-xl"
                  />
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
  );
};

export default memo(CategoryBox);
