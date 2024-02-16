import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../utils/api";

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  loading: false,
  error: null,
  isDeleted: null,
  isUpdated: null,
  users: [],
  user: null,
  profile: {},
  userAuth: {
    loading: false,
    error: null,
    userInfo: userInfoFromLocalStorage,
  },
  isManager:
    userInfoFromLocalStorage &&
    userInfoFromLocalStorage.user.type === "manager",
  isAdmin:
    userInfoFromLocalStorage && userInfoFromLocalStorage.user.type === "admin",
};

// Register user action
export const registerUserAction = createAsyncThunk(
  { name: "users/register" },
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/users/register", {
        name,
        email,
        password,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Login action
export const loginUserAction = createAsyncThunk(
  "users/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/users/login", {
        email,
        password,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// logout action
export const logoutUserAction = createAsyncThunk(
  "users/logout",
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem("userInfo");
      return true;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get user profile action
export const getUserProfileAction = createAsyncThunk(
  "users/profile",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/users/profile");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// add user shipping address
export const addUserShippingAddressAction = createAsyncThunk(
  "users/add/shippingAddress",
  async (address, { rejectWithValue }) => {
    try {
      const { data } = await api.put("users/update/shipping", address);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// delete user shipping address
export const deleteUserShippingAddressAction = createAsyncThunk(
  " users/delete/shippingAddress",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/users/shipping/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get all users
export const getAllUsersAction = createAsyncThunk(
  "users/all",
  async (url, { rejectWithValue }) => {
    try {
      const { data } = await api.get(url);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// update user type
export const updateUserTypeAction = createAsyncThunk(
  "users/update/type",
  async (userData, { rejectWithValue }) => {
    try {
      const { id, type } = userData;
      const { data } = await api.put(`/users/update/type/${id}`, { type });

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Define an action to handle updating user type in local storage

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.loading = false;
      state.error = null;
      state.isDeleted = null;
    },
  },
  extraReducers: (builder) => {
    // login
    builder.addCase(loginUserAction.pending, (state) => {
      state.userAuth.loading = true;
    });
    builder.addCase(loginUserAction.fulfilled, (state, { payload }) => {
      state.userAuth.loading = false;
      state.userAuth.userInfo = payload;
    });
    builder.addCase(loginUserAction.rejected, (state, { payload }) => {
      state.userAuth.loading = false;
      state.userAuth.error = payload;
    });

    // Register
    builder.addCase(registerUserAction.pending, (state) => {
      state.userAuth.loading = true;
    });
    builder.addCase(registerUserAction.fulfilled, (state, { payload }) => {
      state.userAuth.loading = false;
      state.userAuth.userInfo = payload;
    });
    builder.addCase(registerUserAction.rejected, (state, { payload }) => {
      state.userAuth.loading = false;
      state.userAuth.error = payload;
    });

    // logout
    builder.addCase(logoutUserAction.fulfilled, (state) => {
      state.userAuth.loading = false;
      state.userAuth.userInfo = null;
    });

    // get user profile
    builder.addCase(getUserProfileAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserProfileAction.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.profile = payload.user;
    });
    builder.addCase(getUserProfileAction.rejected, (state, { payload }) => {
      state.loading = true;
      state.error = payload;
    });

    // add shipping address
    builder.addCase(addUserShippingAddressAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      addUserShippingAddressAction.fulfilled,
      (state, { payload }) => {
        state.loading = false;
        state.profile = payload.user;
        state.isUpdated = true;
      }
    );
    builder.addCase(
      addUserShippingAddressAction.rejected,
      (state, { payload }) => {
        state.loading = false;
        state.error = payload.message;
      }
    );

    // delete shipping address
    builder.addCase(deleteUserShippingAddressAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      deleteUserShippingAddressAction.fulfilled,
      (state, { payload }) => {
        state.loading = false;
        state.profile.shippingAddress = state.profile.shippingAddress.filter(
          (address) => address._id !== payload._id
        );
        state.isDeleted = true;
      }
    );
    builder.addCase(
      deleteUserShippingAddressAction.rejected,
      (state, { payload }) => {
        state.loading = false;
        state.error = payload.message;
      }
    );

    // get all users
    builder.addCase(getAllUsersAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllUsersAction.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.users = payload.users;
    });
    builder.addCase(getAllUsersAction.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload.message;
    });

    // update user type
    builder.addCase(updateUserTypeAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserTypeAction.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.users = state.users.map((user) =>
        user._id === payload._id ? payload : user
      );
      state.isUpdated = true;
    });
    builder.addCase(updateUserTypeAction.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload.message;
    });
  },
});

export const { resetUser } = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
