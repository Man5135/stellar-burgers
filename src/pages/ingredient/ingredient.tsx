import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  useAppSelector,
  useAppDispatch,
  RootState
} from '../../services/store';
import { IngredientDetails } from '../../components/ingredient-details';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { setIngredient } from '../../services/slices/ingredientDetailsSlice';
import { TIngredient } from '@utils-types';

export const Ingredient: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const ingredients = useAppSelector(
    (state: RootState) => state.ingredients.ingredients
  );

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length]);

  useEffect(() => {
    if (id && ingredients.length) {
      const ingredient = ingredients.find((ing: TIngredient) => ing._id === id);
      if (ingredient) {
        dispatch(setIngredient(ingredient));
      }
    }
  }, [dispatch, id, ingredients]);

  return <IngredientDetails />;
};
