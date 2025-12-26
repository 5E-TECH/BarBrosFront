import React, { memo, useState, type FC, type FormEvent } from "react";
import { useCategory } from "./service/useCategory";
import PageHeader from "../../../shared/components/pageHeader";
import { Plus, X } from "lucide-react";
import Popup from "../../../shared/ui/Popup";
import ButtonCom from "../../../shared/components/button";
import ManCategoryBox from "./components/ManCategoryBox";
import WomanCategoryBox from "./components/WomanCategoryBox";

type CategoryType = "man" | "woman";

interface FormState {
  name: string;
  categoryType: CategoryType | "";
}

const initialState: FormState = { name: "", categoryType: "" };

const Categories: FC = () => {
  const [show, setShow] = useState(false);
  const [img, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(initialState);
  const [disable, setDisable] = useState(false);

  const { createCategory } = useCategory();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisable(true);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("categoryType", form.categoryType);
    if (img) formData.append("img", img);

    createCategory.mutate(formData, {
      onSuccess: () => {
        setForm(initialState);
        setImage(null);
        setPreview(null);
        setShow(false);
        setDisable(false);
      },
      onError: () => {
        setDisable(false);
      },
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div className="flex justify-between mb-15">
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

              <div className="flex flex-col mb-9">
                <label className="text-helpertext mb-2.5">Category Type</label>
                <select
                  name="categoryType"
                  value={form.categoryType}
                  onChange={handleChange}
                  required
                  className="border border-[#E8E9EB] rounded-xl px-4 py-[15px] outline-0"
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
                <ButtonCom title="Submit" type="submit" disabled={disable} />
              </div>
            </form>
          </div>
        </Popup>
      </div>

      <div className="px-4 py-5 rounded-2xl bg-gray-100 shadow-md mb-11">
        <h1 className="text-2xl font-bold pb-2 text-gray-700">Man</h1>
        <ManCategoryBox />
      </div>
      <div className="px-4 py-5 rounded-2xl bg-orange-50 shadow-md">
        <h1 className="text-2xl font-bold pb-2 text-gray-700">Woman</h1>
        <WomanCategoryBox/>
      </div>
    </div>
  );
};

export default memo(Categories);
