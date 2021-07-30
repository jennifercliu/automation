import React, {useContext, useState} from 'react';
import todoListContext from './todoListContext';

import './AddItem.css';

export const AddItem = () => {
  const {onAddItem} = useContext(todoListContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onSaveClicked = () => {
    if (content === '') return;
    onAddItem({title, content});
    setTitle('');
    setContent('');
  };

  return (
    <div className={'add-item__container'}>
      <span className={'add-item__title'}>New Item:</span>
      <div className={'add-item__title-field'}>
        <input placeholder={'title'} value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <div className={'add-item__content-field'}>
        <textarea placeholder={'content'} value={content} onChange={e => setContent(e.target.value)} />
      </div>
      <div className={'add-item__save-button'}>
        <button onClick={onSaveClicked}>SAVE</button>
      </div>
    </div>
  );
};
