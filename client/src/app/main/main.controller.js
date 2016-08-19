'strict';
class MainController {

    constructor($scope, $log, DomainService, TeamService, SurveyService, SurveyResponseService, UserService, userInfo) {
      'ngInject';
      $log.log('userInfo', userInfo);

      this.$scope = $scope;
      //this.PubSub = PubSub;
      this.$log = $log;
      this.DomainService = DomainService;
      this.TeamService = TeamService;
      this.UserService = UserService;
      this.SurveyResponseService = SurveyResponseService;
      this.surveys = [];
      this.stats = {};
      this.showCreateNewSurvey = false;
      this.showNextSteps = false;
      this.SurveyService = SurveyService;
      this.stats.responseProgress= 0;
      this.stats.domainProgress = 0;
      this.stats.domainLimit = 10;
      this.stats.responseLimit = 1000;
      this.currentStep = 0;
      //$scope.$on('surveys.reload', () => {
      //  this.activate(SurveyService, SurveyResponseService);
      //});
      //
      ////Add for when /survey changes status.
      //$scope.$on('status.change', () => {
      //  this.activate(SurveyService, SurveyResponseService);
      //});
      //
      $scope.$on('domains.change', () => {
        this.activate(SurveyService, SurveyResponseService);
      });

      $scope.$on('teams.change', () => {
        this.activate(SurveyService, SurveyResponseService);
      });
      //
      //$scope.$on('domains.deleted', () => {
      //  DomainService.getDomains()
      //      .then((domains) => {
      //        DomainService.domains.items = domains;
      //        DomainService.domains.selected = domains[0] || DomainService.domains.selected;
      //      });
      //});
      //
      this.activate(SurveyService, SurveyResponseService);

    }

    //TODO: don't forget to start responses db
    activate(SurveyService, SurveyResponseService) {
      console.log(this.TeamService);
      SurveyService.getSurveys(this.DomainService.domains.selected.id)
            .then((surveys) => {
              console.log('surveys', surveys);
              this.surveys = surveys;
              this.surveys.forEach((survey) => {
                survey.miniGraph = {};
                survey.miniGraph.loaded = false;
                console.log(survey.domainId, survey.id);
                SurveyService.getMiniGraphData({id: survey.domainId, surveyId: survey.id})
                  .then((response)=> {
                    this.$log.debug(response);
                    survey.miniGraph.views = response.data.views.data;
                    survey.miniGraph.responses = response.data.responses.data;
                    survey.miniGraph.loaded = true;
                  })
                  .catch((response)=> {
                    this.$log.debug(response);
                  });

                //this.PubSub.subscribe({
                //  collectionName: 'Survey',
                //  method: 'PUT',
                //  modelId: survey.id
                //}, (r, r2) => {
                //  console.log('some action ? :s', r);
                //  console.log(r2);
                //})

              });
              //Instatiate pagination for surveys.
              this.pagination = {
                  start: 0,
                  end: 5,
                  size: 6,
                  startClass: 'disabled',
                  endClass: 'disabled'
                };

              //Pagination check if less then 6 surveys.
              this.lowerBound = this.pagination.start;
              if (this.surveys.length <= this.pagination.size) {
                this.highBound = this.surveys.length;
              } else {
                this.pagination.endClass = 'enabled';
                this.highBound = this.pagination.size;
              }
            });
      SurveyResponseService.getResponses({filter: {where: {domainId: this.DomainService.domains.selected.id}}})
          .then((response)=> {
            this.$log.debug(response);
            this.stats.responsesQty = response.length;
            this.stats.responseProgress = (this.stats.responsesQty / this.stats.responseLimit) * 100;
          })
          .catch((error)=> {
            this.$log.debug(error);
          });

      this.stats.domainQty = this.DomainService.domains.items.length;
      this.stats.domainProgress = (this.stats.domainQty / this.stats.domainLimit) * 100;
    }

    hideCreateNewSurvey() {
      this.showCreateNewSurvey = true;
    }

    hideNextStepsBox() {
      this.showNextStepsBox = true;
    }

    getOnOrOff(survey) {
      //Changed to true and false return.
      return {
        off: survey.status == 'off',
        on: survey.status == 'on',
        draft: survey.status == 'draft'
      };
    }

    getToggleState(survey) {
      return survey.status == 'on';
    }

    toggleSurvey(survey) {
      survey.status = (survey.status == 'off') ? 'on' : 'off';

      //Added to reflect model changes.
      this.SurveyService.updateSurvey({ id: survey.domainId, fk: survey.id }, survey)
      .then(() => {
        this.$scope.$emit('status.change');
      })
      .catch((response) => {
        this.$log.debug(response.data.error.message);
      });
    }

    prevPagination() {
      //Added high and low bounds for display and check start and end.
      if (this.pagination.start < 1 || this.surveys.length < this.pagination.size) {
        return;
      }

      this.pagination.start -= 6;
      this.pagination.end -= 6;

      this.lowerBound = this.pagination.start;
      this.highBound = this.pagination.end + 1;

      if (this.pagination.start <= 1 || this.lowerBound == 0) {
        this.highBound = this.pagination.size;
        this.pagination.endClass = 'enabled';
        this.pagination.startClass = 'disabled';
      } else {
        this.pagination.startClass = 'enabled';
        this.pagination.endClass = 'enabled';
      }
    }

    nextPagination() {
      //Added high and low bounds for display.
      if (this.highBound == this.surveys.length) {
        return;
      }

      this.pagination.start += 6;
      this.pagination.end += 6;

      this.lowerBound = this.pagination.start;
      this.highBound = this.pagination.end + 1;

      if (this.pagination.end >= this.surveys.length || this.highBound == this.surveys.length) {
        this.highBound = this.surveys.length;
        this.pagination.endClass = 'disabled';
        this.pagination.startClass = 'enabled';
      } else {
        this.pagination.endClass = 'enabled';
        this.pagination.startClass = 'enabled';
      }
    }

}

export default MainController;
