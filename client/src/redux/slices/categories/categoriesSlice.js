import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../utils/api";
import axios from "axios";

const initialState = {
  categories: [],
  category: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

// fetchCategories action
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/categories");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// fetchCategory action
export const fetchCategory = createAsyncThunk(
  "categories/fetchCategory",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/categories/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// createCategory action
export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (category, { rejectWithValue }) => {
    try {
      const { name, files } = category;
      const formData = new FormData();
      formData.append("name", name);

      // upload image to cloudinary
      const images = [];
      const imagesData = new FormData();
      for (let i = 0; i < files.length; i++) {
        imagesData.append("file", files[i]);
        imagesData.append("upload_preset", "ml_default");
        imagesData.append("cloud_name", "dsmrt6yiw");
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dsftrmdil/image/upload",
          imagesData
        );
        images.push(res.data.secure_url);
      }

      formData.append("image", images[0]);

      const { data } = await api.post("/categories", formData);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// updateCategory action

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async (category, { rejectWithValue }) => {
    try {
      const { id, name, files } = category;
      const formData = new FormData();
      formData.append("name", name);

      // upload image to cloudinary
      if (files.length > 0) {
        const images = [];
        const imagesData = new FormData();
        for (let i = 0; i < files.length; i++) {
          imagesData.append("file", files[i]);
          imagesData.append("upload_preset", "ml_default");
          imagesData.append("cloud_name", "dsmrt6yiw");
          const res = await axios.post(
            "https://api.cloudinary.com/v1_1/dsftrmdil/image/upload",
            imagesData
          );
          images.push(res.data.secure_url);
        }

        formData.append("image", images[0]);
      }

      const { data } = await api.put(`/categories/${id}`, formData);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// deleteCategory action
export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/categories/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    resetCategoryState: (state) => {
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
    },
  },
  extraReducers: (builder) => {
    // fetchCategories
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.categories = payload.categories;
    });
    builder.addCase(fetchCategories.rejected, (state, { payload }) => {
      state.loading = true;
      state.error = payload;
    });

    // fetchCategory
    builder.addCase(fetchCategory.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchCategory.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.category = payload.category;
    });
    builder.addCase(fetchCategory.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // createCategory
    builder.addCase(createCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCategory.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.categories.push(payload);
      state.isAdded = true;
      state.error = null;
    });
    builder.addCase(createCategory.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // updateCategory
    builder.addCase(updateCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCategory.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.categories = state.categories.map((category) =>
        category._id === payload._id ? payload : category
      );
      state.isUpdated = true;
    });

    builder.addCase(updateCategory.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // deleteCategory
    builder.addCase(deleteCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCategory.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.categories = state.categories.filter(
        (category) => category._id !== payload._id
      );
      state.isDeleted = true;
    });
    builder.addCase(deleteCategory.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { resetCategoryState } = categorySlice.actions;

const categoryReducer = categorySlice.reducer;

export default categoryReducer;
