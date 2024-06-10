import { auth } from "@/auth";
import axios from "axios";
import { redirect } from "next/navigation";

const instance = axios.create();

instance.interceptors.request.use(
  async (config) => {
    const session = await auth();
    // console.log("Session in axios", session);
    if (session?.access_token) {
      config.headers.Authorization = `Bearer ${session?.access_token}`;
    } else {
      delete config.headers.Authorization;
      redirect("/signin");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
