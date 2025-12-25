import { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../../app/store";
import { api } from "../../shared/api";
import { setToken } from "../login/store/tokenSlice";
import { setRole } from "./store/roleSlice";
import Suspense from "../../shared/ui/Suspensee";
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
      .get("admin/my-account") 
      .then((res:any) => {
        setValid(true); 
        dispatch(setRole(res?.data?.data?.role))        
      })
      .catch(() => {
        dispatch(setToken(null)); 
        setValid(false);
      })
      .finally(() => setLoading(false));
  }, [token, dispatch]);

  if (loading)
    return (
      <div>
        <Suspense/>
      </div>
    );

  return valid ? <Outlet /> : <Navigate replace to="/login" />;
};

export default memo(Auth);
