export const productsReducer = (state = [], action) => {
    switch (action.type) {
      case 'addProduct':
        return [
          ...state,
          {
            ...action.payload,
          },
        ];
      case 'removeProduct':
        return state.filter((product) => product.id !== action.payload);
      case 'updateProduct':
        return state.map((p) => {
          if (p.id === action.payload.id) {
            return {
              ...action.payload,
            };
          }
          return p;
        });
      case 'loadingProducts':
        return action.payload;
      default:
        return state;
    }
  };
  