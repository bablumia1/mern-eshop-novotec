import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../utils/api";

const initialState = {
  reviews: [],
  review: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDelete: false,
};

// create review slice
export const createReview = createAsyncThunk(
  "review/createReview",
  async (data, { rejectWithValue }) => {
    try {
      const { id, rating, message } = data;
      const response = await api.post(`/reviews/${id}`, { rating, message });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    resetReview: (state) => {
      state.isAdded = false;
      state.isUpdated = false;
      state.isDelete = false;
    },
  },
  extraReducers: (builder) => {
    // create review
    builder.addCase(createReview.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createReview.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.isAdded = true;
      state.review = payload;
    });
    builder.addCase(createReview.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { resetReview } = reviewSlice.actions;

const reviewReducer = reviewSlice.reducer;

export default reviewReducer;
