/* global malarkey:false, moment:false */
/* eslint-disable */
'strict';
import { config } from './index.config.js';

import { routerConfig } from './index.route.js';

import { domainRouterConfig } from './domain/domain.config';

import { deleteAccountRouterConfig } from './profile-account-settings/deleteAccount.config';

import { runBlock } from './index.run.js';

import {} from './components/lbServices/lb-services';

import {} from './ngConstants';

import {} from './../assets/js/Chart.js/Chart';

import {} from 'angular-gravatar';

//import io from 'socket.io-client';

/*
 Import Controllers
 */
import LoginController from './login/login.controller.js';
import SignUpController from './signup/signup.controller';
import MainController from './main/main.controller.js';
import SurveysController from './surveys/surveys.controller.js';
import SurveyCreateController from './survey/survey.create.controller';
import SurveyEditController from './survey/survey.edit.controller';
import SurveyDetailController from './survey-detail/survey.detail.controller';
import SurveyDetailDetailsController from './survey-detail-details/survey.detail.details.controller';
import SurveyDetailSummaryController from './survey-detail-summary/survey.detail.summary.controller';
import SurveyDetailResponsesController from './survey-detail-responses/survey.detail.responses.controller';
import SurveyDetailReportController from './survey-detail-report/survey.detail.report.controller';
import ProfileController from './profile/profile.controller';
import SitesController from './profile-sites/sites.controller';
import AccountSettingsController from './profile-account-settings/accountSettings.controller';
import PlanAndBillingController from './profile-plan-billing/planAndBilling.controller';
import NotificationsController from './profile-notifications/notifications.controller';
import UsersController from './profile-users/users.controller';
import UsersDetailController from './profile-users/users.detail.controller';
import DomainController from './domain/domain.controller';
import SiteDetailController from './profile-sites-detail/site-detail.controller';
import SendDeveloperModalInstanceController from './profile-sites-detail/send-developer';
import ForgotPasswordController from './forgot-password/forgot-password.controller';
import ResetPasswordController from './forgot-password/reset-password.controller';
import DeleteAccountController from './profile-account-settings/deleteAccount.controller';
import TeamsController from './profile-teams/teams.controller';
import {DialogService, DialogController} from './components/dialog/dialog.service';
//Modal Controller..
import SortByTagsController from './survey-detail-responses/sort-by-tags-controller';

/*
 Import Services
 */
import UserService from './components/user/user.service.js';
import DomainService from './components/domain/domain.service.js';
import TeamService from './components/team/team.service';
import AccountService from './components/account/account.service';
import SurveyService from './components/survey/survey.service';
import SurveyResponseService from './components/surveyResponse/surveyResponse.service';
import EmailService from './components/emailService/email.service';
//import Socket from './components/socket/socket.service';
//import PubSub from './components/pubsub/pubsub.service';

/*
 Import Directives
 */
import NavmenuDirective from './components/navmenu/navmenu.directive';
import MySurveysDirective from './components/mysurveys/mysurveys.directive';
import SurveyFiltersDirective from './components/surveyFilters/surveyFilters.directive';
import SurveyPreviewDirective from './components/surveyPreview/surveyPreview.directive';
import MiniGraphDirective from './components/minigraph/miniGraph.directive';
import DonutGraphDirective from './components/donutgraph/donutGraph.directive';
import BigGraphDirective from './components/biggraph/bigGraph.directive';

/*
 Import Filters
 */
import InDateFilter from './filters/inDate.filter';
import ResponseQuantityFilter from './filters/responseQuantity.filter';
import SortByResponseQuantityFilter from './filters/sortByResponseQuantity.filter';

angular.module('alexio', ['alexio.config', 'ngCookies', 'ngMessages', 'ngSanitize', 'ngResource', 'ui.bootstrap', 'ui.router', 'ui.select', 'toastr', 'lbServices', 'ngCsv', 'ui.gravatar', 'angular-tour', 'angulartics', 'angulartics.google.tagmanager', 'focus-if'])
  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .config(config)

  .config(routerConfig)
  .config(domainRouterConfig)
  .config(deleteAccountRouterConfig)

  .run(runBlock)

  .service('UserService', UserService)
  .service('DomainService', DomainService)
  .service('TeamService', TeamService)
  .service('AccountService', AccountService)
  .service('SurveyService', SurveyService)
  .service('SurveyResponseService', SurveyResponseService)
  .service('EmailService', EmailService)
  .service('DialogService', DialogService)
  //.service('Socket', Socket)
  //.service('PubSub', PubSub)

  .filter('inDateFilter', () => (new InDateFilter()).filter)
  .filter('showByResponseQty', () => (new ResponseQuantityFilter()).showByResponseQty)
  .filter('sortResponses', () => (new SortByResponseQuantityFilter()).sortByResponseQty)

  .controller('LoginController', LoginController)
  .controller('MainController', MainController)
  .controller('SurveysController', SurveysController)
  .controller('SurveyCreateController', SurveyCreateController)
  .controller('SurveyEditController', SurveyEditController)
  .controller('SurveyDetailController', SurveyDetailController)
  .controller('SurveyDetailDetailsController', SurveyDetailDetailsController)
  .controller('SurveyDetailSummaryController', SurveyDetailSummaryController)
  .controller('SurveyDetailResponsesController', SurveyDetailResponsesController)
  .controller('SurveyDetailReportController', SurveyDetailReportController)
  .controller('ProfileController', ProfileController)
  .controller('SitesController', SitesController)
  .controller('AccountSettingsController', AccountSettingsController)
  .controller('PlanAndBillingController', PlanAndBillingController)
  .controller('NotificationsController', NotificationsController)
  .controller('UsersController', UsersController)
  .controller('UsersDetailController', UsersDetailController)
  .controller('DomainController', DomainController)
  .controller('SiteDetailController', SiteDetailController)
  .controller('SendDeveloperModalInstanceController', SendDeveloperModalInstanceController)
  .controller('SignUpController', SignUpController)
  .controller('ForgotPasswordController', ForgotPasswordController)
  .controller('ResetPasswordController', ResetPasswordController)
  .controller('TeamsController', TeamsController)
  .controller('DeleteAccountController', DeleteAccountController)
  .controller('DialogController', DialogController)
  .controller('SortByTagsController', SortByTagsController)//Sort by Tags Modal..
  .directive('navMenu', () => new NavmenuDirective())
  .directive('mySurveys', () => new MySurveysDirective());
//.directive('surveyFilters', () => new SurveyFiltersDirective());
  directive('queryBuilder', SurveyFiltersDirective);
  directive('surveyPreview', SurveyPreviewDirective);
  directive('miniGraph', MiniGraphDirective);
  directive('donutGraph', DonutGraphDirective);
  directive('bigGraph', BigGraphDirective);


function directive(name, constructorFn) {

  constructorFn = _normalizeConstructor(constructorFn);

  if (!constructorFn.prototype.compile) {
    // create an empty compile function if none was defined.
    constructorFn.prototype.compile = () => {
    };
  }

  var originalCompileFn = _cloneFunction(constructorFn.prototype.compile);

  // Decorate the compile method to automatically return the link method (if it exists)
  // and bind it to the context of the constructor (so `this` works correctly).
  // This gets around the problem of a non-lexical "this" which occurs when the directive class itself
  // returns `this.link` from within the compile function.
  _override(constructorFn.prototype, 'compile', function() {
    return function() {
      originalCompileFn.apply(this, arguments);

      if (constructorFn.prototype.link) {
        return constructorFn.prototype.link.bind(this);
      }
    };
  });

  function _cloneFunction(original) {
    return function() {
      return original.apply(this, arguments);
    };
  }

  function _normalizeConstructor(input) {
    var constructorFn;

    if (input.constructor === Array) {
      //
      var injected = input.slice(0, input.length - 1);
      constructorFn = input[input.length - 1];
      constructorFn.$inject = injected;
    } else {
      constructorFn = input;
    }

    return constructorFn;
  }

  function _createFactoryArray(constructorFn) {
    // get the array of dependencies that are needed by this component (as contained in the `$inject` array)
    var args = constructorFn.$inject || [];
    var factoryArray = args.slice(); // create a copy of the array
    // The factoryArray uses Angular's array notation whereby each element of the array is the name of a
    // dependency, and the final item is the factory function itself.
    factoryArray.push((...args) => {
      //return new constructorFn(...args);
      var instance = new constructorFn(...args);
      for (var key in instance) {
        instance[key] = instance[key];
      }
      return instance;
    });

    return factoryArray;
  }

  function _override(object, methodName, callback) {
    object[methodName] = callback(object[methodName])
  }

  var factoryArray = _createFactoryArray(constructorFn);
  //Google tag manager datalayer variable;
  var dataLayer = window.dataLayer = window.dataLayer || [];
  angular.module('alexio').directive(name, factoryArray);
  return this;
}
