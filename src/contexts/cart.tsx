import React, { useReducer } from 'react';

import { contextFactory } from 'config/context';

export interface Product {
  id: number;
  author: string;
  title: string;
}

export interface State {
  products: Product[];
}

export const INITIAL_STATE = {
  products: []
};

enum ActionTypes {
  ADD_BOOK = 'ADD_BOOK',
  DELETE_BOOK = 'DELETE_BOOK'
}

interface AddBook {
  type: ActionTypes.ADD_BOOK;
  payload: Product;
}

interface DeleteBook {
  type: ActionTypes.DELETE_BOOK;
  payload: number;
}

export const { useSelector, Context, useDispatch } = contextFactory<State, Action>(INITIAL_STATE);

export type Action = AddBook | DeleteBook;

export const actionCreators = {
  addBook: (product: Product): AddBook => ({ type: ActionTypes.ADD_BOOK, payload: product }),
  deleteBook: (id: number): DeleteBook => ({ type: ActionTypes.DELETE_BOOK, payload: id })
};

export const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case ActionTypes.ADD_BOOK: {
      const newItem = state.products.find(product => product.id === action.payload.id);
      return {
        ...state,
        products: newItem ? state.products : [...state.products, { ...action.payload }]
      };
    }
    case ActionTypes.DELETE_BOOK: {
      return { ...state, products: state.products.filter(item => item.id !== action.payload) };
    }
    default: {
      return state;
    }
  }
};

const withProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};

export default withProvider;
