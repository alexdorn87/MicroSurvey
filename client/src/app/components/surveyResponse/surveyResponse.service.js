'strict';
class SurveyResponseService {
    constructor(SurveyResponse) {
        'ngInject';
        this.SurveyResponse = SurveyResponse;
    }

    getResponses(params) {
        return this.SurveyResponse.find(params).$promise;
    }

    deleteResponses(params) {
        return this.SurveyResponse.find(params).$promise;
    }

    updateResponses(params) {
      return this.SurveyResponse.upsert(params).$promise;
    }
}

export default SurveyResponseService;
