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
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();
  const { loginUser } = useLogin();
  const dispatch = useDispatch();
  const { handleApiError } = useApiNotification();

  const handleSubmit = (values: ILoginForm) => {
    setDisable(true);
    const data = {
      email: values.username,
      password: values.password,
    };

    loginUser.mutate(data, {
      onSuccess: (res: any) => {
        dispatch(setToken(res?.data));
        navigate("/");
      },
      onError: (err: any) => {
        handleApiError(err, "login yoki parol xato...!!!");
        setDisable(false);
      },
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      {/* Kartochka kengligi mobil uchun 'w-full', paddinglari esa kichraytirildi */}
      <div className="text-center w-full max-w-[600px] rounded-md md:shadow-2xl py-8 md:py-[50px]">
        {/* Ichki padding mobil ekranda kamaytirildi (px-4), desktopda (md:px-[100px]) qoldi */}
        <div className="px-4 md:px-[100px]">
          {/* Doira o'lchami mobil uchun kichraytirildi */}
          <div className="bg-[#F8F8F8] rounded-full flex justify-center items-center mb-[30px] md:mb-[37px] w-40 h-40 md:w-[250px] md:h-[250px] mx-auto">
            <img
              src={lock}
              alt="Lock icon"
              className="object-contain w-20 h-20 md:w-[100px] md:h-[100px]"
            />
          </div>

          <h1 className="text-2xl md:text-[28px] font-medium text-[#3F434A] mb-6">
            Kirish
          </h1>

          <Formik
            initialValues={InitialState}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <div className="flex flex-col mb-5 md:mb-[27px]">
                  <label
                    htmlFor="username"
                    className="text-[#8A9099] font-normal text-[14px] flex justify-between mb-1.5"
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

                <div className="flex flex-col mb-5 md:mb-[27px]">
                  <label
                    htmlFor="password"
                    className="text-[#8A9099] font-normal text-[14px] flex justify-between mb-1.5"
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
                  disabled={disable}
                  type="submit"
                  className="w-full rounded-xl py-3 font-semibold text-base text-white cursor-pointer bg-main transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {disable ? "Yuklanmoqda..." : "Kirish"}
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
