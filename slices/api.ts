import { Reusables } from "@/utils/Reusables";

export const url = "http://localhost:5000/api";

export const setHeaders = () => {
  const { getCookie } = Reusables();
  if (getCookie("token") !== null) {
    const headers = {
      headers: {
        "x-auth-token": getCookie("token"),
      },
    };
    return headers;
  }
};
