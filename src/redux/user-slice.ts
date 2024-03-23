import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type User = {
  email: string;
  emailVerified: boolean;
  extensionInstalled: boolean;
  firstName: string;
  lastName: string;
  picture: string;
  personaSynced: 'pending' | 'skipped' | 'done';
  pastComments: string[];
  followers: number;
  profileVerified: boolean;
  headline: string;
  connectionsCount: number;
};
type InitialState = {
  value: null | User;
};
const initialState: InitialState = {
  value: null,
};

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: () => {
      return initialState;
    },
    login: (state, action: PayloadAction<User>) => {
      return {
        value: action.payload,
      };
    },
  },
});

export const { login, logout } = user.actions;
export default user.reducer;
