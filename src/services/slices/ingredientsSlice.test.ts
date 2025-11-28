import ingredientsReducer, { fetchIngredients } from './ingredientsSlice';
import { TIngredient } from '../../utils/types';

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Test Bun',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 100,
    price: 50,
    image: 'bun.jpg',
    image_mobile: 'bun_mobile.jpg',
    image_large: 'bun_large.jpg'
  }
];

describe('ingredientsSlice', () => {
  it('should return the initial state', () => {
    expect(ingredientsReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual({
      ingredients: [],
      loading: false,
      error: null
    });
  });

  describe('fetchIngredients', () => {
    it('should set loading to true on pending', () => {
      const action = fetchIngredients.pending('requestId');
      const result = ingredientsReducer(undefined, action);
      expect(result.loading).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should set ingredients and loading to false on fulfilled', () => {
      const action = fetchIngredients.fulfilled(mockIngredients, 'requestId');
      const result = ingredientsReducer(undefined, action);
      expect(result.loading).toBe(false);
      expect(result.ingredients).toEqual(mockIngredients);
    });

    it('should set error and loading to false on rejected', () => {
      const action = fetchIngredients.rejected(new Error('Failed to fetch'), 'requestId');
      const result = ingredientsReducer(undefined, action);
      expect(result.loading).toBe(false);
      expect(result.error).toBe('Failed to fetch');
    });
  });
});
