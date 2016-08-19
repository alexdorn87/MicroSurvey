'strict';
class SurveysController {
  constructor($log, DomainService, SurveyService, SurveyResponseService, $scope) {
    'ngInject';

    this.$log = $log;
    this.DomainService = DomainService;
    this.SurveyService = SurveyService;
    this.SurveyResponseService = SurveyResponseService;
    this.surveys = [];
    this.filters = {};
    this.filters.surveysBy = {
      items: [{name: 'All my surveys', id: 'all'}],
      selected: {name: 'All my surveys', id: 'all'}
    };
    this.filters.created = {opened: false};
    this.filters.responses = {
      items: [
        {name: '> 0', id: 0},
        {name: '> 10', id: 10},
        {name: '> 50', id: 50},
        {name: '> 100', id: 100}
      ],
      selected: {name: '> 0', id: '0'}
    };
    this.filters.search = '';
    this.activate();

    //Registering events
    const surveysReloadListener = $scope.$on('surveys.reload', () => {
      $log.debug('reloading surveys...');
      this.reloadSurveys();
    });

    $scope.$on('domains.change', ()=> {
      this.activate();
    });

    //De registering event
    $scope.$on('$destroy', () => {
      surveysReloadListener();
    });


  }

  activate() {
    this.reloadSurveys();
  }

  reloadSurveys() {
    this.SurveyService.getSurveys(this.DomainService.domains.selected.id)
      .then((surveys) => {
        this.$log.debug(surveys);
        this.surveys = surveys;
        /**
         * Getting response count for each survey manually.
         * TODO: create a remote method or create a query to do this in a single line or in db directly
         */
        //surveys.forEach((survey, index)=> {
        //  this.SurveyResponseService.getResponses({
        //     filter:{
        //       where: {
        //         domainId: survey.domainId,
        //         surveyId: survey.id
        //       }
        //     }
        //    })
        //    .then((responses) => {
        //      this.$log.debug("responses: ",responses);
        //      surveys[index].responseQty = responses.length || 0;
        //    });
        //});
      });
  }
}

export default SurveysController;
