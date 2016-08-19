"use strict";

export function deviceFilter(deviceType, devices) {
  //if no SOURCE passed, allow all devices
  if (typeof devices === 'undefined' || devices.length === 0) {
    return true;
  }

  if(!Array.isArray(devices)){
    devices = [devices];
  }

  let matchedDevices = devices.filter(current => {
    return current === deviceType;
  });
  return matchedDevices.length > 0;
}

export function ipFilter(clientIP, testIP) {
  if (typeof testIP === 'undefined' || testIP.length === 0) {
    return true;
  }

  if(!Array.isArray(testIP)){
    testIP = [testIP];
  }

  let matchedIPs = testIP.filter(current => {
    return current == clientIP;
  });

  return matchedIPs.length > 0;
}

export function sourceFilter(clientSource, testSource) {
  if (typeof source === 'undefined' || source.length === 0) {
    return true;
  }

  if(!Array.isArray(testSource)){
    testSource = [testSource];
  }

  let matchedTrafficSource = testSource.filter(current => {
    return current == clientSource;
  });

  return matchedTrafficSource.length > 0;
}

//export function checkFilters(filters) {
//  let current = bluebird.resolve();
//  return bluebird.map(filters, (filter) => {
//      //map all filters and return all the results as a single array
//      //the filters array should make up for the ordering importance
//      current = current.then(() => {
//        return this['check' + filter.type.toUpperCase()](filter.value);
//      });
//      return current;
//    })
//    .then((res) => { //res ie. [false, true, true, false]
//      current = res.reduce((acc, value) => {
//        //TODO: replace the && with filter.relation like
//        return acc && value;
//      }, true);
//      return current;
//    });
//}
