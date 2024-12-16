import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "../configs/api"

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ searchQuery = "", page = 1, pageSize = 5 }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/product", {
        params: { name: searchQuery, page, pageSize },
      })
      return {
        products: response.data.data,
        totalItems: response.data.totalItems,
        pageSize: response.data.pageSize,
      }
    } catch (err) {
      return rejectWithValue(
        err.response.data.message || "Something went wrong"
      )
    }
  }
)

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    totalItems: 0,
    pageSize: 8,
    currentPage: 1,
    searchQuery: "",
    isLoading: false,
    error: null,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
      state.currentPage = 1
    },
    setPage: (state, action) => {
      state.currentPage = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.products = action.payload.products
        state.totalItems = action.payload.totalItems
        state.pageSize = action.payload.pageSize
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { setSearchQuery, setPage } = productSlice.actions

export default productSlice.reducer
