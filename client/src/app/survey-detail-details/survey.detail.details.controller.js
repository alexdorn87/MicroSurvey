'strict';
export default class SurveyDetailDetailsController {
  constructor($log, TrackerData, $stateParams, SurveyService, DomainService) {
    'ngInject';
    this.$log = $log;
    this.uuid = '';
    this.domain = DomainService.domains.selected;
    this.activate($stateParams, SurveyService, DomainService);
  }

  activate($stateParams, SurveyService, DomainService) {

    SurveyService.getSurvey({
        id: DomainService.domains.selected.id,
        fk: $stateParams.id
      })
    .then((survey) => {
      this.survey = survey;
    });
  }

}
