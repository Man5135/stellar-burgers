import { rootReducer } from './rootReducer';

describe('rootReducer', () => {
  it('should return the initial state', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(initialState).toHaveProperty('ingredients');
    expect(initialState).toHaveProperty('orders');
    expect(initialState).toHaveProperty('user');
    expect(initialState).toHaveProperty('userOrders');
    expect(initialState).toHaveProperty('constructor');
    expect(initialState).toHaveProperty('ingredientDetails');
    expect(initialState).toHaveProperty('orderDetails');
  });
});
