import React, {useContext} from 'react';
import todoListContext from './todoListContext';

import './TodoItem.css';

export const TodoItem = ({id, title, content, completed}) => {
  const {onRemoveItem, onMarkComplete, onMarkIncomplete} = useContext(todoListContext);

  const onCheckboxClicked = () => {
    if (completed) {
      onMarkIncomplete(id);
    } else {
      onMarkComplete(id);
    }
  };

  const onDeleteClicked = () => {
    if (completed) {
      onRemoveItem(id);
    }
  };

  return (
    <li className={'todo-item__container'}>
      <div className={'todo-item__complete-checkbox'}>
        <input type={'checkbox'} checked={completed} onChange={onCheckboxClicked} />
      </div>
      <div className={'todo-item__descriptions'}>
        <div className={'todo-item__title'}>{`Title: ${title}`}</div>
        <div className={'todo-item__content'}>{`Content: ${content}`}</div>
      </div>
      <button onClick={onDeleteClicked}>REMOVE</button>
    </li>
  );
};
