'strict';
class SurveyEditController {
  constructor($log, $scope, toastr, $state, $stateParams, AuthUser, SurveyService, DomainService) {
    'ngInject';

    this.$log = $log;
    this.$scope = $scope;
    this.toastr = toastr;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.userId = AuthUser.getCurrentId();
    this.SurveyService = SurveyService;
    this.DomainService = DomainService;
    this.previewQuestionIndex = 0;
    this.showAdvancedOptions = false;
    //Status variables.
    this.toggleState = false;
    this.isActive = '';
    //show show edit input for title ?
    this.editTitle = false;
    //Main filter types
    this.filterTypes = [
      {name: 'Device Type', code: 'DEVICE'},
      {name: 'SEO Source', code: 'SOURCE'},
      {name: 'IP Address', code: 'IP'}
    ];

    //Device filter options
    this.deviceTypeOptions = ['Desktop', 'Mobile', 'Tablet'];
    this.sourceTypeOptions = ['SEO', 'Paid Search', 'Social'];
    this.ipTypeOptions = [];

    this.timePeriods = [
      {name: "Per Week", code: "w"},
      {name: "Per Day", code: "d"},
      {name: "Total", code: "t"}
    ];
    this.timeElapsedType = [
      {name: "Minutes", code: "m"},
      {name: "Seconds", code: "s"}
    ];

    this.filterTypeOptions = this.deviceTypeOptions.concat();

    this.questionTypes = [
      {
        name: 'Main Question',
        type: 'main'
      },
      {
        name: 'Nested Question',
        type: 'nested'
      }
    ];

    this.questionInputTypes = [
      {
        name: 'Radio Buttons',
        type: 'radioButtons'
      },
      {
        name: 'Text Field',
        type: 'textField'
      },
      {
        name: "Scale",
        type: "scale"
      },
      {
        name: "Emotion",
        type: "emotion"
      }
    ];

    this.optionLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

    this.filter = {
      "group": {
        "rules": []
      }
    };

    this.pageTargeting = {
      "group": {
        "rules": []
      }
    };

    this.activate();

    $scope.$on('status.change', () => {
      this.activate();
    });
  }

  activate() {
    this.SurveyService.getSurvey(this.$stateParams.id)
      .then((survey) => {
        console.log(survey);
        survey.startDate = survey.startDate ? new Date(survey.startDate) : survey.startDate;
        survey.endDate = survey.endDate ? new Date(survey.endDate) : survey.endDate;
        this.survey = survey;
        this.survey.filters = this.survey.filters || [];
        this.survey.pageTargeting = this.survey.pageTargeting || [];
        this.filter.group.rules = this.survey.filters.concat([]);
        this.pageTargeting.group.rules = this.survey.pageTargeting.concat([]);

        this.previewQuestion = this.survey.questions[0];
        this.previewQuestionIndex = 0;

        this.toggleState = (this.survey.status == 'on');
        this.isActive = (this.survey.status == 'on') ? 'active' : 'inactive';
      });
  }

  toggleEditTitle(open) {
    this.editTitle = open;
  }

  addFilter(filter) {
    filter.status = 'added';
    this.survey.filters.push({
      status: 'adding'
    });
    return filter;
  }

  removeFilter(index) {
    return this.survey.filters.splice(index, 1);
  }

  updateFilter(filter) {
    filter.status = 'added';
    return filter;
  }

  editFilter(filter) {
    filter.status = 'edit';
    return filter;
  }

  addQuestion() {
    this.survey.questions.push({
      name: "What question would you like to ask?",
      "inputType": {
        "name": "Text Field",
        "type": "textField"
      },
      "questionNumber": this.survey.questions.length
    });
  }

  removeQuestion(index) {
    return this.survey.questions.splice(index, 1);
  }

  addRadioOption(question) {
    question.radioOptions = question.radioOptions || [];
    question.radioOptions.push({
      value: "",
      name: "",
      letterOption: question.radioOptions.length > 0 ? this.optionLetters[question.radioOptions.length] : 'A'
    });
  }

  removeRadioOption(question, index) {
    return question.radioOptions.splice(index, 1);
  }

  changeSurveyPreviewSelect(activeIndex) {
    this.previewQuestionIndex = activeIndex;
  }

  onQuestionInputTypeSelect(item, model, question) {
    this.$log.debug(item, model, question);
    question.nested && (question.nested.if = []);
  }


  //Save the survey and sets its status to 'draft'. Redirects to my survey page.
  saveSurvey() {
    this.survey.status = 'off';
    this.survey.filters = this.filter.group.rules.concat([]);
    this.survey.pageTargeting = this.pageTargeting.group.rules.concat([]);
    this.SurveyService.updateSurvey({id: this.$stateParams.domainId, fk: this.$stateParams.id}, this.survey) //domain id)
      .then((response) => {
        this.$scope.$emit('status.change');
        if (response) {
          this.toastr.success(`Survey has been updated successfully.`);
          this.$state.go('home.surveys');
        }
      })
      .catch((response) => {
        this.$log.debug(response.data.error.message);
      });
  }

  updateFilterOptions(item, model, currentFilter) {
    switch (item.code) {
      case 'DEVICE':
        this.filterTypeOptions = this.deviceTypeOptions.concat();
        break;
      case 'SOURCE':
        this.filterTypeOptions = this.sourceTypeOptions.concat();
        break;
      case 'IP':
        this.filterTypeOptions = [];
        break;
      default:
        this.filterTypeOptions = [];
        break;
    }

    currentFilter.value = '';
  }

  //Saves the survey and sets the status to 'on'. Redirects to my survey page.
  saveStartSurvey() {
    this.survey.status = 'on';
    this.survey.filters = this.filter.group.rules.concat([]);
    this.survey.pageTargeting = this.pageTargeting.group.rules.concat([]);
    this.SurveyService.updateSurvey({id: this.$stateParams.domainId, fk: this.$stateParams.id}, this.survey) //domain id)
      .then((response) => {
        if (response) {
          this.$scope.$emit('status.change');
          this.toastr.success(`Survey has been updated successfully and started.`);
          this.$state.go('home.surveys');
        }
      })
      .catch((response) => {
        this.$log.debug(response.data.error.message);
      });
  }

  //Saves the survey and does not change the current status. Redirects to my survey summary page.
  saveReviewSurvey() {
    this.survey.filters = this.filter.group.rules.concat([]);
    this.survey.pageTargeting = this.pageTargeting.group.rules.concat([]);
    this.SurveyService.updateSurvey({id: this.$stateParams.domainId, fk: this.$stateParams.id}, this.survey) //domain id)
      .then((response) => {
        if (response) {
          this.toastr.success(`Survey has been updated successfully.`);
          this.$state.go('home.surveyDetail.details', {id: this.survey.id, domainId: this.$stateParams.domainId});
        }
      })
      .catch((response) => {
        this.$log.debug(response.data.error.message);
      });
  }

  //Saves the survey when toggled and changes status appropriately. Does not redirect page.
  toggleSurvey() {
    this.survey.status = (this.survey.status == 'off') ? 'on' : 'off';
    this.survey.filters = this.filter.group.rules.concat([]);
    this.survey.pageTargeting = this.pageTargeting.group.rules.concat([]);
    this.SurveyService.updateSurvey({id: this.survey.domainId, fk: this.survey.id}, this.survey)
      .then(() => {
        this.$scope.$emit('status.change');
      })
      .catch((response) => {
        this.$log.debug(response.data.error.message);
      });
  }

  toggleAdvancedOptionsTab() {
    this.showAdvancedOptions = !this.showAdvancedOptions;
  }

}

export default SurveyEditController;
