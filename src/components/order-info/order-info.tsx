import { FC, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useAppSelector, useAppDispatch } from '../../services/store';
import {
  fetchOrderByNumber,
  clearOrder
} from '../../services/slices/orderDetailsSlice';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const orderNumber = Number(number);
    if (number && !isNaN(orderNumber)) {
      dispatch(fetchOrderByNumber(orderNumber));
    }

    return () => {
      dispatch(clearOrder());
    };
  }, [dispatch, number]);

  const orderData = useAppSelector((state) => state.orderDetails.order);
  const ingredients = useAppSelector((state) => state.ingredients.ingredients);
  const loading = useAppSelector((state) => state.orderDetails.loading);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientWithCount = TIngredient & { count: number };

    const ingredientsMap = orderData.ingredients.reduce(
      (acc: { [key: string]: TIngredientWithCount }, item: string) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }
        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsMap).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo: ingredientsMap,
      total,
      date
    };
  }, [orderData, ingredients]);

  if (loading || !orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
