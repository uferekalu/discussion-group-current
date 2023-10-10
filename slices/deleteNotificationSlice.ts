import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setHeaders, url } from "./api";

interface DeleteNotificationSlice {
  message: string;
  deleteNotificationStatus: string;
  deleteNotificationError: string;
}

const initialState: DeleteNotificationSlice = {
  message: "",
  deleteNotificationStatus: "",
  deleteNotificationError: "",
};

export const deleteNotification = createAsyncThunk<
  string,
  { rejectValue: any }
>("notification/deleteNotification", async (id, thunkAPI) => {
  try {
    const response = await axios.delete(
      `${url}/groups/notifications/:notificationId/${id}`,
      setHeaders()
    );
    const { message } = response.data;
    return message;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const deleteNotificationSlice = createSlice({
  name: "discussion",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteNotification.pending, (state, action) => {
      return {
        ...state,
        deleteNotificationStatus: "pending",
      };
    });
    builder.addCase(deleteNotification.fulfilled, (state, action: any) => {
      if (action.payload) {
        return {
          ...state,
          deleteNotificationStatus: "success",
          message: action.payload,
        };
      } else {
        return state;
      }
    });
    builder.addCase(deleteNotification.rejected, (state, action: any) => {
      return {
        ...state,
        deleteNotificationStatus: "rejected",
        deleteNotificationError: action.payload.error,
      };
    });
  },
});

export default deleteNotificationSlice.reducer;
