export interface AuthUser {
  id: number | null;
  name: string;
  email: string;
  username: string;
  profile_picture: string;
  country: string;
  sex: string;
  hobbies: string;
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  registerStatus: string;
  registerError: string;
  loginStatus: string;
  loginError: string;
  getProfileStatus: string;
  getProfileError: string;
}
export interface LoginResponse {
  data: AuthUser;
  token: string;
}
export interface ProfileResponse {
  message: string;
  userDetails: AuthUser;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface DecodedUser {
  id: number;
  name: string;
  email: string;
  username: string;
  profile_picture: string;
  country: string;
  sex: string;
  hobbies: string;
}

export interface IRegisterForm {
  name: string;
  email: string;
  username: string;
  password: string;
  country?: string;
  sex?: string;
  hobbies?: string;
}

export interface DecodedJWT {
  id: string;
  name: string;
  email: string;
  username: string;
  profile_picture: string;
  country: string;
  sex: string;
  hobbies: string;
}

export interface discussionObj {
  id: number;
  title: string;
  content: string;
  author_id: number;
  group_id: number;
  createdAt: string;
  updatedAt: string;
}

export interface GroupSlice {
  allGroups: AllGroupsObject[];
  groupDetails: GroupDetails;
  discussions: DiscussionObject[];
  groupStatus: string;
  groupError: string;
  singleGroupStatus: string;
  singleGroupError: string;
  discussionStatus: string;
  discussionError: string;
  joinAGroupResult: string;
  joinAGroupStatus: string;
  joinAGroupError: string;
  createGroup: {
    name: string;
    description: string;
  };
  createGroupStatus: string;
  createGroupError: string;
  allNotifications: AllNotifications[];
  allNotificationsStatus: string;
  allNotificationsError: string;
}

export interface GroupMemberObject {
  user_id: number;
  User: UserObject;
}

export interface GroupDetails {
  name: string;
  description: string;
  creator_id: number | null;
  Group_members: GroupMemberObject[];
}

export interface AllGroupsObject {
  id: number;
  name: string;
  description: string;
  creator_id: number;
  creatorName: string;
  username: string;
  profile_picture: string;
  createdAt: string;
  allUsers: string[];
  allDiscussions: discussionObj[];
}

export interface AllNotifications {
  id: number;
  sender: string;
  group: string;
  discussion: string | null;
  content: string;
  message: string;
  status: string;
  createdAt: string;
}
export interface UserObject {
  name: string;
  email: string;
  username: string;
  profile_picture: string;
  country: string;
  sex: string;
  hobbies: string;
}

export interface DiscussionCommentObject {
  content: string;
  author_id: number;
  discussion_id: number;
  likes: number;
  dislikes: number;
  User: UserObject;
}

export interface DiscussionObject {
  id: number | null;
  title: string;
  content: string;
  author_id: number | null;
  Comments: DiscussionCommentObject[];
}

export interface RenderItemProps {
  startIndex: number;
  endIndex: number;
}

export interface UserObject {
  name: string;
  email: string;
  username: string;
  profile_picture: string;
  country: string;
  sex: string;
  hobbies: string;
}

export interface User {
  users: UserObject[];
  userDetails: UserObject;
  userStatus: string;
  userError: string;
  userUpdateStatus: string;
  userUpdateError: string;
  userUpdateMessage: string;
  allUsersStatus: string;
  allUsersError: string;
}

export interface UploadImage {
  uploadPath: string;
  uploadStatus: string;
  uploadError: string;
}

export interface UserUpdateData {
  name: string;
  email: string;
  username: string;
  country: string;
  sex: string;
  hobbies: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface DeleteNotificationSlice {
  message: string;
  deleteNotificationStatus: string;
  deleteNotificationError: string;
}

export interface IReplies {
  id: number;
  content: string;
  author_id: number;
  comment_id: number;
  likes: number;
  dislikes: number;
  createdAt: string
  User: UserObject;
}

export interface IComment {
  id: number | null;
  content: string;
  author_id: number | null;
  discussion_id: number | null;
  likes: number;
  dislikes: number;
  createdAt: string
  User: UserObject;
  Replies: IReplies[];
}

export interface ICommentData {
  discussion: {
    id: number | null;
    title: string;
    content: string;
    author_id: number | null;
    group_id: number | null;
    createdAt: string;
    Comments: IComment[];
  };
  creator: {
    id: number | null;
    name: string;
    email: string;
    username: string;
    sex: string;
    profile_picture: string;
    hobbies: string;
    country: string;
  };
}

export interface CommentsFromADiscussion {
  data: ICommentData;
  commentStatus: string;
  commentError: string;
}

export interface IDiscussionObj {
  id: number | null;
  title: string;
  content: string;
  author_id: number | null;
  group_id: number | null;
  createdAt: string;
  updatedAt: string;
}
export interface IDiscussion {
  data: IDiscussionObj
  discussionStatus: string
  discussionError: string
}

export interface IMakeCommentObj {
  likes: number
  dislikes: number
  id: number | null
  content: string
  author_id: number | null,
  discussion_id: number | null,
  updatedAt: string
  createdAt: string
}
export interface IMakeComment {
  data: IMakeCommentObj
  makeCommentStatus: string
  makeCommentError: string
}

export interface IReplyCommentObj {
  likes: number
  dislikes: number
  id: number | null
  content: string
  author_id: number | null,
  comment_id: number | null,
  updatedAt: string
  createdAt: string
}

export interface IReplyComment {
  data: IReplyCommentObj
  replyCommentStatus: string
  replyCommentError: string
}