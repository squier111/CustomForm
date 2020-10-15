import { useCallback, useReducer } from 'react';

// HELPERS
export function actionCreator(type, payload) {
  return { type, payload };
}

const actions = Object.freeze({
  SET_INPUT_FIELD: 'SET_INPUT_FIELD',
  FORM_CLEAR: 'FORM_CLEAR',
});

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.SET_INPUT_FIELD: {
      const { name, value } = payload;
      return {
        ...state,
        [name]: value,
      };
    }
    case actions.FORM_CLEAR: {
      const copy = Object.assign({}, state);
      for (let key in copy) {
        if(key.includes('value')) {
          copy[key] = '';
        }
      }
      return copy;
    }
    default: {
      return state;
    }
  }
}

export function useFormCustomHook(initialState) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setInputField = useCallback((value) => {
    dispatch(
      actionCreator(actions.SET_INPUT_FIELD, value),
    );
  }, []);

  const formClear = useCallback(() => {
    dispatch(
      actionCreator(actions.FORM_CLEAR),
    );
  }, []);

  const getFormFieldValue = useCallback((name) => {
    return state[name];
  }, [state]);

  return {
    formState: state,
    getFormFieldValue,
    setInputField,
    formClear
  };
}
