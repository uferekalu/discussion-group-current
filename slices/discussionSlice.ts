import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setHeaders, url } from "./api";
import { IDiscussion } from "@/utils/interface";

const initialState: IDiscussion = {
  data: {
    id: null,
    title: "",
    content: "",
    author_id: null,
    group_id: null,
    createdAt: "",
    updatedAt: "",
  },
  discussionStatus: "",
  discussionError: "",
};

export const getADiscussion = createAsyncThunk<IDiscussion, { rejectValue: any }>(
  "discussion/discussion",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `${url}/groups/discussion/${id}`,
        setHeaders()
      );
      console.log("the discussion", response.data)
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const discussionSlice = createSlice({
  name: "discussion",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getADiscussion.pending, (state, action) => {
      return {
        ...state,
        discussionStatus: "pending",
      };
    });
    builder.addCase(getADiscussion.fulfilled, (state, action: any) => {
      if (action.payload) {
        return {
          ...state,
          discussionStatus: "success",
          data: action.payload,
        };
      } else {
        return state;
      }
    });
    builder.addCase(getADiscussion.rejected, (state, action: any) => {
      return {
        ...state,
        discussionStatus: "rejected",
        discussionError: action.payload,
      };
    });
  },
});

export default discussionSlice.reducer;
