import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../utils/api";

const initialState = {
  brands: [],
  brand: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

// fetchBrands action
export const fetchBrands = createAsyncThunk(
  "brands/fetchBrands",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/brands");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// fetch brand by id
export const fetchBrandById = createAsyncThunk(
  "brands/fetchBrandById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/brands/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// add brand
export const addBrand = createAsyncThunk(
  "brands/addBrand",
  async (brand, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("name", brand.name);
      const { data } = await api.post("/brands", formData);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// update brand

export const updateBrand = createAsyncThunk(
  "brands/updateBrand",
  async (brand, { rejectWithValue }) => {
    const { id, name } = brand;

    const formData = new FormData();
    formData.append("name", name);
    try {
      const { data } = await api.put(`/brands/${id}`, formData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// delete brand
export const deleteBrand = createAsyncThunk(
  "brands/deleteBrand",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/brands/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    resetBrandState: (state) => {
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
    },
  },
  extraReducers: (builder) => {
    // fetchBrands
    builder.addCase(fetchBrands.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBrands.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.brands = payload.brands;
    });
    builder.addCase(fetchBrands.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // fetchBrandById
    builder.addCase(fetchBrandById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBrandById.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.brand = payload.brand;
    });
    builder.addCase(fetchBrandById.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // addBrand
    builder.addCase(addBrand.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addBrand.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.brands.push(payload);
      state.isAdded = true;
      state.error = null;
    });
    builder.addCase(addBrand.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload.message;
    });

    // updateBrand
    builder.addCase(updateBrand.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateBrand.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.isUpdated = true;
      state.error = null;
      state.brands = state.brands.map((brand) =>
        brand._id === payload._id ? payload : brand
      );
    });
    builder.addCase(updateBrand.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // deleteBrand
    builder.addCase(deleteBrand.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteBrand.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.isDeleted = true;
      state.brands = state.brands.filter((brand) => brand._id !== payload._id);
    });
    builder.addCase(deleteBrand.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { resetBrandState } = brandSlice.actions;

const brandsReducer = brandSlice.reducer;

export default brandsReducer;
