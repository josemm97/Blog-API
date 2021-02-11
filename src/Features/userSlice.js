import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
// A name, used in action types
  name: 'user',
  // The initial state for the reducer
  initialState: {
    isSingedIn: false,
    userData: null,
    searchInput: null,
    blogData: null,
  },
  reducers: {
    setSignedIn: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.isSingedIn = action.payload;
    },
    setUserData: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.userData = action.payload;
    },
    setSearchInput: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.searchInput = action.payload;
    },
    setBlogData: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.blogData = action.payload;
    },
  },
});

export const {
  setSignedIn, setUserData, setSearchInput, setBlogData,
} = userSlice.actions;

export const selectSingedIn = (state) => state.user.isSingedIn;
export const selectUserData = (state) => state.user.userData;
export const selectSearchInput = (state) => state.user.searchInput;
export const selectBlogData = (state) => state.user.blogData;

export default userSlice.reducer;
