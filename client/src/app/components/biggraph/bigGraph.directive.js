/* global Chart:false */
'strict';
import moment from 'moment';

class BigGraphDirective {
  constructor($compile, $log) {
    'ngInject';

    this.$log = $log;
    this.restrict = 'EA';
    this.scope = {
      data: '='
    };
    this.templateUrl = 'app/components/biggraph/bigGraph.html';
    this.replace = true;
    this.$compile = $compile;


  }

  compile(element) {
    this.content = element.contents().remove();
  }

  link(scope, element) {

    let ctx = element.get(0).getContext("2d");
    let opts = {
      //scaleShowGridLines: false,
      scales: {
        xAxes: [{
          gridLines: {
            display: false
          },
          position: "bottom",
          type: 'time',
          time: {
            // string/callback - By default, date objects are expected. You may use a pattern string from http://momentjs.com/docs/#/parsing/string-format/ to parse a time string format, or use a callback function that is passed the label, and must return a moment() instance.
            parser: 'YYYY-MM-DD',
            // string - By default, unit will automatically be detected.  Override with 'week', 'month', 'year', etc. (see supported time measurements)
            unit: 'day',

            // Number - The number of steps of the above unit between ticks
            unitStepSize: 1,

            // string - By default, no rounding is applied.  To round, set to a supported time unit eg. 'week', 'month', 'year', etc.
            round: 'day',

            // Moment js for each of the units. Replaces `displayFormat`
            // To override, use a pattern string from http://momentjs.com/docs/#/displaying/format/
            displayFormats: {
              'day': 'DD.MM'
            },
            // Sets the display format used in tooltip generation
            tooltipFormat: ''
          }
        }]
      },
      //labels:{
      //  boxWidth: 1
      //},
      hover: {
        mode: 'single'
      },
      tooltips:{
        mode: 'single',
        backgroundColor: 'rgba(0,0,0,0.7)',
        titleColor: '#819694',
        //titleAlign: 'center',
        bodyColor: '#fff',
        //bodyAlign: 'center',
        callbacks:{
          title: function (tooltipItems) {
            return moment(tooltipItems[0].xLabel).format("DD MMM YYYY");
          },
          label: function (tooltipItem, data) {
            return data.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.yLabel;
          }
        }
      },
      legend: {
        position: 'bottom',
        doughnutMode: true
      },
      scaleGridLineColor: "#E8EAE9",
      showScale: true,
      bezierCurve: false,
      datasetFill: false,
      scaleShowLabels: true,
      scaleFontSize: 12,
      scaleFontColor: "#C1CAC9",
      responsive: true,
      showTooltips: true,
      tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
      multiTooltipTemplate: "<%= value %>",
      scaleLineWidth: 0,
      scaleGridLineWidth: 0,
      maintainAspectRatio: true,
      pointDotRadius: 5,
      scaleShowHorizontalLines: true,
      scaleShowVerticalLines: false,
      datasetStroke: true,
      datasetStrokeWidth: 5,
      scaleOverride: true,
      scaleSteps: 5,
      radius: 0,
      scaleStartValue: 0
    };





    scope.$watch(()=> { return scope.data }, (newVal) => {
      if (newVal) {
        let data = {
          datasets: [
            {
              label: "Display",
              backgroundColor: "#51A9E8",
              borderColor: "#51A9E8",
              pointBorderColor: "#51A9E8",
              pointBackgroundColor: "#51A9E8",
              fill: false,
              radius: 0,
              hitRadius: 4,
              borderWidth: 5,
              tension: 0,
              data: scope.data ? scope.data.display : []
            },
            {
              label: "Engagement",
              borderColor: "#5AD785",
              backgroundColor: "#5AD785",
              pointBorderColor: "#5AD785",
              pointBackgroundColor: "#5AD785",
              fill: false,
              radius: 0,
              hitRadius: 4,
              borderWidth: 5,
              tension: 0,
              data: scope.data ? scope.data.engagement : []
            },
            {
              label: "Minimize",
              borderColor: "#20A1BE",
              backgroundColor: "#20A1BE",
              pointBorderColor: "#20A1BE",
              pointBackgroundColor: "#20A1BE",
              fill: false,
              radius: 0,
              hitRadius: 4,
              borderWidth: 5,
              tension: 0,
              data: scope.data ? scope.data.minimize : []
            },
            {
              label: "Responses",
              borderColor: "#965CB9",
              backgroundColor: "#965CB9",
              pointBorderColor: "#965CB9",
              pointBackgroundColor: "#965CB9",
              fill: false,
              radius: 0,
              hitRadius: 4,
              borderWidth: 5,
              tension: 0,
              data: scope.data ? scope.data.responses : []
            }
            //{
            //  label: "Time to response",
            //  borderColor: "#E077C6",
            //  backgroundColor: "#E077C6",
            //  pointBorderColor: "#E077C6",
            //  pointBackgroundColor: "#E077C6",
            //  fill: false,
            //  radius: 0,
            //  hitRadius: 4,
            //  borderWidth: 4,
            //  tension: 0,
            //  data: scope.data ? scope.data : this.data[4]
            //}
          ]
        };
        new Chart(ctx, {
          type: 'line',
          data: data,
          options: opts
        });
      }

    });
  }
}

export default BigGraphDirective;
