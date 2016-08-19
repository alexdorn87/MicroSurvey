'use strict';

//To add all tags to an array for auto-complete.
Array.prototype.add = (newArray) => {
  this.push.apply(this, newArray);
};

class SortByTagsController{
  constructor($scope, $uibModalInstance, $log, params) {
    'ngInject';
    this.$uibModalInstance = $uibModalInstance;
    this.$log = $log;
    this.$scope = $scope;
    this.questionName = params.question.name;
    this.responses = params.responses;
    this.$scope.selected = undefined;
    this.$scope.testTag = [];

    this.$scope.searchByTags = (question) => {
      var rtnBool = false;
      question.responseTags.forEach((tag)=> {
        if (tag == this.$scope.selected) rtnBool = true;
      })
      return rtnBool;
    }

    this.activate();
  }

  activate() {
    this.$log.info('SortByTag controller...');
    this.$log.info(this.responses);
  }

  cancel() {
    this.$uibModalInstance.dismiss();
  }

  deleteTag(response, tag) {
    this.$log.info('Need to delete tag ',tag);
  }
}

export default SortByTagsController;
