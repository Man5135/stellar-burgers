import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredientsSlice';
import ordersReducer from './slices/ordersSlice';
import userReducer from './slices/userSlice';
import userOrdersReducer from './slices/userOrdersSlice';
import constructorReducer from './slices/constructorSlice';
import ingredientDetailsReducer from './slices/ingredientDetailsSlice';
import orderDetailsReducer from './slices/orderDetailsSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  orders: ordersReducer,
  user: userReducer,
  userOrders: userOrdersReducer,
  constructor: constructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderDetails: orderDetailsReducer
});

export type RootState = ReturnType<typeof rootReducer>;
