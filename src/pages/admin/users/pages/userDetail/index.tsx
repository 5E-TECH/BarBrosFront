import { memo } from "react";
import PageHeader from "../../../../../shared/components/pageHeader";
import shelby from "../../../../../shared/assets/shelby.png";
// import ButtonCom from "../../../../../shared/components/button";
// import Popup from "../../../../../shared/ui/Popup";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useUsers } from "../../service/useUser";
import DetailsLoading from "../../../../../shared/components/loadings/detailsLoading";

const UserDetail = () => {
  // const [show, setShow] = useState(false);
  // const [form, setForm] = useState({
  //   full_name: "",
  //   phone_number: "",
  // });

  const navigate = useNavigate();

  const { id } = useParams();

  const { getByIdUsers } = useUsers();
  const { data } = getByIdUsers({ id });
  const user = data?.data;

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };

  // const handleSave = () => {
  //   updateUsers.mutate({
  //     id: id!,
  //     data: form,
  //   });
  //   setShow(false);
  //   refetch();
  // };


  if (!data) {
      return <DetailsLoading/>;
    }

  return (
    <div className="flex flex-col gap-6">
      <div
        onClick={() => navigate(-1)}
        className="cursor-pointer flex gap-1 items-center mb-6"
      >
        <ChevronLeft size={30} color="gray"/>
        <PageHeader title="UserDetail" />
      </div>

      <div className="flex gap-12 bg-white px-10 py-9 rounded-2xl dark:bg-[#191a1f]">
        <div className="w-[150px]">
          <img
            src={shelby}
            alt=""
            className="w-[100px] h-[100px] rounded-[50%] mb-3 object-cover"
          />
          <span className="pl-8 text-helpertext font-medium">{user?.role}</span>
        </div>

        <div className="flex flex-col gap-8 w-full mt-8">
          <div className="flex gap-8">
            <div className="flex flex-col w-full">
              <label className="text-helpertext text-[16px] font-medium pb-1">
                FullName:
              </label>
              <span className="flex justify-between text-maintext text-[16px] font-medium border border-[#E8E9EB] px-8 py-3 rounded-[15px] dark:border-[#30333c]">
                {user?.full_name}
              </span>
            </div>

            <div className="flex flex-col w-full">
              <label className="text-helpertext text-[16px] font-medium pb-1">
                Phone Number:
              </label>
              <span className="flex justify-between text-maintext text-[16px] font-medium border border-[#E8E9EB] px-8 py-3 rounded-[15px] dark:border-[#30333c]">
                {user?.phone_number}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* <Popup isShow={show} onClose={() => setShow(false)}>
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

          <form action="">
            <div className="flex flex-col mb-9">
              <label htmlFor="" className="text-helpertext mb-2.5">
                FullName
              </label>
              <input
                type="text"
                name="full_name"
                id=""
                value={form.full_name}
                onChange={handleChange}
                placeholder="Enter name"
                className="border border-[#E8E9EB] rounded-xl px-4 py-[15px] outline-0"
              />
            </div>
            <div className="flex flex-col mb-9">
              <label htmlFor="" className="text-helpertext mb-2.5">
                Surname
              </label>
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter surname"
                className="border border-[#E8E9EB] rounded-xl px-4 py-[15px] outline-0"
              />
            </div>
            <div className="flex flex-col mb-9">
              <label htmlFor="" className="text-helpertext mb-2.5">
                Phone Number
              </label>
              <input
                type="text"
                name="phone_number"
                id=""
                value={form.phone_number}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="border border-[#E8E9EB] rounded-xl px-4 py-[15px] outline-0"
              />
            </div>
            <div className="flex flex-col mb-9">
              <label htmlFor="" className="text-helpertext mb-2.5">
                Login
              </label>
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter login"
                className="border border-[#E8E9EB] rounded-xl px-4 py-[15px] outline-0"
              />
            </div>
            <div className="flex flex-col mb-9">
              <label htmlFor="" className="text-helpertext mb-2.5">
                Password
              </label>
              <input
                type="number"
                name=""
                id=""
                placeholder="Enter password"
                className="border border-[#E8E9EB] rounded-xl px-4 py-[15px] outline-0"
              />
            </div>
            <div onClick={() => handleSave()} className="flex justify-end">
              <ButtonCom title="Save" />
            </div>
          </form>
        </div>
      </Popup> */}
    </div>
  );
};

export default memo(UserDetail);
