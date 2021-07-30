import React from 'react';

export default React.createContext({
  filteredList: [],
  currentPage: undefined,
  canGoToNextPage: false,
  canGoToPreviousPage: false,
  onAddItem: () => {},
  onRemoveItem: () => {},
  onMarkComplete: () => {},
  onMarkIncomplete: () => {},
  onGoToNextPage: () => {},
  onGoToPreviousPage: () => {},
  onSearch: () => {},
});
