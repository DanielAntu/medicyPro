import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../service/userService";

const initialState = {
    user: {},
    error: false,
    success: false,
    loading: false,
    message: false,
};

export const profile = createAsyncThunk(
    "user/profile",
    async (user, thunkApi) => {
        const token = thunkApi.getState().auth.user.token;

        const data = await userService.profile(user, token);

        return data;
    }
);

export const updateProfile = createAsyncThunk(
    "user/updateProfile",
    async (user, thunkApi) => {
        const token = thunkApi.getState().auth.user.token;

        const data = await userService.updateProfile(user, token);

        if (data.errors) {
            return thunkApi.rejectWithValue(data.errors[0]);
        }

        return data;
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(profile.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(profile.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.user = action.payload;
            })
            .addCase(updateProfile.pending, (state, action) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.message = "Perfil editado com sucesso!";
                state.user = action.payload;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.user = {};
            });
    },
});

export const { resetMessage } = userSlice.actions;
export default userSlice.reducer;
