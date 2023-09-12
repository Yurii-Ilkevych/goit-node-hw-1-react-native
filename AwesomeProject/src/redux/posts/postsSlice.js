import { createSlice } from "@reduxjs/toolkit";

import { createPost, getPosts, addComment, getAllPosts, getCommentForCurrentPost, addLike } from "./postsOperators";

const postInitialState = {
  data: [],
  allData: [],
  dataComment: [],
  isLoading: false,
  errorCreatePost: null,
  errorGetPost: null,
  errorGetAllPosts: null,
  errorAddComment: null,
  errorGetCommentForCurrentPost: null,
  errorAddLike: null,
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
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true;
        state.errorGetAllPosts = null;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.allData = action.payload;
        state.isLoading = false;
        state.errorGetAllPosts = null;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.errorGetAllPosts = action.payload;
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

      builder
      .addCase(addLike.pending, (state) => {
        state.isLoading = true;
        state.errorAddLike = null;
      })
      .addCase(addLike.fulfilled, (state) => {
        state.isLoading = false;
        state.errorAddLike = null;
      })
      .addCase(addLike.rejected, (state, action) => {
        state.isLoading = false;
        state.errorAddLike = action.payload;
      });

      builder
      .addCase(getCommentForCurrentPost.pending, (state) => {
        state.isLoading = true;
        state.errorGetCommentForCurrentPost = null;
      })
      .addCase(getCommentForCurrentPost.fulfilled, (state, action) => {
        state.dataComment = action.payload;
        state.isLoading = false;
        state.errorGetCommentForCurrentPost = null;
      })
      .addCase(getCommentForCurrentPost.rejected, (state, action) => {
        state.isLoading = false;
        state.errorGetCommentForCurrentPost = action.payload;
      });



  },
});

export const postUserReducer = postSlice.reducer;
