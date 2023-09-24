import {
  createAsyncThunk,
  createSlice,
  SerializedError,
  PayloadAction,
} from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { setHeaders, url } from "./api";
import cookie from "cookie";
import {
  AuthState,
  AuthUser,
  DecodedUser,
  ILoginForm,
  IRegisterForm,
  LoginResponse,
  ProfileResponse,
} from "@/utils/interface";
import { Reusables } from "@/utils/Reusables";
import { getCookie, setCookie } from "@/utils/utility";

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  getProfileStatus: "",
  getProfileError: "",
};

export const registerUser = createAsyncThunk<
  string,
  IRegisterForm,
  { rejectValue: any }
>("auth/register", async (credentials, thunkAPI) => {
  try {
    const token = await axios.post(`${url}/users/register`, {
      name: credentials.name,
      email: credentials.email,
      username: credentials.username,
      password: credentials.password,
      country: credentials.country,
      sex: credentials.sex,
      hobbies: credentials.hobbies,
    });
    console.log(token.data.user);
    return token.data.user;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const login = createAsyncThunk<
  LoginResponse,
  ILoginForm,
  { rejectValue: any }
>("auth/login", async (credentials, thunkAPI) => {
  try {
    const response = await axios.post(`${url}/users/login`, {
      email: credentials.email,
      password: credentials.password,
    });
    const { data, token } = response.data;
    // Store the token in a secure cookie
    if (token) {
      // Store the token in a secure cookie
      setCookie("token", token, { maxAge: 60 * 60 * 24 * 7 });
      return { data, token };
    } else {
      // Handle the case where the token is not present in the response
      console.error("Token not found in the response.");
      return thunkAPI.rejectWithValue("Token not found in the response.");
    }
    return { data, token };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export function logout() {
  // Clear the token from the cookie
  document.cookie = cookie.serialize("token", "", {
    sameSite: "strict",
    secure: true,
    expires: new Date(0),
    path: "/",
  });
}

export const getUserProfile = createAsyncThunk<AuthUser, { rejectValue: any }>(
  "group/getGroup",
  async (thunkAPI) => {
    try {
      const token: string | null = getCookie("token");
      if (token) {
        const decodedToken: AuthUser = jwtDecode(token);
        const userId = decodedToken.id;
        const response = await axios.get(
          `${url}/users/user-details/${userId}`,
          setHeaders()
        );
        const { userDetails } = response.data;
        return userDetails;
      }
    } catch (error: any) {
      return thunkAPI.rejectValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser(state, action: PayloadAction<{ data: AuthUser; token: string }>) {
      const { data, token } = action.payload;
      state.user = data;
      state.token = token;
      state.isAuthenticated = true;
    },
    logoutUser(state) {
      setCookie("token", "", { expires: "Thu, 01, Jan 1970 00:00:00 GMT" });
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    setUser(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      return {
        ...state,
        registerStatus: "pending",
      };
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          registerStatus: "success",
        };
      } else {
        return state;
      }
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          registerStatus: "rejected",
          registerError: `${action.payload.error}`,
        };
      } else {
        return {
          ...state,
          registerStatus: "rejected",
          registerError: "An error occurred",
        };
      }
    });
    builder.addCase(login.pending, (state, action) => {
      return {
        ...state,
        loginStatus: "pending",
      };
    });
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload.token) {
        const user: DecodedUser = jwtDecode(action.payload.token);
        return {
          ...state,
          user: user,
          token: action.payload.token,
          loginStatus: "success",
          isAuthenticated: true,
        };
      } else {
        return {
          ...state,
          // loginStatus: "rejected",
          // isAuthenticated: false,
          // loginError: "An error occurred",
        };
      }
    });
    builder.addCase(login.rejected, (state, action: any) => {
      return {
        ...state,
        loginStatus: "rejected",
        isAuthenticated: false,
        loginError: action.payload.error,
      };
    });
    builder.addCase(getUserProfile.pending, (state, action) => {
      return {
        ...state,
        getProfileStatus: "pending",
      };
    });
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          ...state,
          user: action.payload,
          getProfileStatus: "success",
        };
      } else {
        return state;
      }
    });
    builder.addCase(getUserProfile.rejected, (state, action: any) => {
      if (action.payload) {
        return {
          ...state,
          user: null,
          getProfileStatus: "rejected",
          getProfileError: action.payload.error,
        };
      } else {
        return {
          ...state,
          user: null,
          getProfileStatus: "rejected",
          getProfileError: "An error occurred",
        };
      }
    });
  },
});

export const { loginUser, logoutUser, setUser } = authSlice.actions;
export default authSlice.reducer;
