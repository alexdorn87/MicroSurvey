'strict';
class SurveyPreviewDirective {
  constructor() {
    'ngInject';
    this.restrict = 'E';
    this.scope = {
      questions: '=',
      selectQuestionIndex: '='
    };
    this.templateUrl = 'app/components/surveyPreview/surveyPreview.html';
    this.controller = SurveyPreviewController;
    this.controllerAs = 'vm';
  }

}


class SurveyPreviewController {
  constructor($scope, toastr) {
    'ngInject';
    this.$scope = $scope;
    this.toastr = toastr;
    this.currentAnswers = "";
    this.optionLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'];

    this.currentQuestionIndex = 0;


    this.$scope.$watchCollection('questions', (newQuestions)=> {
      newQuestions = newQuestions ? newQuestions : [];
      this.lastQuestion = this.isLastQuestion();
      this.currentQuestion = this.$scope.questions[this.currentQuestionIndex];
      this.lastQuestion = this.currentQuestionIndex == newQuestions.length - 1;
    });

    this.$scope.$watch('selectQuestionIndex', (newVal) => {
      this.nextQuestion(newVal);
    });

  }

  nextQuestion(index) {
    if (index >= 0) { //select question from dropdown
      this.currentQuestionIndex = index;
    } else { //go to next question sequentially
      const currentQuestion = this.$scope.questions[this.currentQuestionIndex];
      if (currentQuestion.nested) {

        const nTo = currentQuestion.nested.to;
        const nIf = currentQuestion.nested.if;
        const found = nIf.some((currentIf) => {
          return currentIf == this.currentAnswers;
        });
        this.$log.debug(nTo, nIf, this.currentAnswers, found);
        this.currentAnswers = "";
        if (found) {
          return this.nextQuestion(nTo);
        }
      }


      this.currentQuestionIndex += 1;
    }
    this.lastQuestion = this.isLastQuestion();
    this.currentQuestion = this.$scope.questions[this.currentQuestionIndex];
  }

  isLastQuestion() {
    this.$scope.questions = this.$scope.questions ? this.$scope.questions : [];
    return this.currentQuestionIndex == this.$scope.questions.length - 1;
  }

  sendQuestion() {
    this.toastr.success('Form submitted');
    this.nextQuestion(0);
  }
}


export default SurveyPreviewDirective;
