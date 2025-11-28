import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredient
} from './constructorSlice';
import { TConstructorIngredient } from '../../utils/types';

const mockIngredient: TConstructorIngredient = {
  _id: '1',
  name: 'Test Ingredient',
  type: 'main',
  proteins: 10,
  fat: 5,
  carbohydrates: 20,
  calories: 100,
  price: 50,
  image: 'ingredient.jpg',
  image_mobile: 'ingredient_mobile.jpg',
  image_large: 'ingredient_large.jpg',
  id: 'unique-id'
};

describe('constructorSlice', () => {
  it('should return the initial state', () => {
    expect(constructorReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual({
      bun: null,
      ingredients: [],
      orderRequest: false,
      orderModalData: null,
      error: null,
      loading: false
    });
  });

  describe('addIngredient', () => {
    it('should add an ingredient to the constructor', () => {
      const action = addIngredient(mockIngredient);
      const result = constructorReducer(undefined, action);
      expect(result.ingredients).toHaveLength(1);
      expect(result.ingredients[0]).toEqual({
        ...mockIngredient,
        id: expect.any(String)
      });
    });
  });

  describe('removeIngredient', () => {
    it('should remove an ingredient from the constructor', () => {
      const initialState = {
        bun: null,
        ingredients: [{ ...mockIngredient, id: 'test-id' }],
        orderRequest: false,
        orderModalData: null,
        error: null,
        loading: false
      };
      const action = removeIngredient('test-id');
      const result = constructorReducer(initialState, action);
      expect(result.ingredients).toHaveLength(0);
    });
  });

  describe('moveIngredient', () => {
    it('should move an ingredient in the constructor', () => {
      const initialState = {
        bun: null,
        ingredients: [
          { ...mockIngredient, id: '1', name: 'First' },
          { ...mockIngredient, id: '2', name: 'Second' },
          { ...mockIngredient, id: '3', name: 'Third' }
        ],
        orderRequest: false,
        orderModalData: null,
        error: null,
        loading: false
      };
      const action = moveIngredient({ fromIndex: 0, toIndex: 2 });
      const result = constructorReducer(initialState, action);
      expect(result.ingredients[0].name).toBe('Second');
      expect(result.ingredients[1].name).toBe('Third');
      expect(result.ingredients[2].name).toBe('First');
    });
  });
});
