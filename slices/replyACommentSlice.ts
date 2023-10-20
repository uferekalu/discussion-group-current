import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setHeaders, url } from "./api";
import { IReplyComment } from "@/utils/interface";

const initialState: IReplyComment = {
  data: {
    likes: 0,
    dislikes: 0,
    id: null,
    content: "",
    author_id: null,
    comment_id: null,
    updatedAt: "",
    createdAt: "",
  },
  replyCommentStatus: "",
  replyCommentError: "",
};

interface IReplyCommentForm {
  content: string;
  comment_id: number | null;
}

export const replyAComment = createAsyncThunk<
  IReplyComment,
  { data: IReplyCommentForm },
  { rejectValue: any }
>("comment/replyComment", async ({ data }, thunkAPI) => {
  try {
    const response = await axios.post(
      `${url}/groups/discussion/comment/reply`,
      {
        content: data.content,
        comment_id: data.comment_id,
      },
      setHeaders()
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const replyCommentSlice = createSlice({
  name: "replyComment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(replyAComment.pending, (state, action) => {
      return {
        ...state,
        replyCommentStatus: "pending",
      };
    });
    builder.addCase(replyAComment.fulfilled, (state, action: any) => {
      if (action.payload) {
        return {
          ...state,
          replyCommentStatus: "success",
          data: action.payload,
        };
      } else {
        return state;
      }
    });
    builder.addCase(replyAComment.rejected, (state, action: any) => {
      return {
        ...state,
        replyCommentStatus: "rejected",
        replyCommentError: action.payload,
      };
    });
  },
});

export default replyCommentSlice.reducer;
