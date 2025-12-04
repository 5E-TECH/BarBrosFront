import { memo, useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import lock from "../../shared/assets/Lock.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate()

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center w-[600px] rounded-md shadow-2xl py-[50px]">
        <div className="px-[100px]">
          <div className="bg-[#F8F8F8] rounded-full flex justify-center items-center mb-[37px] w-[250px] h-[250px] mx-auto">
            <img
              src={lock}
              alt="Lock icon"
              className="object-contain w-[100px] h-[100px]"
            />
          </div>

          <h1 className="text-[28px] font-medium text-maintext">Kirish</h1>
          <div>
            <div className="flex flex-col mb-[27px]">
              <label
                htmlFor=""
                className="text-helpertext font-normal text-[14px] flex justify-between mb-[6px]"
              >
                Login
              </label>
              <div className="border border-[#E8E9EB] rounded-2xl flex justify-between px-[16px] py-[10px]">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="enter name"
                  className="outline-0"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col mb-[27px]">
              <label
                htmlFor=""
                className="text-helpertext font-normal text-[14px] flex justify-between mb-[6px]"
              >
                Parol
              </label>
              <div className="border border-[#E8E9EB] rounded-2xl flex justify-between px-[16px] py-[10px]">
                <input
                  type={show ? "text" : "password"}
                  name=""
                  id=""
                  placeholder="enter password"
                  className="outline-0"
                  required
                />
                <button
                  onClick={() => setShow(!show)}
                  className="cursor-pointer"
                >
                  {show ? (
                    <EyeClosed size={20} color="#3F434A" />
                  ) : (
                    <Eye size={20} color="#3F434A" />
                  )}
                </button>
              </div>
            </div>
            <button onClick={() => navigate("/")} className="w-full rounded-[7px] py-[8px] font-medium text-[15px] text-white cursor-pointer bg-main hover:bg-mainhover">
              Kirish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Login);
