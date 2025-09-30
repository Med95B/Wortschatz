import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

const setAuthHeader = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/register", userData);
      return res.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const activateUser = createAsyncThunk(
  "auth/activate",
  async (activationToken, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/activation", { token: activationToken });
      return res.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", credentials);

    const token = res.data?.token ?? null;
    const user = res.data.user ?? (res.data._id ? { _id: res.data._id, username: res.data.username, email: res.data.email } : null);

      if (!token) {
        return rejectWithValue("Aucun token reçu du serveur");
      }

      localStorage.setItem("token", token);
      setAuthHeader(token);

      return { user, token };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/auth/me");
      return res.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const tokenFromStorage = localStorage.getItem("token");
if (tokenFromStorage) setAuthHeader(tokenFromStorage);

const initialState = {
  user: null,
  token: tokenFromStorage || null,
  loading: false,
  error: null,
  message: null, 
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      state.message = null;
      localStorage.removeItem("token");
      setAuthHeader(null);
    },
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload?.message || "Inscription réussie, vérifiez votre email.";
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message;
    });

    builder.addCase(activateUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(activateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload?.message || "Activation réussie.";
    });
    builder.addCase(activateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message;
    });

    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message;
    });

    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(fetchCurrentUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message;
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      setAuthHeader(null);
    });
  },
});

export const { logout, clearError, clearMessage } = authSlice.actions;
export default authSlice.reducer;