/* global moment:false */
'strict';
class InDateFilter {
  constructor() {
    'ngInject';
  }

  /**
   * Return surveys that match filter marked on the calendar
   * @param items - list of surveys
   * @param onDate - Date Object
   * @returns {Array} - Matching surveys on the date
     */
  filter(items, onDate) {
    let result = [];
    let item, i = 0;
    if (!onDate) { //if no date selected return all items
      return items;
    }
    for (; i < items.length; i++) {
      item = items[i];
      if (moment(item.created).format('DD/MM/YYYY') === moment(onDate).format('DD/MM/YYYY')) {
        result.push(item);
      }
    }
    return result;
  }
}

export default InDateFilter;
