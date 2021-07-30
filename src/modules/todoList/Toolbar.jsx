import React, {useContext} from 'react';

import './Toolbar.css';
import todoListContext from './todoListContext';

export const Toolbar = () => {
  const {onSearch} = useContext(todoListContext);

  return (
    <div className={'toolbar__container'}>
      <span>Todo List</span>
      <span className={'toolbar__search-field'}>
        <input onChange={e => onSearch(e.target.value)} placeholder={'Search title or content'} />
      </span>
    </div>
  );
};
