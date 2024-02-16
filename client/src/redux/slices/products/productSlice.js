import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api";
import axios from "axios";

const initialState = {
  products: [],
  product: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
  total: 0,
};

// createProduct action
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (product, { rejectWithValue }) => {
    try {
      const {
        name,
        description,
        category,
        sizes,
        brand,
        colors,
        price,
        quantity,
        files,
      } = product;

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);

      formData.append("brand", brand);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("colors", JSON.stringify(colors));

      // upload images to cloudinary
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

      // Append the images array directly to the "images" field
      formData.append("images", JSON.stringify(images));
      const { data } = await api.post("/products", formData);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch all products action

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (url, { rejectWithValue }) => {
    try {
      const { data } = await api.get(url);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// fetch single product action

export const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/products/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// update product action

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product, { rejectWithValue }) => {
    const {
      id,
      name,
      description,
      category,
      sizes,
      brand,
      colors,
      price,
      quantity,
      files,
    } = product;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);

    formData.append("brand", brand);
    formData.append("price", price);
    formData.append("quantity", quantity);

    if (sizes) {
      formData.append("sizes", JSON.stringify(sizes));
    }
    if (colors) {
      formData.append("colors", JSON.stringify(colors));
    }
    console.log(files.length);
    // upload images to cloudinary
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

      // Append the images array directly to the "images" field
      formData.append("images", JSON.stringify(images));
    }

    try {
      const { data } = await api.put(`/products/${id}`, formData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete product action

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/products/${id}`);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetProduct: (state) => {
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
    },
  },
  extraReducers: (builder) => {
    // Fetch single product
    builder.addCase(fetchProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload.product;
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Fetch all products
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.total = action.payload.total;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });

    // Create product
    builder.addCase(createProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.isAdded = true;
      state.product = action.payload;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.loading = false;
      state.isAdded = false;
      state.error = action.payload;
    });

    // Update product
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.isUpdated = true;
      state.product = action.payload;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.isUpdated = false;
      state.error = action.payload;
    });

    // Delete product
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.isDeleted = true;
      state.products = state.products.filter(
        (product) => product._id !== action.payload._id
      );
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.isDeleted = false;
      state.error = action.payload;
    });
  },
});

export const { resetProduct } = productSlice.actions;

const productReducer = productSlice.reducer;

export default productReducer;
