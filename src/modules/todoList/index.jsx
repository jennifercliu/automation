import React, {useCallback, useMemo, useReducer} from 'react';

import {getInitialState, reducer} from './state/reducer';
import actionTypes from './state/actions';
import selectors from './state/selectors';
import TodoListContext from './todoListContext';
import {Toolbar} from './Toolbar';
import {AddItem} from './AddItem';

import './index.css';
import {TodoList} from './TodoList';

export const ToDoListPage = () => {
  const [state, dispatch] = useReducer(reducer, getInitialState());
  const filteredList = selectors.getFilteredList(state);
  const canGoToNextPage = selectors.getCanGoToNextPage(state);
  const canGoToPreviousPage = selectors.getCanGoToPreviousPage(state);
  const currentPage = selectors.getCurrentPage(state);

  const onAddItem = useCallback(
    ({content, title}) => {
      dispatch({
        type: actionTypes.addItem,
        payload: {
          content,
          title,
        },
      });
    },
    [dispatch]
  );

  const onRemoveItem = useCallback(
    id => {
      dispatch({
        type: actionTypes.removeItem,
        payload: {
          id,
        },
      });
    },
    [dispatch]
  );

  const onMarkComplete = useCallback(
    id => {
      dispatch({
        type: actionTypes.markItemComplete,
        payload: {
          id,
        },
      });
    },
    [dispatch]
  );

  const onMarkIncomplete = useCallback(
    id => {
      dispatch({
        type: actionTypes.markItemIncomplete,
        payload: {
          id,
        },
      });
    },
    [dispatch]
  );

  const onGoToNextPage = useCallback(() => {
    dispatch({
      type: actionTypes.goToNextPage,
    });
  }, [dispatch]);

  const onGoToPreviousPage = useCallback(() => {
    dispatch({
      type: actionTypes.goToPreviousPage,
    });
  }, [dispatch]);

  const onSearch = useCallback(
    searchTerm => {
      dispatch({
        type: actionTypes.searchList,
        payload: {
          searchTerm,
        },
      });
    },
    [dispatch]
  );

  const contextValue = useMemo(
    () => ({
      filteredList,
      currentPage,
      canGoToNextPage,
      canGoToPreviousPage,
      onAddItem,
      onRemoveItem,
      onMarkComplete,
      onMarkIncomplete,
      onGoToNextPage,
      onGoToPreviousPage,
      onSearch,
    }),
    [
      currentPage,
      canGoToNextPage,
      canGoToPreviousPage,
      filteredList,
      onAddItem,
      onRemoveItem,
      onMarkComplete,
      onMarkIncomplete,
      onGoToNextPage,
      onGoToPreviousPage,
      onSearch,
    ]
  );

  return (
    <TodoListContext.Provider value={contextValue}>
      <Toolbar />
      <div className={'todo-list__container'}>
        <AddItem />
        <div>
          <div>Your todo list:</div>
          <TodoList />
        </div>
      </div>
    </TodoListContext.Provider>
  );
};
