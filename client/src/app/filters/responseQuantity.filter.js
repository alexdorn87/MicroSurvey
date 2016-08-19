'strict';
class ResponseQuantityFilter {
  constructor() {
    'ngInject';
  }

  /**
   * Return surveys that match response quantity filter
   * @param items - list of surveys
   * @param qty - responses quantity
   * @returns {Array} - Survey with more or equal to the qty passed.
   */
  showByResponseQty(items, qty) {
    let result = [];
    let item, i = 0;
    if (!qty) { //if no date selected return all items
      return items;
    }
    for (; i < items.length; i++) {
      item = items[i];
      if (item.responseCount >= qty) {
        result.push(item);
      }
    }
    return result;
  }
}

export default ResponseQuantityFilter;
