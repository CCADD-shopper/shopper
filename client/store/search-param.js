
const CHANGE_SEARCH_PARAM = 'CHANGE_SEARCH_PARAM';
const CLEAR_SEARCH_PARAM = 'CLEAR_SEARCH_PARAM';

export const changeSearchParam = (searchInput) => ({
  type: CHANGE_SEARCH_PARAM,
  searchInput,
})
export const clearSearchParam = () => ({
  type: CLEAR_SEARCH_PARAM
})

export default (prevState = '', action) => {
  switch (action.type) {

    case CHANGE_SEARCH_PARAM:
      return action.searchInput;

    case CLEAR_SEARCH_PARAM:
      return '';

    default:
      return prevState;
  }
}
