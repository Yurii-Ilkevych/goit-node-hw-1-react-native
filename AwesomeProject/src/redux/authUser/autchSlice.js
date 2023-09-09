import { createSlice } from "@reduxjs/toolkit";

import {
  registerDB,
  loginDB,
  updateUserProfile,
  logout,
  updateUserData,
  deleteCarrentAvatar,
  addCarrentAvatar,
} from "./authOperators";

const userInitialState = {
  user: { displayName: null, email: null, photoURL: null },
  isLoading: false,
  errorLogin: null,
  errorRegister: null,
  erroUpdate: null,
  errorDeleteAvatar: null,
  errorAddAvatar: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: userInitialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerDB.pending, (state) => {
        state.isLoading = true;
        state.errorRegister = null;
      })
      .addCase(registerDB.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorRegister = null;
        state.user = action.payload;
      })
      .addCase(registerDB.rejected, (state, action) => {
        state.isLoading = false;
        state.errorRegister = action.payload;
      });

    builder
      .addCase(loginDB.pending, (state) => {
        state.isLoading = true;
        state.errorLogin = null;
      })
      .addCase(loginDB.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorLogin = null;
        state.errorRegister = null;
        state.errorDeleteAvatar = null;
        (state.errorAddAvatar = null), (state.user = action.payload);
      })
      .addCase(loginDB.rejected, (state, action) => {
        state.isLoading = false;
        state.errorLogin = action.payload;
      });

    builder
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.erroUpdate = null;
      })
      .addCase(updateUserProfile.fulfilled, (state) => {
        state.isLoading = false;
        state.erroUpdate = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.erroUpdate = action.payload;
      });

    builder
      .addCase(updateUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUserData.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(deleteCarrentAvatar.pending, (state) => {
        state.isLoading = true;
        state.errorDeleteAvatar = null;
      })
      .addCase(deleteCarrentAvatar.fulfilled, (state) => {
        state.isLoading = false;
        state.errorDeleteAvatar = null;
        state.user.photoURL = null;
      })
      .addCase(deleteCarrentAvatar.rejected, (state, action) => {
        state.isLoading = false;
        state.errorDeleteAvatar = action.payload;
      });

    builder
      .addCase(addCarrentAvatar.pending, (state) => {
        state.isLoading = true;
        state.errorAddAvatar = null;
      })
      .addCase(addCarrentAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorAddAvatar = null;
        state.user.photoURL = action.payload;
      })
      .addCase(addCarrentAvatar.rejected, (state, action) => {
        state.isLoading = false;
        state.errorAddAvatar = action.payload;
      });
  },
});

export const authUserReducer = authSlice.reducer;
