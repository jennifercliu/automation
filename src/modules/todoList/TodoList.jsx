import React, {useContext} from 'react';
import todoListContext from './todoListContext';
import {TodoItem} from './TodoItem';

export const TodoList = () => {
  const {filteredList, currentPage, canGoToNextPage, canGoToPreviousPage, onGoToNextPage, onGoToPreviousPage} =
    useContext(todoListContext);

  return (
    <div>
      <div>
        {filteredList.map(({id, content, title, completed}) => (
          <TodoItem key={id} id={id} content={content} title={title} completed={completed} />
        ))}
      </div>
      <div className={'todo-list__pager'}>
        <button disabled={!canGoToPreviousPage} onClick={onGoToPreviousPage}>{`previous page`}</button>
        <span>current page: {currentPage + 1}</span>
        <button disabled={!canGoToNextPage} onClick={onGoToNextPage}>{`next page`}</button>
      </div>
    </div>
  );
};
