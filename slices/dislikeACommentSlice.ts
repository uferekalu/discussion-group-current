import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setHeaders, url } from "./api";

interface IDislikeAComment {
  message: string;
  dislikeACommentStatus: string;
  dislikeACommentError: string;
}

const initialState: IDislikeAComment = {
  message: "",
  dislikeACommentStatus: "",
  dislikeACommentError: "",
};

interface IDislikeACommentForm {
  comment_id: number | null;
}

export const dislikeAComment = createAsyncThunk<
  string,
  { data: IDislikeACommentForm },
  { rejectValue: any }
>("comment/dislikeComment", async ({ data }, thunkAPI) => {
  try {
    const response = await axios.post(
      `${url}/groups/discussion/dislike/reply`,
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

const dislikACommentSlice = createSlice({
  name: "dislikeComment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(dislikeAComment.pending, (state, action) => {
      return {
        ...state,
        dislikeACommentStatus: "pending",
      };
    });
    builder.addCase(dislikeAComment.fulfilled, (state, action: any) => {
      if (action.payload) {
        return {
          ...state,
          dislikeACommentStatus: "success",
          message: action.payload,
          dislikeACommentError: ""
        };
      } else {
        return state;
      }
    });
    builder.addCase(dislikeAComment.rejected, (state, action: any) => {
      return {
        ...state,
        dislikeACommentStatus: "rejected",
        dislikeACommentError: action.payload.error,
      };
    });
  },
});

export default dislikACommentSlice.reducer;
