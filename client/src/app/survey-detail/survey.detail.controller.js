'strict';
export default class SurveyDetailController {
  constructor($scope, $log, $stateParams, toastr, $state, AuthUser, DomainService, SurveyResponseService, SurveyService) {
    'ngInject';
    this.$log = $log;
    this.toastr = toastr;
    this.$state = $state;
    this.AuthUser = AuthUser;
    this.userId = this.AuthUser.getCurrentId();
    this.SurveyResponseService = SurveyResponseService;
    this.DomainService = DomainService;
    this.SurveyService  = SurveyService;
    this.$stateParams = $stateParams;
    this.$scope = $scope;
    this.activate();
  }

  activate() {
    this.$log.debug('Survey Detail Controller');
    this.SurveyService.getSurvey({id: this.DomainService.domains.selected.id, fk: this.$stateParams.id })
      .then((survey) => {
        this.survey = survey;
        this.$scope.currentSurvey = survey;
      });
  }

  remove(survey) {
    this.$log.debug(survey);
    this.SurveyService.deleteSurvey({
        id: survey.domainId,
        fk: survey.id
      })
      .then(() => {
        this.toastr.warning(`Survey has been deleted.`);
        this.$scope.$emit('surveys.reload');
      });
  }

  copy(survey) {
    this.SurveyService.copySurvey(survey)//domain id)
      .then((response) => {
        if (response) {
          this.toastr.success(`Survey has been copied.`);
          this.$scope.$emit('surveys.reload');
          this.$state.go('home.surveys', {}, {reload: true});
        }
      })
      .catch((response) => {
        this.$log.debug(response.data.error.message);
      });
  }

}
