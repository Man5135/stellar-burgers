import { FC, memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { addBun, addIngredient } from '../../services/slices/constructorSlice';
import { setIngredient } from '../../services/slices/ingredientDetailsSlice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAdd = () => {
      if (ingredient.type === 'bun') {
        dispatch(addBun({ ...ingredient, id: ingredient._id }));
      } else {
        dispatch(addIngredient({ ...ingredient, id: ingredient._id }));
      }
    };

    const handleClick = () => {
      dispatch(setIngredient(ingredient));
      navigate(`/ingredients/${ingredient._id}`, {
        state: { background: location }
      });
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
        handleClick={handleClick}
      />
    );
  }
);
