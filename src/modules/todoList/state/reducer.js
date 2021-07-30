import {v4 as uuid} from 'uuid';
import {produce} from 'immer';

import actionTypes from './actions';

export const getInitialState = () => {
  return {
    items: {
      allIds: [],
      byIds: {},
    },
    ui: {
      page: 0,
      searchTerm: '',
    },
  };
};

export const reducer = produce((draft, {type, payload}) => {
  switch (type) {
    case actionTypes.addItem: {
      const {title, content} = payload;
      const id = uuid();
      const newItem = {
        id,
        content,
        title,
        completed: false,
      };

      draft.items.allIds.unshift(id);
      draft.items.byIds[id] = newItem;
      return draft;
    }

    case actionTypes.removeItem: {
      const {id} = payload;
      draft.items.allIds = draft.items.allIds.filter(itemId => itemId !== id);
      draft.items.byIds[id] = undefined;
      return draft;
    }

    case actionTypes.markItemComplete: {
      const {id} = payload;
      draft.items.byIds[id] = {
        ...draft.items.byIds[id],
        completed: true,
      };
      return draft;
    }

    case actionTypes.markItemIncomplete: {
      const {id} = payload;
      draft.items.byIds[id] = {
        ...draft.items.byIds[id],
        completed: false,
      };
      return draft;
    }
    case actionTypes.goToNextPage: {
      draft.ui.page = draft.ui.page + 1;
      return draft;
    }

    case actionTypes.goToPreviousPage: {
      draft.ui.page = draft.ui.page - 1;
      return draft;
    }

    case actionTypes.searchList: {
      const {searchTerm} = payload;
      draft.ui.searchTerm = searchTerm;
      draft.ui.page = 0;
      return draft;
    }

    default:
      return draft;
  }
});
