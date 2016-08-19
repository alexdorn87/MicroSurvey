/* global Chart:false */
'strict';
class DonutGraphDirective {
  constructor($compile, $log) {
    'ngInject';

    this.$log = $log;
    this.restrict = 'EA';
    this.scope = {
      color: '=',
      label: '=',
      percent: '='
    };
    this.templateUrl = 'app/components/minigraph/miniGraph.html';
    this.replace = true;
    this.$compile = $compile;
  }

  compile(element) {
    this.content = element.contents().remove();
  }

  link(scope, element) {
    let ctx = element.get(0).getContext("2d");
    let opts = {
      tooltips: {
        enabled: false
      },
      responsive: true,
      showTooltips: false,
      legend:{
        display: false
      }
    };

    scope.$watch(()=> { return scope.percent }, (newVal) => {
      if (newVal) {
        let data = {
          labels: ['x', 'x'],
          datasets: [
            {
              data: [scope.percent ? scope.percent : 0, scope.percent ? 100 - scope.percent : 100],
              backgroundColor: [
                scope.color ? scope.color : "#51A9E8",
                "#DDE2E5"
              ]
            }
          ]
        };
        new Chart(ctx,{
          type: 'doughnut',
          data: data,
          options: opts
        });
      }

    });


  }
}

export default DonutGraphDirective;
