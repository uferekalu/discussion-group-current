import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setHeaders, url } from "./api";

interface IDisikeADiscussion {
  message: string;
  dislikeADiscussionStatus: string;
  dislikeADiscussionError: string;
}

const initialState: IDisikeADiscussion = {
  message: "",
  dislikeADiscussionStatus: "",
  dislikeADiscussionError: "",
};

interface IDislikeADiscussionForm {
  discussion_id: number | null;
}

export const dislikeADiscussion = createAsyncThunk<
  string,
  { data: IDislikeADiscussionForm },
  { rejectValue: any }
>("discussion/dislikeDiscussion", async ({ data }, thunkAPI) => {
  try {
    const response = await axios.post(
      `${url}/groups/discussion/dislike`,
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

const dislikADiscussionSlice = createSlice({
  name: "dislikeDiscussion",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(dislikeADiscussion.pending, (state, action) => {
      return {
        ...state,
        dislikeADiscussionStatus: "pending",
      };
    });
    builder.addCase(dislikeADiscussion.fulfilled, (state, action: any) => {
      if (action.payload) {
        return {
          ...state,
          dislikeADiscussionStatus: "success",
          message: action.payload,
          dislikeADiscussionError: ""
        };
      } else {
        return state;
      }
    });
    builder.addCase(dislikeADiscussion.rejected, (state, action: any) => {
      return {
        ...state,
        dislikeADiscussionStatus: "rejected",
        dislikeADiscussionError: action.payload.error,
      };
    });
  },
});

export default dislikADiscussionSlice.reducer;
