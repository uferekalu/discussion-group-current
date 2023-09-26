import { UploadImage } from "@/utils/interface";
import {
    createAsyncThunk,
    createSlice,
  } from "@reduxjs/toolkit";
  import axios from "axios";
import { setHeaders, url } from "./api";
  
  const initialState: UploadImage = {
    uploadPath: "",
    uploadStatus: "",
    uploadError: "",
  };
  
  interface IUploadImg {
    profilePicture: ArrayBuffer;
  }
  
  export const uploadImage = createAsyncThunk<
    string,
    FormData,
    { rejectValue: any }
  >("user/uploadImg", async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${url}/users/upload-profile-picture`,
        data,
        setHeaders()
      );
      const { uploadPath } = response.data;
      return uploadPath;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  });
  
  const uploadSlice = createSlice({
    name: "upload",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(uploadImage.pending, (state, action) => {
        return {
          ...state,
          uploadStatus: "pending",
        };
      });
      builder.addCase(uploadImage.fulfilled, (state, action: any) => {
        if (action.payload) {
          return {
            ...state,
            uploadStatus: "success",
            uploadPath: action.payload,
          };
        } else {
          return state;
        }
      });
      builder.addCase(uploadImage.rejected, (state, action: any) => {
        return {
          ...state,
          uploadStatus: "rejected",
          uploadError: action.payload.error,
        };
      });
    },
  });
  
  export default uploadSlice.reducer;
  