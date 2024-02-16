import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../utils/api";

//initalsState
const initialState = {
  orders: [],
  order: null,
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  stats: null,
};

// create order action
export const placeOrderAction = createAsyncThunk(
  "orders/placeOrder",
  async (order, { rejectWithValue }) => {
    try {
      const { orderItems, shippingAddress, totalPrice, paymentMethod } = order;
      const { data } = await api.post("/orders", {
        orderItems,
        shippingAddress,
        totalPrice,
        paymentMethod,
      });
      if (data.type === "cash") {
        return window.location.replace(data?.success_url);
      }
      return window.open(data?.url);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get all orders action
export const getOrdersAction = createAsyncThunk(
  "orders/getOrders",
  async (url, { rejectWithValue }) => {
    try {
      const { data } = await api.get(url);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get order by id action
export const getOrderByIdAction = createAsyncThunk(
  "orders/getOrderById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/orders/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// update order status action
export const updateOrderStatusAction = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/orders/update/${id}`, { status });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get order stats action
export const getOrderStatsAction = createAsyncThunk(
  "orders/getOrderStats",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/orders/stats");
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(placeOrderAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(placeOrderAction.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
      state.isAdded = true;
    });
    builder.addCase(placeOrderAction.rejected, (state, action) => {
      state.loading = false;
      state.order = null;
      state.isAdded = false;
      state.error = action.payload;
    });

    // get all orders
    builder.addCase(getOrdersAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrdersAction.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload.orders;
    });
    builder.addCase(getOrdersAction.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });

    // get order by id
    builder.addCase(getOrderByIdAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrderByIdAction.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload.order;
    });
    builder.addCase(getOrderByIdAction.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });

    // update order status
    builder.addCase(updateOrderStatusAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateOrderStatusAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isUpdated = true;
      state.orders = state.orders.map((order) =>
        order._id === action.payload._id ? action.payload : order
      );
    });
    builder.addCase(updateOrderStatusAction.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });

    // get order stats
    builder.addCase(getOrderStatsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrderStatsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.stats = action.payload;
    });
    builder.addCase(getOrderStatsAction.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

const ordersReducer = orderSlice.reducer;

export default ordersReducer;
