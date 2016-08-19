'strict';
class MySurveysDirective {
    constructor() {
        'ngInject';

        let directive = {
            restrict: 'E',
            scope: {
                surveys: '=',
                filters: '='
            },
            templateUrl: 'app/components/mysurveys/mysurveys.html',
            controller: MySurveysController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }
}

class MySurveysController {
    constructor($log, $scope, toastr, $state, SurveyService, DomainService) {
        'ngInject';
        this.$log = $log;
        this.toastr = toastr;
        this.$state = $state;
        this.SurveyService = SurveyService;
        this.DomainService = DomainService;
        this.$scope = $scope;
        this.activate();

        $scope.$on('status.change', () => {
          this.activate();
        });
    }

    activate() {
      this.$log.debug(this.$scope.surveys);
    }

    edit() {
    }

    copy(survey) {
      this.SurveyService.copySurvey(survey)//domain id)
        .then((response) => {
          if (response) {
            this.toastr.success(`Survey has been copied.`);
            this.$scope.$emit('surveys.reload');
          }
        })
        .catch((response) => {
          this.$log.debug(response.data.error.message);
        });
    }

    remove(survey) {
        survey.status = 'deleted';
        this.SurveyService.deleteSurvey({
            id: survey.domainId,
            fk: survey.id
        })
        .then(() => {
            this.toastr.warning(`Survey has been deleted.`);
            this.$scope.$emit('surveys.reload');
        });
    }

    toggleSurvey(survey) {
      //Added to reflect model changes.
      survey.status = (survey.status == 'off') ? 'on' : 'off';
      this.SurveyService.updateSurvey({id: survey.domainId, fk: survey.id }, survey)
      .then(() => {
        this.$scope.$emit('status.change');
      })
      .catch((response) => {
        this.$log.debug(response.data.error.message);
      });
    }

    toggleOrderBy(filters) {
      filters.sortOption = filters.sortOption == 'asc' ? 'desc' : 'asc';
    }
    //Added for mysurvey default value.
    getOnOrOff(survey) {
      return {
        'off': survey.status == 'off',
        'on': survey.status == 'on'
      }
    }
    //Added for view of status of the specified survey.
    getisActive(survey) {
      return (survey.status == 'on') ? 'Active' : 'InActive';
    }
    //For toggle state change.
    getToggleState(survey) {
      return survey.status == 'on';
    }
}

export default MySurveysDirective;
