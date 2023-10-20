import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setHeaders, url } from "./api";

interface ILikeADiscussion {
  message: string;
  likeADiscussionStatus: string;
  likeADiscussionError: string;
}

const initialState: ILikeADiscussion = {
  message: "",
  likeADiscussionStatus: "",
  likeADiscussionError: "",
};

interface ILikeADiscussionForm {
  discussion_id: number | null;
}

export const likeADiscussion = createAsyncThunk<
  string,
  { data: ILikeADiscussionForm },
  { rejectValue: any }
>("discussion/likeDiscussion", async ({ data }, thunkAPI) => {
  try {
    const response = await axios.post(
      `${url}/groups/discussion/like`,
      {
        discussion_id: data.discussion_id,
      },
      setHeaders()
    );
    const { message } = response.data;
    return message;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const likADiscussionSlice = createSlice({
  name: "likeDiscussion",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(likeADiscussion.pending, (state, action) => {
      return {
        ...state,
        likeADiscussionStatus: "pending",
      };
    });
    builder.addCase(likeADiscussion.fulfilled, (state, action: any) => {
      if (action.payload) {
        return {
          ...state,
          likeADiscussionStatus: "success",
          message: action.payload,
        };
      } else {
        return state;
      }
    });
    builder.addCase(likeADiscussion.rejected, (state, action: any) => {
      return {
        ...state,
        likeADiscussionStatus: "rejected",
        likeADiscussionError: action.payload,
      };
    });
  },
});

export default likADiscussionSlice.reducer;
