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
    getProfileStatus: string
    getProfileError: string
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