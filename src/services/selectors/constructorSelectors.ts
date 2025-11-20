import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectConstructorItems = createSelector(
  (state: RootState) => state.constructor.bun,
  (state: RootState) => state.constructor.ingredients,
  (bun, ingredients) => ({
    bun,
    ingredients: ingredients || []
  })
);

export const selectOrderRequest = (state: RootState) =>
  state.constructor.orderRequest;

export const selectOrderModalData = (state: RootState) =>
  state.constructor.orderModalData;

export const selectIsAuthenticated = (state: RootState) =>
  state.user.user !== null;
