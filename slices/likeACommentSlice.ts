import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setHeaders, url } from "./api";

interface ILikeAComment {
  message: string;
  likeACommentStatus: string;
  likeACommentError: string;
}

const initialState: ILikeAComment = {
  message: "",
  likeACommentStatus: "",
  likeACommentError: "",
};

interface ILikeACommentForm {
  comment_id: number | null;
}

export const likeAComment = createAsyncThunk<
  string,
  { data: ILikeACommentForm },
  { rejectValue: any }
>("comment/likeComment", async ({ data }, thunkAPI) => {
  try {
    const response = await axios.post(
      `${url}/groups/discussion/like/reply`,
      {
        comment_id: data.comment_id,
      },
      setHeaders()
    );
    const { message } = response.data;
    return message;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const likACommentSlice = createSlice({
  name: "likeComment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(likeAComment.pending, (state, action) => {
      return {
        ...state,
        likeACommentStatus: "pending",
      };
    });
    builder.addCase(likeAComment.fulfilled, (state, action: any) => {
      if (action.payload) {
        return {
          ...state,
          likeACommentStatus: "success",
          message: action.payload,
        };
      } else {
        return state;
      }
    });
    builder.addCase(likeAComment.rejected, (state, action: any) => {
      return {
        ...state,
        likeACommentStatus: "rejected",
        likeACommentError: action.payload,
      };
    });
  },
});

export default likACommentSlice.reducer;
