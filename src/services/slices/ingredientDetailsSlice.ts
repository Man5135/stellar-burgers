import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '../../utils/types';

type TIngredientDetailsState = {
  ingredient: TIngredient | null;
};

const initialState: TIngredientDetailsState = {
  ingredient: null
};

const ingredientDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    setIngredient: (state, action: PayloadAction<TIngredient | null>) => {
      state.ingredient = action.payload;
    }
  }
});

export const { setIngredient } = ingredientDetailsSlice.actions;
export default ingredientDetailsSlice.reducer;
