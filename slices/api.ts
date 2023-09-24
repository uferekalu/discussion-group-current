import { getCookie } from "@/utils/utility";

export const url = "http://localhost:5000/api";

export const setHeaders = () => {
  if (getCookie("token") !== null) {
    const headers = {
      headers: {
        "x-auth-token": getCookie("token"),
      },
    };
    return headers;
  }
};
