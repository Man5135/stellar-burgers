import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../services/store';
import { OrderInfo } from '../../components/order-info';
import { fetchOrderByNumber } from '../../services/slices/orderDetailsSlice';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { Preloader } from '@ui';

export const Order: FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useAppDispatch();

  // Селекторы
  const order = useAppSelector((state) => state.orderDetails.order);
  const loading = useAppSelector((state) => state.orderDetails.loading);
  const error = useAppSelector((state) => state.orderDetails.error);
  // Загрузка ингредиентов (ключ к решению вашей проблемы)
  const ingredientsLoading = useAppSelector(
    (state) => state.ingredients.loading
  );
  const ingredientsLoaded = useAppSelector(
    (state) => state.ingredients.ingredients.length > 0
  );

  useEffect(() => {
    // 1. Загрузка ингредиентов (если нужно и не идет)
    if (!ingredientsLoaded && !ingredientsLoading) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredientsLoaded, ingredientsLoading]);

  useEffect(() => {
    // 2. Загрузка заказа
    if (number) {
      const orderNumber = Number(number);
      // Запускаем загрузку, только если:
      // A) Заказ еще не загружен ИЛИ
      // B) Загруженный заказ не соответствует текущему номеру из URL
      if (!order || order.number !== orderNumber) {
        dispatch(fetchOrderByNumber(orderNumber));
      }
    }
  }, [dispatch, number, order]);

  // --- УСЛОВИЯ РЕНДЕРА ---
  // Если что-то грузится, показываем Preloader
  if (loading || ingredientsLoading) {
    return <Preloader />;
  }

  // Если есть ошибка (API вернул 404/500)
  if (error) {
    return (
      <p
        style={{
          textAlign: 'center',
          marginTop: '100px',
          fontSize: '20px',
          color: 'red'
        }}
      >
        Ошибка загрузки заказа: {error}
      </p>
    );
  }

  // Если загрузка закончена, но заказа нет (заказ не найден)
  if (!order) {
    return (
      <p
        style={{
          textAlign: 'center',
          marginTop: '100px',
          fontSize: '20px',
          color: 'red'
        }}
      >
        Заказ №{number} не найден.
      </p>
    );
  }

  // Если все данные готовы
  return <OrderInfo />;
};
