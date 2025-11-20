import { FC, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../services/store';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  createOrder,
  closeOrderModal,
  clearConstructor,
  setConstructorState
} from '../../services/slices/constructorSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const constructorItems = useAppSelector((state) => ({
    bun: state.constructor.bun,
    ingredients: state.constructor.ingredients || []
  }));
  const orderRequest = useAppSelector(
    (state) => state.constructor.orderRequest
  );
  const orderModalData = useAppSelector(
    (state) => state.constructor.orderModalData
  );
  const isAuthenticated = useAppSelector((state) => state.user.user !== null);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const ingredientsIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map(
        (item: TConstructorIngredient) => item._id
      ),
      constructorItems.bun._id
    ];
    dispatch(createOrder(ingredientsIds));
  };

  const handleCloseOrderModal = () => {
    dispatch(closeOrderModal());
  };

  const handleClearConstructor = () => {
    dispatch(clearConstructor());
  };

  useEffect(() => {
    const savedConstructor = localStorage.getItem('burgerConstructor');
    if (savedConstructor) {
      try {
        const parsed = JSON.parse(savedConstructor);
        dispatch(setConstructorState(parsed));
      } catch (error) {
        console.error(
          'Failed to load constructor state from localStorage:',
          error
        );
      }
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('burgerConstructor', JSON.stringify(constructorItems));
  }, [constructorItems]);

  const isEmpty = useMemo(
    () => !constructorItems.bun && constructorItems.ingredients.length === 0,
    [constructorItems]
  );

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      (constructorItems.ingredients?.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ) || 0),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={handleCloseOrderModal}
      onClearConstructor={handleClearConstructor}
      isEmpty={isEmpty}
    />
  );
};
