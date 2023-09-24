import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setHeaders, url } from "./api";
import {
  AllGroupsObject,
  AllNotifications,
  DiscussionObject,
  GroupDetails,
  GroupSlice,
} from "@/utils/interface";

const initialState: GroupSlice = {
  allGroups: [],
  groupDetails: {
    name: "",
    description: "",
    creator_id: null,
    Group_members: [],
  },
  discussions: [],
  groupStatus: "",
  groupError: "",
  singleGroupStatus: "",
  singleGroupError: "",
  discussionStatus: "",
  discussionError: "",
  joinAGroupResult: "",
  joinAGroupStatus: "",
  joinAGroupError: "",
  createGroup: {
    name: "",
    description: "",
  },
  createGroupStatus: "",
  createGroupError: "",
  allNotifications: [],
  allNotificationsStatus: "",
  allNotificationsError: "",
};

export const allGroups = createAsyncThunk<
  AllGroupsObject[],
  void,
  { rejectValue: any }
>("group/groups", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${url}/groups/all-groups`, setHeaders());
    const { allGroups } = response.data;
    localStorage.setItem("allGroups", JSON.stringify(allGroups));
    allGroups.sort((a: AllGroupsObject, b: AllGroupsObject) => {
      const aCreatedAt = new Date(a.createdAt);
      const bCreatedAt = new Date(b.createdAt);
      return bCreatedAt.getTime() - aCreatedAt.getTime();
    });

    return allGroups;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getAGroup = createAsyncThunk<GroupDetails, { rejectValue: any }>(
  "group/getGroup",
  async (groupId, thunkAPI) => {
    try {
      const response = await axios.get(
        `${url}/groups/single-group/${groupId}`,
        setHeaders()
      );
      const { groupDetails } = response.data;
      localStorage.setItem("aGroup", JSON.stringify(groupDetails));
      return groupDetails;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getAllDiscussionsInAGroup = createAsyncThunk<
  DiscussionObject[],
  { rejectValue: any }
>("group/getAllDiscussions", async (groupId, thunkAPI) => {
  try {
    const response = await axios.get(
      `${url}/groups/discussions/${groupId}`,
      setHeaders()
    );
    const { discussions } = response.data;
    localStorage.setItem("discussions", JSON.stringify(discussions));
    return discussions;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const joinAGroup = createAsyncThunk<string, { rejectValue: any }>(
  "group/joinGroup",
  async (id, thunkAPI) => {
    try {
      const result = await axios.post(
        `${url}/groups/join-a-group/${id}`,
        null,
        setHeaders()
      );
      const { message } = result.data;
      return message;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

interface ICreateForm {
  name: string;
  description: string;
}

export const createAGroup = createAsyncThunk<
  string,
  { data: ICreateForm },
  { rejectValue: any }
>("group/createGroup", async ({ data }, thunkAPI) => {
  try {
    const result = await axios.post(
      `${url}/groups/create-group`,
      {
        name: data.name,
        description: data.description,
      },
      setHeaders()
    );
    const { group } = result.data;
    return group;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getAllNotifications = createAsyncThunk<
  AllNotifications[],
  void,
  { rejectValue: any }
>("group/allNotifications", async (_, thunkAPI) => {
  try {
    const response = await axios.get(
      `${url}/groups/all-notifications`,
      setHeaders()
    );
    const { allNotifications } = response.data;
    allNotifications.sort((a: AllNotifications, b: AllNotifications) => {
      const aCreatedAt = new Date(a.createdAt);
      const bCreatedAt = new Date(b.createdAt);
      return bCreatedAt.getTime() - aCreatedAt.getTime();
    });

    return allNotifications;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(allGroups.pending, (state, action) => {
      return {
        ...state,
        groupStatus: "pending",
      };
    });
    builder.addCase(allGroups.fulfilled, (state, action: any) => {
      if (action.payload) {
        return {
          ...state,
          groupStatus: "success",
          allGroups: action.payload,
        };
      } else {
        return state;
      }
    });
    builder.addCase(allGroups.rejected, (state, action: any) => {
      return {
        ...state,
        groupStatus: "rejected",
        groupError: action.payload,
      };
    });
    builder.addCase(getAGroup.pending, (state, action) => {
      return {
        ...state,
        singleGroupStatus: "pending",
      };
    });
    builder.addCase(getAGroup.fulfilled, (state, action: any) => {
      if (action.payload) {
        return {
          ...state,
          singleGroupStatus: "success",
          groupDetails: action.payload,
        };
      } else {
        return state;
      }
    });
    builder.addCase(getAGroup.rejected, (state, action: any) => {
      return {
        ...state,
        singleGroupStatus: "rejected",
        singleGroupError: action.payload.error,
      };
    });
    builder.addCase(getAllDiscussionsInAGroup.pending, (state, action) => {
      return {
        ...state,
        discussionStatus: "pending",
      };
    });
    builder.addCase(
      getAllDiscussionsInAGroup.fulfilled,
      (state, action: any) => {
        if (action.payload) {
          return {
            ...state,
            discussionStatus: "success",
            discussions: action.payload,
          };
        } else {
          return state;
        }
      }
    );
    builder.addCase(
      getAllDiscussionsInAGroup.rejected,
      (state, action: any) => {
        return {
          ...state,
          discussionStatus: "rejected",
          discussionError: action.payload.error,
        };
      }
    );
    builder.addCase(joinAGroup.pending, (state, action) => {
      return {
        ...state,
        joinAGroupStatus: "pending",
      };
    });
    builder.addCase(joinAGroup.fulfilled, (state, action: any) => {
      if (action.payload) {
        return {
          ...state,
          joinAGroupStatus: "success",
          joinAGroupResult: action.payload,
        };
      } else {
        return state;
      }
    });
    builder.addCase(joinAGroup.rejected, (state, action: any) => {
      return {
        ...state,
        joinAGroupStatus: "rejected",
        joinAGroupError: action.payload,
      };
    });
    builder.addCase(createAGroup.pending, (state, action) => {
      return {
        ...state,
        createGroupStatus: "pending",
      };
    });
    builder.addCase(createAGroup.fulfilled, (state, action: any) => {
      if (action.payload) {
        return {
          ...state,
          createGroupStatus: "success",
          createGroup: action.payload,
        };
      } else {
        return state;
      }
    });
    builder.addCase(createAGroup.rejected, (state, action: any) => {
      return {
        ...state,
        createGroupStatus: "rejected",
        createGroupError: action.payload.error,
      };
    });
    builder.addCase(getAllNotifications.pending, (state, action) => {
      return {
        ...state,
        allNotificationsStatus: "pending",
      };
    });
    builder.addCase(getAllNotifications.fulfilled, (state, action: any) => {
      if (action.payload) {
        return {
          ...state,
          allNotificationsStatus: "success",
          allNotifications: action.payload,
        };
      } else {
        return state;
      }
    });
    builder.addCase(getAllNotifications.rejected, (state, action: any) => {
      return {
        ...state,
        allNotificationsStatus: "rejected",
        allNotificationsError: action.payload.error,
      };
    });
  },
});

export default groupSlice.reducer;
