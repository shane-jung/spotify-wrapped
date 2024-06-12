import { auth } from "@/lib/auth";
import axios from "axios";
import { redirect } from "next/navigation";

const instance = axios.create();

instance.interceptors.request.use(
  async (config) => {
    const session = await auth();
    if (session?.token) {
      config.headers.Authorization = `Bearer ${session?.token.access_token}`;
    } else {
      delete config.headers.Authorization;
      redirect("/login");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
