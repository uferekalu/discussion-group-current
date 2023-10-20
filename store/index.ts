import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import groupReducer from "../slices/groupSlice";
import userReducer from "../slices/userSlice";
import uploadReducer from '../slices/uploadSlice'
import inviteReducer from '../slices/sendInviteSlice'
import discussionReducer from '../slices/createDiscussion'
import deleteNotificationReducer from '../slices/deleteNotificationSlice'
import discussionCommentsReducer from '../slices/commentsFromDiscussion'
import getDiscussionReducer from '../slices/discussionSlice'
import makeCommentDiscussionReducer from '../slices/makeACommentSlice'
import likeADiscussionReducer from '../slices/likeADiscussionSlice'
import dislikeADiscussionReducer from '../slices/dislikeADiscussionSlice'
import replyACommentReducer from '../slices/replyACommentSlice'
import likeACommentReducer from '../slices/likeACommentSlice'
import dislikeACommentReducer from '../slices/dislikeACommentSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    groups: groupReducer,
    user: userReducer,
    upload: uploadReducer,
    invite: inviteReducer,
    discussion: discussionReducer,
    deleteNotification: deleteNotificationReducer,
    discussionComments: discussionCommentsReducer,
    getADiscussion: getDiscussionReducer,
    makeCommentDiscussion: makeCommentDiscussionReducer,
    likeADiscussion: likeADiscussionReducer,
    dislikeADiscussion: dislikeADiscussionReducer,
    replyAComment: replyACommentReducer,
    likeAComment: likeACommentReducer,
    dislikeAComment: dislikeACommentReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
