import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import revenueService from "../service/revenueService";

const initialState = {
    revenues: [],
    revenue: {},
    error: false,
    success: false,
    loading: false,
    message: null,
};

export const createRevenue = createAsyncThunk(
    "revenue/createRevenue",
    async (revenue, thunkApi) => {
        const token = thunkApi.getState().auth.user.token;

        const data = await revenueService.createRevenue(revenue, token);

        if (data.errors) {
            return thunkApi.rejectWithValue(data.errors[0]);
        }

        return data;
    }
);

export const getUserRevenue = createAsyncThunk(
    "revenue/getUserRevenue",
    async (_, thunkApi) => {
        const token = thunkApi.getState().auth.user.token;

        const data = await revenueService.getUserRevenue(token);

        return data;
    }
);

export const deleteRevenue = createAsyncThunk(
    "revenue/deleteRevenue",
    async (id, thunkApi) => {
        const token = thunkApi.getState().auth.user.token;

        const data = await revenueService.deleteRevenue(id, token);

        if (data.errors) {
            return thunkApi.rejectWithValue(data.errors);
        }

        return data;
    }
);

export const getRevenuebyId = createAsyncThunk(
    "revenue/getRevenuebuId",
    async (id, thunkApi) => {
        const token = thunkApi.getState().auth.user.token;

        const data = await revenueService.getRevenuebyId(id, token);

        return data;
    }
);

export const updateRevenue = createAsyncThunk(
    "revenue/updateRevenue",
    async (revenueData, thunkApi) => {
        const token = thunkApi.getState().auth.user.token;

        const data = await revenueService.updateRevenue(
            revenueData.id,
            {
                weight: revenueData.weight,
                age: revenueData.age,
                drops: revenueData.drops,
            },
            token
        );

        if (data.errors) {
            return thunkApi.rejectWithValue(data.errors[0]);
        }

        return data;
    }
);

export const revenueSlice = createSlice({
    name: "revenue",
    initialState,
    reducers: {
        resetMessages: (state) => {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createRevenue.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createRevenue.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.revenue = action.payload;
                state.revenues.unshift(state.revenue);
                state.message = "Receita salva com sucesso!";
            })
            .addCase(createRevenue.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.revenue = {};
            })
            .addCase(getUserRevenue.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserRevenue.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.revenues = action.payload;
            })
            .addCase(getUserRevenue.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.revenues = {};
            })
            .addCase(deleteRevenue.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteRevenue.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.revenues = state.revenues.filter((rev) => {
                    return rev._id !== action.payload.id;
                });
                state.message = action.payload.message;
            })
            .addCase(deleteRevenue.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.revenue = {};
            })
            .addCase(getRevenuebyId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRevenuebyId.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.revenue = action.payload;
            })
            .addCase(updateRevenue.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateRevenue.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.revenues.map((rev) => {
                    if (rev._id === action.payload.revenue._id) {
                        return (
                            (rev.weight = action.payload.revenue.weight),
                            (rev.age = action.payload.revenue.age),
                            (rev.drops = action.payload.revenue.drops)
                        );
                    }

                    return rev;
                });
                state.message = action.payload.message;
            })
            .addCase(updateRevenue.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.revenue = {};
            });
    },
});

export const { resetMessages } = revenueSlice.actions;
export default revenueSlice.reducer;
