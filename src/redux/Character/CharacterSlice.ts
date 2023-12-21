import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export type Values = {
  page: Number, name: String, gender: String, status: String
}

export const getCharacters = createAsyncThunk("get/characters", async (values: Values) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}character/?&page=${values.page}&name=${values.name}&status=${values.status}&gender=${values.gender}`)
  return res.data;
})


export type Character = {
  id: number,
  name: string,
  status: string,
  species: string,
  type: string,
  episode: string[],
  location: { name: string, url: string },
  origin: { name: string, url: string },
  image: string,
  url: string,
  created: string,
  gender: string
}

interface CharacterStates {
  characterList: Character[]
  listStatus: String
  selectedCharacters: Character[],
  searchValues: { page: Number, name: string, status: string, gender: string }
}

const initialState: CharacterStates = {
  characterList: [],
  listStatus: "idle",
  selectedCharacters: [],
  searchValues: { page: 1, name: "", status: "", gender: "" }
};

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    //Checkboxına tıklanılan karakter seçilen karakterler arasında varsa siliyoruz, yoksa ekliyoruz
    setSelectedCharacters: (state, action: PayloadAction<Character>) => {
      const isSelected = state.selectedCharacters.some((character: Character) => character.id === action.payload.id);
      if (!isSelected) {
        state.selectedCharacters = [...state.selectedCharacters, action.payload]
      } else {
        const newSelectedCharacters = state.selectedCharacters.filter((character: Character) => character.id !== action.payload.id);
        state.selectedCharacters = newSelectedCharacters;
      }
    },
    //Arama değerlerini set ediyoruz
    setSearchValues: (state, action: PayloadAction<any>) => {
      state.searchValues = { ...state.searchValues, [action.payload.name]: action.payload.value }
    },
    //Page bilgisini sıfırlıyoruz
    resetPage: (state) => {
      state.searchValues = { ...state.searchValues, page: 1 }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCharacters.pending, (state) => {
      state.listStatus = "pending";
    }).addCase(getCharacters.fulfilled, (state, action) => {
      state.listStatus = "ready";
      state.characterList = action.payload
    }).addCase(getCharacters.rejected, (state) => {
      state.listStatus = "error"
    })
  }
});


export default characterSlice.reducer;
export const { setSelectedCharacters, setSearchValues, resetPage } = characterSlice.actions;