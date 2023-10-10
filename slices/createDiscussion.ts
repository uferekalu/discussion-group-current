import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setHeaders, url } from "./api";

interface DiscussionSlice {
  message: string;
  discussionStatus: string;
  discussionError: string;
}

interface IDiscussionForm {
  title: string;
  content: string;
  groupId: number | null;
}

const initialState: DiscussionSlice = {
  message: "",
  discussionStatus: "",
  discussionError: "",
};

export const startDiscussion = createAsyncThunk<
  string,
  { data: IDiscussionForm },
  { rejectValue: any }
>("discussion/createDiscussion", async ({ data }, thunkAPI) => {
  try {
    const result = await axios.post(
      `${url}/groups/create-a-discussion`,
      {
        title: data.title,
        content: data.content,
        groupId: data.groupId,
      },
      setHeaders()
    );
    const { message } = result.data;
    return message;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const startDiscussionSlice = createSlice({
  name: "discussion",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(startDiscussion.pending, (state, action) => {
      return {
        ...state,
        discussionStatus: "pending",
      };
    });
    builder.addCase(startDiscussion.fulfilled, (state, action: any) => {
      if (action.payload) {
        return {
          ...state,
          discussionStatus: "success",
          message: action.payload,
        };
      } else {
        return state;
      }
    });
    builder.addCase(startDiscussion.rejected, (state, action: any) => {
      return {
        ...state,
        discussionStatus: "rejected",
        discussionError: action.payload.error,
      };
    });
  },
});

export default startDiscussionSlice.reducer;
