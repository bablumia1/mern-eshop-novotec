import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../utils/api";

const initialState = {
  colors: [],
  color: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

// fetchColors action
export const fetchColors = createAsyncThunk(
  "colors/fetchColors",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/colors");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// fetchColor action
export const fetchColor = createAsyncThunk(
  "colors/fetchColor",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/colors/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// createColor action
export const createColor = createAsyncThunk(
  "colors/createColor",
  async (colorData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("name", colorData.name);
      formData.append("code", colorData.code);
      const { data } = await api.post("/colors", formData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// updateColor action
export const updateColor = createAsyncThunk(
  "colors/updateColor",
  async (data, { rejectWithValue }) => {
    try {
      const { id, colorData } = data;
      const formData = new FormData();
      formData.append("name", colorData.name);
      formData.append("code", colorData.code);
      const { data } = await api.put(`/colors/${id}`, formData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// deleteColor action
export const deleteColor = createAsyncThunk(
  "colors/deleteColor",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/colors/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const colorSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {
    resetColorState: (state) => {
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
    },
  },

  extraReducers: (builder) => {
    // fetchColors
    builder.addCase(fetchColors.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchColors.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.colors = payload.colors;
    });
    builder.addCase(fetchColors.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // fetchColor
    builder.addCase(fetchColor.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchColor.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.color = payload.color;
    });
    builder.addCase(fetchColor.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // createColor
    builder.addCase(createColor.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createColor.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.colors.push(payload.color);
      state.isAdded = true;
      state.error = null;
    });
    builder.addCase(createColor.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload.message;
    });

    // updateColor
    builder.addCase(updateColor.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateColor.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.isUpdated = true;
      state.error = null;
      state.colors = state.colors.map((color) =>
        color._id === payload.color._id ? payload.color : color
      );
    });
    builder.addCase(updateColor.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload.message;
    });

    // deleteColor
    builder.addCase(deleteColor.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteColor.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.isDeleted = true;
      state.error = null;
      state.colors = state.colors.filter(
        (color) => color._id !== payload.color
      );
    });
    builder.addCase(deleteColor.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload.message;
    });
  },
});

export const { resetColorState } = colorSlice.actions;

const colorsReducer = colorSlice.reducer;
export default colorsReducer;
