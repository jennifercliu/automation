import {PAGE_SIZE} from '../constants';

const paginateArray = (arr, pageSize, pageNumber) => {
  return arr.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
};

export default {
  getFilteredList: state => {
    const {searchTerm, page} = state.ui;
    const items = state.items.allIds.map(id => state.items.byIds[id]);
    if (searchTerm === '') {
      return paginateArray(items, PAGE_SIZE, page);
    }

    return paginateArray(
      items.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase())),
      PAGE_SIZE,
      page
    );
  },
  getCurrentPage: state => {
    return state.ui.page;
  },
  getCanGoToNextPage: state => {
    return state.ui.page + 1 < Math.ceil(state.items.allIds.length / PAGE_SIZE);
  },
  getCanGoToPreviousPage: state => state.ui.page > 0,
};
