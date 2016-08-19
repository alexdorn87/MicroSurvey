'strict';
export function routerConfig($stateProvider, $urlRouterProvider) {
    'ngInject';

    //Function for unsubscribing..
    //const unSubscribeAll = (PubSub) => {
    //  //Unsubscribe all listeners..
    //  PubSub.unSubscribeAll();
    //};

    $stateProvider
        .state('login', {
            url: '/',
            templateUrl: 'app/login/login.html',
            controller: 'LoginController',
            controllerAs: 'vm'
        })

        .state('signup', {
          url: '/sign-up',
          templateUrl: 'app/signup/signup.html',
          controller: 'SignUpController',
          controllerAs: 'vm'
          ////onExit: unSubscribeAll
        })

        .state('forgotpassword', {
          url: '/forgot-password',
          templateUrl: 'app/forgot-password/forgot-password.html',
          controller: 'ForgotPasswordController',
          controllerAs: 'vm'
          //onExit: unSubscribeAll
        })

        .state('resetpassword', {
          url: '/reset-password',
          templateUrl: 'app/forgot-password/reset-password.html',
          controller: 'ResetPasswordController',
          controllerAs: 'vm'
          //onExit: unSubscribeAll
        })

        .state('home', {
            url: '/home',
            templateUrl: 'app/main/main.html',
            controller: 'MainController',
            controllerAs: 'main',
            //onExit: unSubscribeAll,
            authenticate: true,
            resolve: {
                'userInfo': (AuthUser, AccountService, UserService, TeamService, DomainService, LoopBackAuth) => {
                  return AuthUser.getAllRelatedInfo({userId: LoopBackAuth.currentUserId}).$promise
                      .then((res) => {
                        AccountService.accountId = res.data.account.id;
                        TeamService.teams.items = res.data.teamsIOwn;
                        TeamService.teams.selected = TeamService.teams.items[0];

                        DomainService.domains.items = res.data.domains;
                        DomainService.domains.selected = DomainService.domains.items[0];
                        return res.data;
                      }, (res) => {
                        return res.data;
                      });
                }
                //'teams': (AuthUser, TeamService) => {
                //    return TeamService.getTeams()
                //        .then((teams) => {
                //            console.log(teams);
                //            TeamService.teams.items = teams;
                //            TeamService.teams.selected = teams[0] || TeamService.teams.selected;
                //        });
                //},
                //'accountsIOwn': (UserService) => {
                //  return UserService.getMyAccounts()
                //    .then((accounts) => {
                //      UserService.accountsIOwn.items = accounts;
                //      UserService.accountsIOwn.selected = accounts[0] || UserService.accountsIOwn.selected;
                //      return accounts;
                //    });
                //},
                //'teamsIOwn': (Account, AccountService, accountsIOwn) => {
                //  for (var i = 0; i < accountsIOwn.length; i++) {
                //    var account = accountsIOwn[i];
                //    Account.teams({id: account.userId}).$promise.then((res)=> {
                //      AccountService.teamsIOwn.items.push(...res);
                //    });
                //  }
                //}
            }
        })

        .state('home.profile', {
            url: '/profile',
            templateUrl: 'app/profile/profile.html',
            controller: 'ProfileController',
            controllerAs: 'vm',
            //onExit: unSubscribeAll,
            authenticate: true
        })
        .state('home.profile.sites', {
            url: '/sites',
            templateUrl: 'app/profile-sites/sites.html',
            controller: 'SitesController',
            controllerAs: 'vm',
            //onExit: unSubscribeAll,
            resolve: {
                'domains': (AuthUser, DomainService) => {
                    return DomainService.getDomains()
                        .then((domains) => {
                            return domains;
                        });
                }
            },
            authenticate: true
        })

        .state('home.profile.sites.detail', {
          url: '/:id',
          templateUrl: 'app/profile-sites-detail/site-detail.html',
          controller: 'SiteDetailController',
          controllerAs: 'vm',
          //onExit: unSubscribeAll,
          authenticate: true
        })

        .state('home.profile.accountSettings', {
            url: '/settings',
            templateUrl: 'app/profile-account-settings/accountSettings.html',
            controller: 'AccountSettingsController',
            controllerAs: 'vm',
            //onExit: unSubscribeAll,
            authenticate: true
        })

        .state('home.profile.planAndBilling', {
            url: '/plan-and-billing',
            templateUrl: 'app/profile-plan-billing/planAndBilling.html',
            controller: 'PlanAndBillingController',
            controllerAs: 'vm',
            //onExit: unSubscribeAll,
            authenticate: true
        })
        .state('home.profile.notifications', {
            url: '/notifications',
            templateUrl: 'app/profile-notifications/notifications.html',
            controller: 'NotificationsController',
            controllerAs: 'vm',
            //onExit: unSubscribeAll,
            authenticate: true
        })

        .state('home.profile.users', {
            url: '/users',
            templateUrl: 'app/profile-users/users.html',
            controller: 'UsersController',
            controllerAs: 'vm',
            //onExit: unSubscribeAll,
            authenticate: true
        })

        .state('home.profile.users.detail', {
          url: '/:teamId',
          templateUrl: 'app/profile-users/users-detail.html',
          controller: 'UsersDetailController',
          controllerAs: 'vm',
          //onExit: unSubscribeAll,
          authenticate: true
        })

        .state('home.profile.teams', {
            url: '/teams',
            templateUrl: 'app/profile-teams/teams.html',
            controller: 'TeamsController',
            controllerAs: 'vm',
            //onExit: unSubscribeAll,
            authenticate: true
        })

        .state('home.surveys', {
            url: '/surveys',
            templateUrl: 'app/surveys/surveys.html',
            controller: 'SurveysController',
            controllerAs: 'vm',
            //onExit: unSubscribeAll,
            authenticate: true
        })

        .state('home.surveyCreate', {
            url: '/surveys/create',
            templateUrl: 'app/survey/survey.create.html',
            controller: 'SurveyCreateController',
            controllerAs: 'vm',
            //onExit: unSubscribeAll,
            authenticate: true
        })

        .state('home.surveyDetail', {
            url: '/surveys/:domainId/:id',
            templateUrl: 'app/survey-detail/survey.detail.html',
            controller: 'SurveyDetailController',
            controllerAs: 'vm',
            //onExit: unSubscribeAll,
            authenticate: true
        })

        .state('home.surveyDetail.summary', {
            url: '/summary',
            templateUrl: 'app/survey-detail-summary/survey.detail.summary.html',
            controller: 'SurveyDetailSummaryController',
            controllerAs: 'vm',
            //onExit: unSubscribeAll,
            authenticate: true
        })

      .state('home.surveyDetail.details', {
            url: '/details',
            templateUrl: 'app/survey-detail-details/survey.detail.details.html',
            controller: 'SurveyDetailDetailsController',
            controllerAs: 'vm',
            //onExit: unSubscribeAll,
            authenticate: true
        })

      .state('home.surveyDetail.responses', {
            url: '/responses',
            templateUrl: 'app/survey-detail-responses/survey.detail.responses.html',
            controller: 'SurveyDetailResponsesController',
            controllerAs: 'vm',
            //onExit: unSubscribeAll,
            authenticate: true
        })

        .state('home.surveyDetail.responses.all',{
            url: "/all",
            templateUrl: 'app/survey-detail-responses/survey.detail.responses.all.html'
        })

        .state('home.surveyDetail.responses.new', {
          url: "/new",
          templateUrl: 'app/survey-detail-responses/survey.detail.responses.new.html'
        })

      .state('home.surveyDetail.report', {
            url: '/report',
            templateUrl: 'app/survey-detail-report/survey.detail.report.html',
            controller: 'SurveyDetailReportController',
            controllerAs: 'vm',
            //onExit: unSubscribeAll,
            authenticate: true
        })

        .state('home.surveyEdit', {
            url: '/surveys/:domainId/:id/edit',
            templateUrl: 'app/survey/survey.edit.html',
            controller: 'SurveyEditController',
            controllerAs: 'vm',
            //onExit: unSubscribeAll,
            authenticate: true
        });

    $urlRouterProvider.otherwise('/');
}
