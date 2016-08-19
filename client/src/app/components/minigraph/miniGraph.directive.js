/* global Chart:false */
'strict';
class MiniGraphDirective {
  constructor($compile, $log) {
    'ngInject';

    this.$log = $log;
    this.restrict = 'E';
    this.scope = {
      data: '=',
      options: '='
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
      legend:{
        display: false
      },
      scales: {
        xAxes: [{
          display: false

        }],
        yAxes: [{
          display: false
        }]
      },
      tooltips: {
        enabled: false
      },
      showScale: false,
      showLines: true,
      bezierCurve: true,
      datasetFill: true,
      scaleShowLabels: false,
      scaleFontSize: 0,
      responsive: true,
      showTooltips: false,
      scaleLineWidth: 0,
      scaleGridLineWidth: 0,
      maintainAspectRatio: true,
      pointDotRadius: 0,
      scaleShowHorizontalLines: false,
      scaleShowVerticalLines: false,
      datasetStroke: true,
      datasetStrokeWidth: 2
    };

    let labels = [];
    for (var i = 0; i < scope.data.length; i++) {
      //labels are needed otherwise won't display
      labels.push('x');

    }
    let data = {
      labels: labels,
      datasets: [
        {
          backgroundColor: "rgba(127, 198, 255, 0.3)",
          borderColor: "#7fc6ff",
          radius: 0,
          fill: true,
          pointBorderWidth: 1,
          pointHoverRadius: 1,
          pointHoverBorderWidth: 1,
          pointBorderColor: "#7fc6ff",
          pointBackgroundColor: "#7fc6ff",
          data: scope.data
        }
      ]
    };
    new Chart(ctx, {
      type: 'line',
      data: data,
      options: opts
    });
  }
}

export default MiniGraphDirective;
