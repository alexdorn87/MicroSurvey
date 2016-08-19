'strict';
class SortByResponseQuantityFilter {
  constructor() {
    'ngInject';
  }

  /**
   * Return surveys that match response quantity filter
   * @param items - list of surveys
   * @param orderBy - [asc | desc]
   * @returns {Array} - Survey with more or equal to the qty passed.
   */
  sortByResponseQty(items, orderBy) {
    let result = [];
    if (!orderBy) { //if no date selected return all items
      return items;
    }
    if (orderBy == 'asc') {
      result = items.sort((a, b) => {
        return a.responseCount - b.responseCount;
      });
    }

    if (orderBy == 'desc') {
      result = items.sort((a, b) => {
        return b.responseCount - a.responseCount;
      });
    }



    return result;
  }
}

export default SortByResponseQuantityFilter;
