import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setHeaders, url } from "./api";
import { IMakeComment } from "@/utils/interface";

const initialState: IMakeComment = {
  data: {
    likes: 0,
    dislikes: 0,
    id: null,
    content: "",
    author_id: null,
    discussion_id: null,
    updatedAt: "",
    createdAt: "",
  },
  makeCommentStatus: "",
  makeCommentError: "",
};

interface IMakeCommentForm {
  content: string;
  discussion_id: number | null;
}

export const makeCommentDiscussion = createAsyncThunk<
  IMakeComment,
  { data: IMakeCommentForm },
  { rejectValue: any }
>("comment/makeComment", async ({ data }, thunkAPI) => {
  try {
    const response = await axios.post(
      `${url}/groups/discussion/comment`,
      {
        content: data.content,
        discussion_id: data.discussion_id,
      },
      setHeaders()
    );
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const makeCommentDiscussionSlice = createSlice({
    name: "makeAComment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(makeCommentDiscussion.pending, (state, action) => {
        return {
          ...state,
          makeCommentStatus: "pending",
        };
      });
      builder.addCase(makeCommentDiscussion.fulfilled, (state, action: any) => {
        if (action.payload) {
          return {
            ...state,
            makeCommentStatus: "success",
            data: action.payload,
          };
        } else {
          return state;
        }
      });
      builder.addCase(makeCommentDiscussion.rejected, (state, action: any) => {
        return {
          ...state,
          makeCommentStatus: "rejected",
          makeCommentError: action.payload,
        };
      });
    },
  });
  
  export default makeCommentDiscussionSlice.reducer;
  
