import api from "../../../utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  coupons: [],
  coupon: null,
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

// create coupon action
export const createCoupon = createAsyncThunk(
  "coupon/createCoupon",
  async (couponData, { rejectWithValue }) => {
    try {
      const response = await api.post("/coupons", couponData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get all coupons action
export const getCoupons = createAsyncThunk(
  "coupon/getCoupons",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/coupons");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get single coupon action
export const getCoupon = createAsyncThunk(
  "coupon/getCoupon",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/coupons/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get coupon by code action
export const getCouponByCode = createAsyncThunk(
  "coupon/getCouponByCode",
  async (code, { rejectWithValue }) => {
    try {
      const response = await api.get(`/coupons/code/${code}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// update coupon action
export const updateCoupon = createAsyncThunk(
  "coupon/updateCoupon",
  async ({ id, coupon }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/coupons/${id}`, coupon);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// delete coupon action
export const deleteCoupon = createAsyncThunk(
  "coupon/deleteCoupon",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/coupons/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    clearCouponState: (state) => {
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
    },
  },
  extraReducers: (builder) => {
    // create coupon
    builder.addCase(createCoupon.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCoupon.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.isAdded = true;
      state.coupon = payload;
      state.error = null;
    });
    builder.addCase(createCoupon.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // get all coupons
    builder.addCase(getCoupons.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCoupons.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.coupons = payload.coupons;
      state.error = null;
    });
    builder.addCase(getCoupons.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // get single coupon
    builder.addCase(getCoupon.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCoupon.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.coupon = payload.coupon;
      state.error = null;
    });
    builder.addCase(getCoupon.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // get coupon by code
    builder.addCase(getCouponByCode.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCouponByCode.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.coupon = payload.coupon;
      state.isAdded = true;
      state.error = null;
    });
    builder.addCase(getCouponByCode.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload.message;
    });

    // update coupon
    builder.addCase(updateCoupon.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCoupon.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.isUpdated = true;
      state.coupon = payload;
      state.error = null;
    });
    builder.addCase(updateCoupon.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // delete coupon
    builder.addCase(deleteCoupon.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCoupon.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.isDeleted = true;
      state.error = null;
      state.coupons = state.coupons.filter(
        (coupon) => coupon._id !== payload._id
      );
    });
    builder.addCase(deleteCoupon.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { clearCouponState } = couponSlice.actions;

const couponReducer = couponSlice.reducer;

export default couponReducer;
