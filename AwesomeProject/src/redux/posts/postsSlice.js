import { createSlice } from "@reduxjs/toolkit";

import { createPost, getPosts, addComment } from "./postsOperators";

const postInitialState = {
  data: [],
  isLoading: false,
  errorCreatePost: null,
  errorGetPost: null,
  errorAddComment: null,
};

const postSlice = createSlice({
  name: "post",
  initialState: postInitialState,
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
        state.errorCreatePost = null;
      })
      .addCase(createPost.fulfilled, (state) => {
        state.isLoading = false;
        state.errorCreatePost = null;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.errorCreatePost = action.payload;
      });

    builder
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
        state.errorGetPost = null;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
        state.errorGetPost = null;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.errorGetPost = action.payload;
      });

    builder
      .addCase(addComment.pending, (state) => {
        state.isLoading = true;
        state.errorAddComment = null;
      })
      .addCase(addComment.fulfilled, (state) => {
        state.isLoading = false;
        state.errorAddComment = null;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.isLoading = false;
        state.errorAddComment = action.payload;
      });
  },
});

export const postUserReducer = postSlice.reducer;
