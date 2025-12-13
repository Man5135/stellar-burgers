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

const defaultInitialState = {
  bun: null,
  ingredients: [],
  orderRequest: false,
  orderModalData: null,
  error: null,
  loading: false
};

describe('constructorSlice', () => {
  it('should return the initial state', () => {
    expect(constructorReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      defaultInitialState
    );
  });

  describe('addIngredient', () => {
    it('should add an ingredient to the constructor', () => {
      const action = addIngredient(mockIngredient);
      const result = constructorReducer(undefined, action);
      
      const expectedState = {
        ...defaultInitialState,
        ingredients: [
          {
            ...mockIngredient,
            id: expect.any(String)
          }
        ]
      };
      
      expect(result).toEqual(expectedState);
    });
  });

  describe('removeIngredient', () => {
    it('should remove an ingredient from the constructor', () => {
      const stateWithIngredient = {
        ...defaultInitialState,
        ingredients: [{ ...mockIngredient, id: 'test-id' }]
      };
      
      const action = removeIngredient('test-id');
      const result = constructorReducer(stateWithIngredient, action);
      
      const expectedState = {
          ...defaultInitialState,
          ingredients: []
      };

      expect(result).toEqual(expectedState);
    });
  });

  describe('moveIngredient', () => {
    it('should move an ingredient in the constructor', () => {
      const initialState = {
        ...defaultInitialState,
        ingredients: [
          { ...mockIngredient, id: '1', name: 'First' },
          { ...mockIngredient, id: '2', name: 'Second' },
          { ...mockIngredient, id: '3', name: 'Third' }
        ]
      };
      const action = moveIngredient({ fromIndex: 0, toIndex: 2 });
      const result = constructorReducer(initialState, action);

      const expectedIngredients = [
          initialState.ingredients[1],
          initialState.ingredients[2],
          initialState.ingredients[0]
      ];
      
      const expectedState = {
          ...defaultInitialState,
          ingredients: expectedIngredients
      };
      
      expect(result).toEqual(expectedState);
    });
  });
});