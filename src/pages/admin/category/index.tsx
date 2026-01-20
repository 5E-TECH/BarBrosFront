import React, { memo, useState, type FC, type FormEvent } from "react";
import { useCategory } from "./service/useCategory";
import PageHeader from "../../../shared/components/pageHeader";
import { Plus, X } from "lucide-react";
import Popup from "../../../shared/ui/Popup";
import ButtonCom from "../../../shared/components/button";
import ManCategoryBox from "./components/ManCategoryBox";
import WomanCategoryBox from "./components/WomanCategoryBox";
import { Outlet, useOutlet } from "react-router-dom";

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { createCategory } = useCategory();

  const outlet = useOutlet();
  const showTable = !outlet;

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
      onError: (error: any) => {
        setDisable(false);
        const errorMes =
          error?.response?.data?.message ||
          "Something went wrong. Please try again.";
        setErrorMessage(errorMes);
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
      {showTable && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 md:mb-15">
          <PageHeader title="Categories" />
          <button
            onClick={() => setShow(true)}
            className="w-full sm:w-auto bg-main flex items-center justify-center gap-2.5 text-white rounded-xl px-5 py-4 cursor-pointer font-medium hover:opacity-90 transition"
          >
            <Plus size={22} /> Add Category
          </button>

          <Popup isShow={show} onClose={() => setShow(false)}>
            <div className="bg-white w-[92vw] max-w-[450px] rounded-2xl px-5 md:px-8 py-7 md:py-10 dark:bg-[#1f222b] dark:text-white shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg md:text-xl font-bold">New Category</h3>
                <div
                  onClick={() => setShow(false)}
                  className="inline-flex items-center justify-center bg-gray-100 dark:bg-gray-800 p-2 rounded-xl cursor-pointer hover:bg-red-400 group transition"
                >
                  <X
                    size={18}
                    className="text-gray-600 dark:text-gray-300 group-hover:text-white"
                  />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 md:space-y-7">
                <div className="flex flex-col">
                  <label className="text-helpertext text-md mb-2 font-medium">
                    Category Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter category name"
                    className="border border-[#E8E9EB] rounded-xl px-4 py-3.5 outline-0 focus:border-main dark:border-gray-700 w-full"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-helpertext text-md mb-2 font-medium">
                    Category Type
                  </label>
                  <div className="relative">
                    <select
                      name="categoryType"
                      value={form.categoryType}
                      onChange={handleChange}
                      required
                      className="appearance-none border border-[#E8E9EB] rounded-xl px-4 py-3.5 outline-0 focus:border-main dark:border-gray-700 w-full cursor-pointer pr-10"
                    >
                      <option value="" disabled>
                        Select Category type
                      </option>
                      <option value="man" className="dark:bg-gray-700">
                        Man
                      </option>
                      <option value="woman" className="dark:bg-gray-700">
                        Woman
                      </option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-helpertext text-md mb-2 font-medium">
                    Category Image
                  </label>
                  <label className="border-2 border-dashed border-[#E8E9EB] rounded-2xl h-[120px] md:h-[150px] flex items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-[#24262d] dark:border-gray-700 transition overflow-hidden">
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
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-1">
                        <Plus size={24} className="text-gray-400" />
                        <span className="text-helpertext text-xs">
                          Upload Image
                        </span>
                      </div>
                    )}
                  </label>
                </div>
                <p className="text-red-500 text-[14px]">{errorMessage}</p>

                <div className="flex justify-end pt-2">
                  <ButtonCom title="Submit" type="submit" disabled={disable} />
                </div>
              </form>
            </div>
          </Popup>
        </div>
      )}

      {showTable && (
        <div className="flex flex-col gap-6 md:gap-11">
          <div className="px-4 py-5 rounded-2xl shadow-sm dark:bg-[#191a1f]">
            <h1 className="text-xl md:text-2xl font-bold pb-4 text-gray-700 dark:text-white mb-4">
              Man
            </h1>
            <ManCategoryBox />
          </div>

          <div className="px-4 py-5 rounded-2xl shadow-sm dark:bg-[#191a1f]">
            <h1 className="text-xl md:text-2xl font-bold pb-4 text-gray-700 dark:text-white mb-4">
              Woman
            </h1>
            <WomanCategoryBox />
          </div>
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default memo(Categories);
