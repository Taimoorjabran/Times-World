import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const countryApiUrl = import.meta.env.VITE_COUNTRY_API_URL;

export interface Country {
    name: string;
    region: string;
    flag: string;
    independent?: boolean;
}

interface CountriesState {
    countries: Country[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    selectedRegion: string;
    currentPage: number;
    itemsPerPage: number;
}

const initialState: CountriesState = {
    countries: [],
    status: 'idle',
    error: null,
    selectedRegion: 'All',
    currentPage: 1,
    itemsPerPage: 10,
};

export const fetchCountries = createAsyncThunk(
    'countries/fetchCountries',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<Country[]>(countryApiUrl);
            return response.data as Country[];
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const countriesSlice = createSlice({
    name: 'countries',
    initialState,
    reducers: {
        setRegionFilter(state, action) {
            state.selectedRegion = action.payload;
            state.currentPage = 1;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCountries.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCountries.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.countries = action.payload;
                state.error = null;
            })
            .addCase(fetchCountries.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string || 'Failed to fetch countries';
            });
    },
});

export const { setRegionFilter, setCurrentPage } = countriesSlice.actions;
export default countriesSlice.reducer;