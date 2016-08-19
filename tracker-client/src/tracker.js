"use strict";

import $ from 'jQuery';
import request from 'superagent';
import Cookies from 'cookies-js';
import {getDeviceType, isReturningUser, timesVisited, getCookie} from './utils';
import {deviceFilter, ipFilter, sourceFilter} from './filters';
/**
 * superagent request wrapper for json calls
 * @param url
 * @param verb
 * @param data
 * @param cb
 * @param accepts
 */
const json = function (url, verb, data, cb, accepts) {
  if (typeof accepts == "undefined") {
    accepts = 'application/json'
  }
  if (typeof data == 'function') {
    cb = data;
    data = {};
  }
  request[verb](url)
    .set('Accept', accepts)
    .set('Content-Type', 'application/json')
    .send(data)
    .end(cb);
};

export default class Tracker {
  constructor(opts, global) {
    this.apiUrl = 'http://alex.io/api';
    this.cookieName = 'alexio-ck';
    this.isSending = false; //flag is survey is sending response
    //TODO: set current device type [Mobile, Tablet, Desktop]
    this.window = typeof window === "undefined" ? global : window;
    this.deviceType = this.getDeviceType();
    this.trafficSource = 'Default'; //TODO: get traffic from url
    this.clientIP = '';
    let defaults = {};
    //override defaults with provided opts
    this.opts = $.extend(defaults, opts);
    this.surveyFilters = [];
    this.parameters = {};
    this.uiidCheckUrl = `${this.apiUrl}/tracker/uuid/${this.opts.uuid}`;
    this.getSurveyUrl = `${this.apiUrl}/get-survey`;
    this.language = this.window.navigator.userLanguage || this.window.navigator.language;
    this.returningUser = false;
    this.surveyMinimized = false;

    //check if the user is new or returning
    this.isReturningUser = isReturningUser();
    this.timesVisited = timesVisited();
    this.connectToApi();
  }

  connectToApi() {
    //query UUID to get the survey,domain and userid for this UUID
    json(this.uiidCheckUrl, 'get', (err, response)=> {
      if (err) {
      }
      const data = response.body;
      //UUID exists
      if (data.exists) {
        //this.opts.surveyId = data.surveyId;
        this.opts.countryCode = data.countryCode;
        this.opts.userId = data.userId;
        this.opts.domainId = data.domainId;
        this.parameters = $.extend(this.parameters, data.parameters);
        this.surveyFilters = this.surveyFilters.concat(data.surveyFilters);
        //make the urls
        //this.idSelector = `survey-${this.opts.surveyId}-${this.opts.domainId}-id`;
        this.sendResponseUrl = `${this.apiUrl}/tracker`;
        //this.clientIP = data.clientIP ;
        json(this.getSurveyUrl, 'post', {
          source: this.trafficSource,
          device: this.deviceType,
          pageTarget: this.window.location.pathname + this.window.location.search,
          uuid: this.opts.uuid,
          domainId: data.domainId,
          userId: data.userId,
          countryCode: this.opts.countryCode
        }, (err, response) => {
          if (err) {
          }
          if (response.body) {
            console.log(response.body);
            //obtain view and response count from survey
            this.opts.cursorTrigger = response.body.cursorTrigger || false;
            this.opts.maxAnswers = response.body.maxAnswers || 0;
            this.opts.maxViews = response.body.maxViews || 0;
            this.viewCount = response.body.viewCount || 0;
            this.TTO = response.body.inPageTime;
            this.numberOfPages = response.body.numberOfPages;
            this.responseCount = response.body.responseCount || 0;
            this.opts.surveyId = response.body.id;
            this.questLength = response.body.questions.length;
            this.filters = response.body.filters;
            this.templateUrl = `${this.apiUrl}/${this.opts.userId}/${response.body.domainId}/${response.body.id}/template`;
            this.surveyPosition = response.body.position ? response.body.position : 'right';
            this.skipFilters = response.body.skipFilters || false;
            //track survey calls (intents to render the survey)
            json(`${this.apiUrl}/Surveys/${this.opts.surveyId}/updateVisitCount`, 'post', (err, response) => {
            });
            this.renderTemplate();
          }
        });

        //get all survey filters
      } else {
        //UUID is incorrect or doesn't exist
      }
    });
  }

  sendResponse() {
    if (this.isSending) {
      return;
    }
    this.isSending = true;
    let payload = {};
    payload.domainId = this.opts.domainId;
    payload.surveyId = this.opts.surveyId;
    //current page url
    payload.referrer = this.window.location.href; //referrer url (ie. Traffic source tracking)
    payload.response = this.responseReady;
    payload.timeToResponse = this.timeToResponse ? this.timeToResponse : 0;
    console.log(payload.timeToResponse);
    json(this.sendResponseUrl, 'post', payload, (err, response)=> {
      this.isSending = false;

    });
  }

  processFilters() {
    if (this.opts.maxAnswers > 0 && this.opts.maxAnswers > 0) {
      if (this.responseCount >= this.opts.maxAnswers || this.viewCount >= this.opts.maxAnswers) {
        return false;
      }
    }
    let conditionsToTest = [];
    //lets act on some filters
    this.filters.forEach(filter => {//OR level grouping
      let conditionGroupAND = true;
      filter.group.rules.forEach(filterRule => {//AND level grouping
        if (!!filterRule.condition) {
          if (filterRule.filterType == "LANG") {
            conditionGroupAND = conditionGroupAND && (filterRule.condition.toLowerCase() === this.language.toLowerCase());
          }
          if (filterRule.filterType == "VIS") {
            if (filterRule.condition === "New" && !this.isReturningUser) {
              conditionGroupAND = true;
            } else if (filterRule.condition === "Returning" && this.isReturningUser) {
              conditionGroupAND = true;
            } else {
              conditionGroupAND = false;
            }
          }
          if (filterRule.filterType == "COOKIE") {
            let cookie = getCookie(filterRule.condition.cookieName);
            conditionGroupAND = cookie === filterRule.condition.cookieValue;
          }
        } else {
          conditionGroupAND = false;
        }
      });
      conditionsToTest.push(conditionGroupAND);
    });
    const resolved = conditionsToTest.reduce((acc, testA) => acc || testA, false); //use OR to test
    if (!resolved) {
      return false;
    }
    if (this.TTO && this.TTO.enabled) {
      if (this.TTO.format == 's') {
        this.TTOperiod = this.TTO.period * 1000;
      } else if (this.TTO.format == 'm') {
        this.TTOperiod = this.TTO.period * 60 * 1000;
      }
    }

    if (this.numberOfPages && this.numberOfPages.enabled) {
      if (this.timesVisited <= this.numberOfPages.quantity) return false;
    }

    return true;
  }

  renderTemplate() {
    //if views/answers limit is reached we don't even make the http call.
    //TODO: not show if option checked
    if (this.processFilters() && !this.skipFilters) {
      this.showSurvey();
    }

  }

  showSurvey() {
    setTimeout(() => {
      json(this.templateUrl, 'get', (err, response) => {
        if (err) {
        }

        if (this.opts.cursorTrigger) { // is mouse is out option is selected then only trigger survey when is out of window
          $(document).mouseleave(() => {
            this.surveyBuilder(response, this.surveyPosition);
          });
        } else { // regular flow is out mouse option is not selected.
          this.surveyBuilder(response, this.surveyPosition);
        }
      }, 'text/html');
    }, this.TTOperiod || 10);
  }

  show(id) {
    //survey init wrapped in timeout so is async loaded
    if (this.skipFilters) {
      if (id) { //if id passed show that survey id only if belongs to user and domain
        this.opts.surveyId = id;
        this.templateUrl = `${this.apiUrl}/${this.opts.userId}/${this.opts.domainId}/${id}/template`;
      }
      setTimeout(() => {
        json(this.templateUrl, 'get', (err, response) => {
          if (err)
            this.surveyBuilder(response, this.surveyPosition);
          //displaySurvey();
        }, 'text/html');
      }, 10);
    }
  }

  surveyBuilder(response, renderPosition) {
    //return () => {
    let startTime = new Date();
    let endTime;
    json(`${this.apiUrl}/Surveys/${this.opts.surveyId}/updateViewCount`, 'post', (err, response) => {
    });
    //set cookies value if passed
    if (this.parameters.COOKIE) {
      Cookies.set(this.cookieName, this.parameters.COOKIE.value, {expires: 600}); //10 min.
    }
    const data = response.text;
    let $div = $('<div>');
    $div
      .addClass('alexio-wrapper')
      .addClass(renderPosition)
      .html(data)
      .appendTo('body');
    this.questLength = $div.find('.step').length;
    this.surveyShowing = true;
    let step = $div.find('.step');
    let sendBtn = $div.find('.send');
    let nextBtn = $div.find('.next');
    let replyBtn = $div.find('.reply');
    let radios = $div.find('.form-input-radio');
    let surveyHandle = $div.find('.alexio-survey-handle').addClass('alexio-survey-handle-open');
    let step0 = $div.find('.step').not('.step-0').hide();
    let thankYouMsg = $div.find('.step-final').hide();
    //position the survey bellow the fold
    $div.css({bottom: -($div.height())});
    surveyHandle.removeClass('alexio-survey-handle-open').addClass('alexio-survey-handle-close');
    this.surveyShowing = false;
    if(this.getDeviceType() != 'Desktop'){
      $('.hide-mobile').hide();
      $('.show-mobile').show();
    }else{
      $('.show-mobile').hide();
    }

    radios.on('change', function (e) {
      for (var i = 0; i < radios.length; i++) {
        var radio = radios[i];
        if(radio.checked){
          radio.parentNode.parentNode.className = radio.parentNode.parentNode.className + ' selected';
        }else{
          radio.parentNode.parentNode.className = radio.parentNode.parentNode.className.replace(' selected', '');
        }
      }
    });


    $div.animate({bottom: 0});
    this.surveyShowing = true;
    surveyHandle.removeClass('alexio-survey-handle-close').addClass('alexio-survey-handle-open');

    replyBtn.click(event => {
      event.preventDefault();
      $('.show-mobile').hide();
      $('.hide-mobile').show();
    });

    //Logic operations for next button to iterate through questions.
    let questIteration = 0;
    (this.questLength == 1) ? nextBtn.hide() : (nextBtn.show() && sendBtn.hide());
    nextBtn.click(event => {
      event.preventDefault();
      const currentQuest = step.eq(questIteration);

      // get the if data comes as comma delimited array
      let qIf = currentQuest.data('if');
      qIf = qIf.split(",");

      // get the question to go in case of nested question, comes as integer
      let qTo = currentQuest.data('to');

      //using a generic lookup for checked input, cause only selection based question are nestable
      let selectedAnswer = currentQuest.find('input:checked').val();
      let matchesCondition = false;

      if (!!selectedAnswer) { //coerce the value to its boolean sexy self

        //check if any of the conditions matches the answer selected
        matchesCondition = qIf.some((current) => {
          return current == selectedAnswer;
        });
      }

      // hide current after logic to prevent un desirable looks
      currentQuest.hide();

      if (matchesCondition) {
        questIteration = qTo;
        step.eq(questIteration).show();
      } else {
        step.eq((questIteration += 1)).show();
      }

      // decide whether to show the send or next button based on the question index.
      (questIteration == (this.questLength - 1)) ? (nextBtn.hide() && sendBtn.show()) : nextBtn.show();
    });

    sendBtn.click(event => {
      event.preventDefault();
      endTime = new Date();
      this.timeToResponse = endTime - startTime;
      //To hide survey when send is pressed.
      this.responseReady = $div.find('form').serializeArray();
      $div.find('.step').hide();
      $div.find('.form-buttons').hide();
      thankYouMsg.show();
      this.sendResponse();
      setTimeout(()=> {
        $div.find('.alexio-survey-handle').hide();
        $div.find('.form-questions').hide();
        $div.find('.form-footer').hide();
      }, 4 * 1000);

    });

    surveyHandle.click(event => {
      event.preventDefault();
      if (this.surveyShowing) {
        $div.animate({bottom: -($div.height())});
        surveyHandle.removeClass('alexio-survey-handle-open').addClass('alexio-survey-handle-close');
        this.surveyShowing = false;
      } else {
        $div.animate({bottom: 0});
        this.surveyShowing = true;
        surveyHandle.removeClass('alexio-survey-handle-close').addClass('alexio-survey-handle-open');
      }
      if(surveyHandle.hasClass('alexio-survey-handle-close') && !this.surveyMinimized){
        json(`${this.apiUrl}/Surveys/${this.opts.surveyId}/updateMinimizeCount`, 'post', (err, response) => {
          this.surveyMinimized = true;
        });
      }
    });
    //}
  }

  getDeviceType() {
    return getDeviceType(this.window.navigator.userAgent);
  }
}
