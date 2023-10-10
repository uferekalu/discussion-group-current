import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import groupReducer from "../slices/groupSlice";
import userReducer from "../slices/userSlice";
import uploadReducer from '../slices/uploadSlice'
import inviteReducer from '../slices/sendInviteSlice'
import discussionReducer from '../slices/createDiscussion'
import deleteNotificationReducer from '../slices/deleteNotificationSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    groups: groupReducer,
    user: userReducer,
    upload: uploadReducer,
    invite: inviteReducer,
    discussion: discussionReducer,
    deleteNotification: deleteNotificationReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
