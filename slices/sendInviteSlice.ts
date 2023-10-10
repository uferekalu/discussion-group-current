import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setHeaders, url } from "./api";

interface InviteSlice {
  message: string;
  inviteStatus: string;
  inviteError: string;
}

interface IInviteForm {
  username: string;
}

const initialState: InviteSlice = {
  message: "",
  inviteStatus: "",
  inviteError: "",
};

export const sendAnInvite = createAsyncThunk<
  string,
  { id: number | null; data: IInviteForm },
  { rejectValue: any }
>("invite/sendInvite", async ({ id, data }, thunkAPI) => {
  try {
    const result = await axios.post(
      `${url}/groups/send-invitation/${id}`,
      {
        username: data.username,
      },
      setHeaders()
    );
    const { message } = result.data;
    return message;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const inviteSlice = createSlice({
  name: "invite",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sendAnInvite.pending, (state, action) => {
      return {
        ...state,
        inviteStatus: "pending",
      };
    });
    builder.addCase(sendAnInvite.fulfilled, (state, action: any) => {
      if (action.payload) {
        return {
          ...state,
          inviteStatus: "success",
          message: action.payload,
        };
      } else {
        return state;
      }
    });
    builder.addCase(sendAnInvite.rejected, (state, action: any) => {
      return {
        ...state,
        inviteStatus: "rejected",
        inviteError: action.payload,
      };
    });
  },
});

export default inviteSlice.reducer;
