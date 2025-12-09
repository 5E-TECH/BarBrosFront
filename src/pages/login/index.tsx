import { memo, useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import lock from "../../shared/assets/Lock.png";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLogin } from "./service/useLogin";
import { setToken } from "./store/tokenSlice";
import { useDispatch } from "react-redux";
import { useApiNotification } from "../../shared/hooks/useApiNotification";


// Yup schema
const loginSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(5, "Password must be at least 5 characters"),
});

interface ILoginForm {
  username: string;
  password: string;
}

const InitialState: ILoginForm = {
  username: "",
  password: "",
};

const Login = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const {loginUser} = useLogin()
  const dispatch = useDispatch();
  const { handleApiError } = useApiNotification();


  const handleSubmit = (values: ILoginForm) => {
  // DTOga moslab malumot tayyorlash
  const data = {
    email: values.username, // formadagi username -> DTOdagi email
    password: values.password,
  };

  // console.log("Login DTO:", dto);

  loginUser.mutate(data, {
    onSuccess: (res:any) => {
      dispatch(setToken(res?.data));
      navigate("/")
    },
    onError: (err:any) => {
      handleApiError(err, "login yoki parol xato...!!!")      
    }
  })

  // Bu yerda real API chaqiruvi bo'lishi mumkin, masalan:
  // fetch("/api/login", { method: "POST", body: JSON.stringify(dto), headers: { "Content-Type": "application/json" } })

  // Mock login tekshiruvi
  
};

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

          <h1 className="text-[28px] font-medium text-maintext mb-6">Kirish</h1>

          <Formik
            initialValues={InitialState}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                {/* Username */}
                <div className="flex flex-col mb-[27px]">
                  <label
                    htmlFor="username"
                    className="text-helpertext font-normal text-[14px] flex justify-between mb-1.5"
                  >
                    Login
                  </label>
                  <div className="border border-[#E8E9EB] rounded-2xl flex justify-between px-4 py-2.5">
                    <Field
                      type="text"
                      name="username"
                      placeholder="enter name"
                      className="outline-0 w-full"
                    />
                  </div>
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500 text-[12px] mt-1"
                  />
                </div>

                {/* Password */}
                <div className="flex flex-col mb-[27px]">
                  <label
                    htmlFor="password"
                    className="text-helpertext font-normal text-[14px] flex justify-between mb-1.5"
                  >
                    Parol
                  </label>
                  <div className="border border-[#E8E9EB] rounded-2xl flex justify-between px-4 py-2.5">
                    <Field
                      type={show ? "text" : "password"}
                      name="password"
                      placeholder="enter password"
                      className="outline-0 w-full"
                    />
                    <button
                      type="button"
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
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-[12px] mt-1"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-[7px] py-2 font-medium text-[15px] text-white cursor-pointer bg-main hover:bg-mainhover"
                >
                  Kirish
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default memo(Login);
