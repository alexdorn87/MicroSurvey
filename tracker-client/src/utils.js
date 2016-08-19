"use strict";

import MobileDetect from 'mobile-detect';
import Cookies from 'cookies-js';

export function getDeviceType(userAgent){
  let md = new MobileDetect(userAgent);
  let type = '';
  if (md.mobile() && !md.tablet()) {
    type = 'Mobile';
  } else if (md.tablet()) {
    type = 'Tablet';
  } else {
    type = 'Desktop';
  }
  return type;
}

export function isReturningUser(){
  if (Cookies.get('alex.io_visited')) {
    //count visited times
    Cookies.set('alex.io_visited', Number(Cookies.get('alex.io_visited')) + 1, {expires: 60 * 60 * 24 * 7});
    return true;
  } else {
    //set cookie
    Cookies.set('alex.io_visited', 1, {expires: 60 * 60 * 24 * 7}); // 7 days valid cookie
    //is new visitor
    return false;
  }
}

export function timesVisited(){
  return Number(Cookies.get('alex.io_visited'));
}

export function getCookie(name){
  return Cookies.get(name);
}
