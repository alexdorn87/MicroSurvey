'strict';
class SurveyCreateController {
  constructor($scope, $log, moment, toastr, $state, AuthUser, SurveyService, DomainService, TrackerData) {
    'ngInject';
    this.$log = $log;
    this.$scope = $scope;
    this.toastr = toastr;
    this.moment = moment;
    this.$state = $state;
    this.userId = AuthUser.getCurrentId();
    this.SurveyService = SurveyService;
    this.DomainService = DomainService;
    this.TrackerData = TrackerData;
    this.showAdvancedOptions = false;
    console.log(AuthUser);
    //show show edit input for title ?
    this.editTitle = false;
    this.display = {
      startDate: {
        opened: false
      },
      endDate:{
        opened: false
      }
    };
    //survey object
    this.survey = {
      "name": "New survey title",
      "filters": [],
      "pageTargeting": [],
      "parameters": {},
      "questions": [
        {
          name: "What question would you like to ask?",
          "inputType": {
            "name": "Text Field",
            "type": "textField"
          },
          "questionNumber": 0
        }
      ],
      "startDate": new Date(),
      "endDate": null,
      "thankYouMessage": "Thanks for your submission",
      "buttons": [
        {}
      ],
      "maxViews": 0,
      "maxAnswers": 0,
      "inPageTime": {
        period: 0,
        format: null,
        enabled: false
      },
      "numberOfPages": {
        quantity: 0,
        enabled: false
      }
    };

    this.previewQuestion = this.survey.questions[0];
    this.previewQuestionIndex = 0;
    //Main filter types
    this.filterTypes = [
      {name: "Device Type", code: 'DEVICE'},
      {name: "SEO Source", code: 'SOURCE'},
      {name: "IP Address", code: 'IP'}
    ];

    this.timePeriods = [
      {name: "Per Week", code: "w"},
      {name: "Per Day", code: "d"},
      {name: "Total", code: "t"}
    ];
    this.timeElapsedType = [
      {name: "Minutes", code: "m"},
      {name: "Seconds", code: "s"}
    ];

    //Device filter options
    this.deviceTypeOptions = ['Desktop', 'Mobile', 'Tablet'];
    this.sourceTypeOptions = ['SEO', 'Paid Search', 'Social'];
    this.ipTypeOptions = [];

    this.filterTypeOptions = this.deviceTypeOptions.concat();

    this.questionTypes = [
      {
        name: "Main Question",
        type: "main"
      },
      {
        name: "Nested Question",
        type: "nested"
      }
    ];

    this.questionInputTypes = [
      {
        name: "Radio Buttons",
        type: "radioButtons"
      },
      {
        name: "Text Field",
        type: "textField"
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
        "rules": [
          {
            "group": {
              rules: [
                {
                  "field": {
                    "name": "Device Type",
                    "code": "DEVICE"
                  },
                  "status": "adding",
                  "data": "",
                  "filterType": "DEVICE"
                }
              ]
            }

          }
        ]
      }
    };

    this.pageTargeting = {
      "group": {
        "rules": [
          {
            "group": {
              rules: [
                {
                  "field": {
                    "name": "Contains",
                    "code": "CONTAINS"
                  },
                  "status": "adding",
                  "data": "",
                  "filterType": "CONTAINS"
                }
              ]
            }

          }
        ]
      }
    };

    this.activate();
  }

  activate() {

  }

  toggleEditTitle(open) {
    this.editTitle = open;
  }

  addFilter(filter) {
    filter.status = 'added';
    this.survey.filters.push({
      status: 'adding',
      filters: [{status: 'adding'}]
    });
    return filter;
  }

  addAndFilter(index, filter) {
    filter.status = 'added';
    this.survey.filters[index].status = 'added';
    this.survey.filters[index].filters.push({
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

  //Creates a new survey and sets its status to 'draft'. Redirects to My survey.
  saveSurvey() {
    this.survey.filters = this.filter.group.rules.concat([]);
    this.survey.pageTargeting = this.pageTargeting.group.rules.concat([]);
    this.SurveyService.createSurvey(this.DomainService.domains.selected.id, this.survey) //domain id)
      .then((response) => {
        if (response) {
          this.$scope.$emit('surveys.reload');
          this.toastr.success(`Survey has been created successfully.`);
          this.$state.go('home.surveys');
        }
      })
      .catch((response) => {
        this.$log.debug(response.data.error.message);
      });
  }

  updateFilterOptions(item, model, currentFilter) {
    switch (item.code) {
      case "DEVICE":
        this.filterTypeOptions = this.deviceTypeOptions.concat();
        break;
      case "SOURCE":
        this.filterTypeOptions = this.sourceTypeOptions.concat();
        break;
      case "IP":
        this.filterTypeOptions = [];
        break;
      default:
        this.filterTypeOptions = [];
        break;
    }
    currentFilter.value = '';
  }

  //Creates the new survey and makes its status 'on'. Redirects to My surveys page.
  saveStartSurvey() {

    this.survey.filters = this.filter.group.rules.concat([]);
    this.survey.pageTargeting = this.pageTargeting.group.rules.concat([]);
    this.survey.status = 'on';
    this.SurveyService.createSurvey(this.DomainService.domains.selected.id, this.survey) //domain id)
      .then((response) => {
        if (response) {
           this.$scope.$emit('surveys.reload');
           this.toastr.success(`Survey has been created and started successfully.`);
           this.$state.go('home.surveys');
        }
      })
      .catch((response) => {
        //this.$log.debug(response);
        console.log(response);
        if (response.data.error.status === 422)
            this.toastr.error('Failed to save. Survey not completed');
      });

  }

  //Creates a new survey keeps the status too 'Draft'. Redirects to My survey summary page.
  saveReviewSurvey() {
    this.survey.filters = this.filter.group.rules.concat([]);
    this.survey.pageTargeting = this.pageTargeting.group.rules.concat([]);
    this.SurveyService.createSurvey(this.DomainService.domains.selected.id, this.survey) //domain id)
      .then((response) => {
        if (response) {
            this.$scope.$emit('surveys.reload');
            this.toastr.success(`Survey has been created successfully.`);
            this.$state.go('home.surveyDetail.details', {id: response.id, domainId: response.domainId});
        }
      })
      .catch((response) => {
        this.$log.debug(response.data.error.message);
      });
  }

  toggleAdvancedOptionsTab() {
    this.showAdvancedOptions = !this.showAdvancedOptions;
  }

}

export default SurveyCreateController;
