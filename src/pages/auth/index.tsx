import { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../../app/store";
import { api } from "../../shared/api";
import { setToken } from "../login/store/tokenSlice";
import { setRole } from "./store/roleSlice";
const Auth = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.authSlice.token);
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get("admin/my-account") // 🔑 backendda token tekshirish
      .then((res:any) => {
        setValid(true); 
        dispatch(setRole(res?.data?.data?.role))        
      })
      .catch(() => {
        dispatch(setToken(null)); // ❌ noto‘g‘ri token → localStorage va reduxdan o‘chir
        setValid(false);
      })
      .finally(() => setLoading(false));
  }, [token, dispatch]);

  if (loading)
    return (
      <div>
        Loading...
      </div>
    );

  return valid ? <Outlet /> : <Navigate replace to="/login" />;
};

export default memo(Auth);
