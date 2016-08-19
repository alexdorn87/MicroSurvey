'strict';

//To add all tags to an array for auto-complete.
Array.prototype.add = (newArray) => {
  this.push.apply(this, newArray);
};

export default class SurveyDetailResponsesController {
  constructor($scope, $log, $filter, $stateParams, SurveyResponseService, DomainService, SurveyService, $uibModal) {
    'ngInject';

    this.$scope = $scope;
    this.$log = $log;
    this.$stateParams = $stateParams;
    this.SurveyResponseService = SurveyResponseService;
    this.domain = DomainService.domains.selected;
    this.numNotReviewed = 0;
    this.tagNum = 0;
    this.$uibModal = $uibModal;
    this.newTag = undefined;

    //$scope variables..
    this.$scope.surveys = {};

    $scope.$on('question.change',() => {
        this.getSurveyResponses(SurveyResponseService);
    });

    this.activate($stateParams, SurveyResponseService, SurveyService, DomainService);
  }

  activate() {
    this.$log.debug('survey responses controller');
    this.SurveyResponseService.getResponses({
        filter:{
          where: {
            domainId: this.$stateParams.domainId,
            surveyId: this.$stateParams.surveyId
          }
        }
      })
      .then((responses) => {
        this.responses = responses;
      });
  }

  activate($stateParams, SurveyResponseService, SurveyService) {
    this.$log.debug('survey responses controller');
    SurveyService.getSurvey({
      id: this.domain.id,
      fk: $stateParams.id
    })
    .then((survey)=> {
      this.survey = survey;
       this.survey.questions.selected = {
         name: this.survey.questions[0].name
       };
       this.changeQuestion();
      SurveyResponseService.getResponses({
          filter:{
            where: {
              domainId: this.domain.id,
              surveyId: this.survey.id
            }
          }
        })
        .then((responses) => {
          this.responses = responses;
          this.responses.forEach(function (res) {
            res.response.forEach(function(question) {
                if (question.isReviewed != true) this.numNotReviewed++;
            },this);
          },this);
        });
    });
  }

  getSurveyResponses(SurveyResponseService) {
    SurveyResponseService.getResponses({
        filter:{
          where: {
            domainId: this.domain.id,
            surveyId: this.survey.id
          }
        }
      })
      .then((responses) => {
        this.responses = responses;
      });
  }

  changeQuestion() {
    this.questionName = this.survey.questions.selected.name;
    this.$scope.$emit('question.change');
  }

  getExportResponses() {
    let formatCSV = [];
    this.responses.forEach(function(res) {
      res.response.forEach(function(index) {
        formatCSV.push({
          Question: index.name,
          Answer: index.value
         });
        });
      });
    return formatCSV;
  }

  reviewedClick(survey) {

    if (this.numNotReviewed < 1) {
      this.numNotReviewed = 0;
    } else {
        this.numNotReviewed--;
    }

    survey.response.forEach((question) => {
      if (question.name == this.questionName) question.isReviewed = true;
    });
  //Update survey response to isReviewed true.
  this.SurveyResponseService.updateResponses(survey)
    .then((res) => {
      this.$log.debug('Survey update successful');
      this.$log.debug(res);
    });
  }

  addTag(survey, $event) {
    var isEmptyString = (this.newTag == "" || this.newTag == undefined) ? true : false;
    if(isEmptyString){
      this.$log.debug('Tag empty');
      $event.target.blur();
    }else{
      for(var i = 0; i < survey.response.length; i++){
        if (survey.response[i].name.toLowerCase() == this.questionName.toLowerCase() && angular.isUndefined(survey.response[i].responseTags)) {
           this.$log.debug('Questioned tagged: ', survey.response[i]);
           survey.response[i].responseTags = [];
           survey.response[i].responseTags.push(this.newTag);
           break;
         } else if (survey.response[i].name.toLowerCase() == this.questionName.toLowerCase()) {
           this.$log.debug('Adding a new tag');
           survey.response[i].responseTags.push(this.newTag);
           break;
         }
      }
      this.SurveyResponseService.updateResponses(survey)
      .then(() => {
        this.$log.debug("Tag Added : ", this.newTag);
        this.newTag = undefined;
        $event.target.blur();
      });
    }
  }

  sortByTags(questionSelected) {
    var self = this;
    var modalInstance = this.$uibModal.open({
      animation: true,
      windowClass: 'alexio-modal',
      templateUrl: 'app/survey-detail-responses/survey-detail-responses-modal/sort-by-tags.html',
      controller: 'SortByTagsController as vm',
      resolve: {
          params: function () {
            self.$log.info('Sending responses to modal..');
            return {responses: self.responses, question: questionSelected};
          }
        }
      });

    modalInstance.result.then((result) => {
      this.$log.debug(result);
      this.$log.debug('closed');
    }, this);
  }

  deleteTag(survey, tagName) {
    survey.response.forEach((question) => {
      if (question.responseTags != null) {
        question.responseTags.forEach((tag, index)=> {
          if (tag == tagName) {
            question.responseTags.splice(index, 1);
          }
        });
      }
    });

    //Update Survey Responses...
    this.SurveyResponseService.updateResponses(survey)
    .then(() => {
      this.$log.debug("Deleted Tag: ", tagName);
    });
  }
}
