import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setHeaders, url } from "./api";
import { User, UserObject } from "@/utils/interface";

const initialState: User = {
  users: [],
  userDetails: {
    name: "",
    username: "",
    email: "",
    profile_picture: "",
    country: "",
    sex: "",
    hobbies: "",
  },
  userStatus: "",
  userError: "",
  userUpdateStatus: "",
  userUpdateMessage: "",
  userUpdateError: "",
  allUsersStatus: "",
  allUsersError: "",
};

interface IUpdateForm {
  name: string;
  email: string;
  username: string;
  country?: string;
  sex?: string;
  hobbies?: string;
}

export const getUserDetails = createAsyncThunk<User, { rejectValue: any }>(
  "user/getUser",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `${url}/users/user-details/${id}`,
        setHeaders()
      );
      const { userDetails } = response.data;
      return userDetails;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk<
  string,
  { id: number; data: IUpdateForm },
  { rejectValue: any }
>("user/updateUser", async ({ id, data }, thunkAPI) => {
  try {
    const result = await axios.put(
      `${url}/users/user-update/${id}`,
      {
        name: data.name,
        email: data.email,
        username: data.username,
        country: data.country,
        sex: data.sex,
        hobbies: data.hobbies,
      },
      setHeaders()
    );
    const { userData } = result.data;
    return userData;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getAllUsers = createAsyncThunk<UserObject[],
  void,
  { rejectValue: any }
>(
  "user/getUsers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${url}/users/users`,
        setHeaders()
      );
      const { users } = response.data;
      return users;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserDetails.pending, (state, action) => {
      return {
        ...state,
        userStatus: "pending",
      };
    });
    builder.addCase(getUserDetails.fulfilled, (state, action: any) => {
      if (action.payload) {
        return {
          ...state,
          userStatus: "success",
          userDetails: action.payload,
        };
      } else {
        return state;
      }
    });
    builder.addCase(getUserDetails.rejected, (state, action: any) => {
      return {
        ...state,
        userStatus: "rejected",
        userError: action.payload,
      };
    });
    builder.addCase(updateUser.pending, (state, action) => {
      return {
        ...state,
        userUpdateStatus: "pending",
      };
    });
    builder.addCase(updateUser.fulfilled, (state, action: any) => {
      if (action.payload) {
        return {
          ...state,
          userUpdateStatus: "success",
          userUpdateMessage: "User updated successfully!",
          userDetails: action.payload,
        };
      } else {
        return state;
      }
    });
    builder.addCase(updateUser.rejected, (state, action: any) => {
      return {
        ...state,
        userUpdateStatus: "rejected",
        userUpdateError: action.payload,
      };
    });
    builder.addCase(getAllUsers.pending, (state, action) => {
      return {
        ...state,
        allUsersStatus: "pending",
      };
    });
    builder.addCase(getAllUsers.fulfilled, (state, action: any) => {
      if (action.payload) {
        return {
          ...state,
          allUsersStatus: "success",
          users: action.payload,
        };
      } else {
        return state;
      }
    });
    builder.addCase(getAllUsers.rejected, (state, action: any) => {
      return {
        ...state,
        allUsersStatus: "rejected",
        allUsersError: action.payload,
      };
    });
  },
});

export default userSlice.reducer;
