import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../utils/burger-api';
import { TConstructorIngredient, TOrder } from '../../utils/types';

type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
  loading: boolean;
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: [],
  orderRequest: false,
  orderModalData: null,
  error: null,
  loading: false
};

export const createOrder = createAsyncThunk(
  'constructor/createOrder',
  async (ingredients: string[]) => {
    const response = await orderBurgerApi(ingredients);
    return response;
  }
);

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<TConstructorIngredient>) =>
      // Явно возвращаем новый объект состояния
      ({
        ...state,
        bun: action.payload
      }),
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => ({
      ...state,
      ingredients: [
        ...state.ingredients,
        {
          ...action.payload,
          // Генерируем уникальный ID для конструктора здесь.
          // Это критично, чтобы React видел разницу между двумя одинаковыми булками/соусами
          id: crypto.randomUUID()
        }
      ]
    }),
    removeIngredient: (state, action: PayloadAction<string>) => ({
      ...state,
      ingredients: state.ingredients.filter(
        (item) => item.id !== action.payload
      )
    }),
    moveIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      const newIngredients = [...state.ingredients];
      const [moved] = newIngredients.splice(fromIndex, 1);
      newIngredients.splice(toIndex, 0, moved);

      return {
        ...state,
        ingredients: newIngredients
      };
    },
    clearConstructor: (state) => ({
      ...state,
      bun: null,
      ingredients: []
    }),
    closeOrderModal: (state) => ({
      ...state,
      orderModalData: null
    }),
    setConstructorState: (
      state,
      action: PayloadAction<{
        bun: TConstructorIngredient | null;
        ingredients: TConstructorIngredient[];
      }>
    ) => ({
      ...state,
      bun: action.payload.bun,
      ingredients: action.payload.ingredients
    })
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
        state.bun = null;
        state.ingredients = [];
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || 'Failed to create order';
      });
  }
});

export const {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  closeOrderModal,
  setConstructorState
} = constructorSlice.actions;
export default constructorSlice.reducer;
