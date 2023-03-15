import { axiosPrivate } from "../axios";
import { useEffect } from "react";
import useAuth from "./useAuth";

export default function useAxiosPrivate() {
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (err) => Promise.reject(err)
    );
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (err) => {
        console.log("intra in err");
        return Promise.reject(err);
      }
    );
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth]);
  return axiosPrivate;
}
