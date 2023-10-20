import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setHeaders, url } from "./api";
import { CommentsFromADiscussion, ICommentData } from "@/utils/interface";

const initialState: CommentsFromADiscussion = {
  data: {
    discussion: {
      id: null,
      title: "",
      content: "",
      author_id: null,
      group_id: null,
      createdAt: "",
      Comments: [],
    },
    creator: {
      id: null,
      name: "",
      email: "",
      username: "",
      sex: "",
      profile_picture: "",
      hobbies: "",
      country: "",
    },
  },
  commentStatus: "",
  commentError: "",
};

export const discussionComments = createAsyncThunk<
  ICommentData,
  { groupId: number | null; discussionId: number | null },
  { rejectValue: any }
>(
  "discussion/discussionComments",
  async ({ groupId, discussionId }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${url}/groups/discussions/${groupId}/${discussionId}/comments`,
        setHeaders()
      );
      const { data } = response.data;
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const discussionCommentSlice = createSlice({
  name: "discussionComment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(discussionComments.pending, (state, action) => {
      return {
        ...state,
        commentStatus: "pending",
      };
    });
    builder.addCase(discussionComments.fulfilled, (state, action: any) => {
      if (action.payload) {
        return {
          ...state,
          commentStatus: "success",
          data: action.payload,
        };
      } else {
        return state;
      }
    });
    builder.addCase(discussionComments.rejected, (state, action: any) => {
      return {
        ...state,
        commentStatus: "rejected",
        commentError: action.payload,
      };
    });
  },
});

export default discussionCommentSlice.reducer;
