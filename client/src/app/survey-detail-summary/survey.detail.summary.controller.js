'strict';
export default class SurveyDetailSummaryController {
  constructor($scope, $log, DomainService, SurveyService) {
    'ngInject';
    this.$scope = $scope;
    this.$log = $log;
    this.DomainService = DomainService;
    this.SurveyService = SurveyService;
    this.activate();
  }

  activate() {
    this.domainUrl = this.DomainService.domains.selected.url;
    this.survey = { current: this.$scope.$parent.currentSurvey };

    let currentSurveyWatch = this.$scope.$watch('$parent.currentSurvey', (newVal) => {
      if (newVal) {
        this.SurveyService.getSummaryData({id: newVal.id})
          .then((response)=> {
            this.$log.debug(response.summary);
            this.processResponseData(response.data);
            //un register watch to prevent un desired calls
            currentSurveyWatch();
          })
      }
    });
  }

  processResponseData(data) {
    this.$log.debug(data);
    this.donuts = data.donuts;
    this.summary = data.summary;
  }
}
