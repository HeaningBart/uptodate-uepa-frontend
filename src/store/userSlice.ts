import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types";

export interface UserState {
  user: User | undefined;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  user: undefined,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState as UserState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      return { isLoggedIn: true, user: action.payload };
    },
    logOut: () => ({ isLoggedIn: false, user: undefined }),
  },
});

export const { logOut, setUser } = userSlice.actions;
export default userSlice.reducer;
