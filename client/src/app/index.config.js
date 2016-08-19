/* global Chart:false */
'strict';
export function config($logProvider, toastrConfig, $httpProvider, LoopBackResourceProvider, config) {
  'ngInject';
  // Enable log
  $logProvider.debugEnabled(config.debug);
  //$logProvider.debugEnabled(false);

  // Set options third-party lib
  toastrConfig.allowHtml = true;
  toastrConfig.timeOut = 3000;
  toastrConfig.positionClass = 'toast-top-right';
  toastrConfig.preventDuplicates = true;
  toastrConfig.progressBar = true;

  //set default REST Api Server
  //overrides default generated from LB
  LoopBackResourceProvider.setUrlBase(config.apiBase + 'api');
  LoopBackResourceProvider.setAuthHeader('X-Access-Token');

  $httpProvider.interceptors.push(($q, $location, LoopBackAuth) => {
    return {
      responseError: function(rejection) {
        if (rejection.status === 401) {
          //Now clearing the loopback values from client browser for safe logout...
          LoopBackAuth.clearUser();
          LoopBackAuth.clearStorage();
          $location.nextAfterLogin = $location.path();
          //$location.path('/');
        }
        return $q.reject(rejection);
      }
    };
  });

  Chart.Legend.prototype.draw = function() {
    if (this.options.display) {
      var ctx = this.ctx;
      var cursor = {
        x: this.left + ((this.width - this.lineWidths[0]) / 2),
        y: this.top + this.options.labels.padding,
        line: 0
      };

      var fontColor = Chart.helpers.getValueOrDefault(this.options.labels.fontColor, Chart.defaults.global.defaultFontColor);
      var fontSize = Chart.helpers.getValueOrDefault(this.options.labels.fontSize, Chart.defaults.global.defaultFontSize);
      var fontStyle = Chart.helpers.getValueOrDefault(this.options.labels.fontStyle, Chart.defaults.global.defaultFontStyle);
      var fontFamily = Chart.helpers.getValueOrDefault(this.options.labels.fontFamily, Chart.defaults.global.defaultFontFamily);
      var labelFont = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

      // Horizontal
      if (this.isHorizontal()) {
        // Labels
        ctx.textAlign = "left";
        ctx.textBaseline = 'top';
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = fontColor; // for strikethrough effect
        ctx.fillStyle = fontColor; // render in correct colour
        ctx.font = labelFont;

        Chart.helpers.each(this.legendItems, function(legendItem, i) {
          var textWidth = ctx.measureText(legendItem.text).width;
          var width = this.options.labels.boxWidth + (fontSize / 2) + textWidth;

          if (cursor.x + width >= this.width) {
            cursor.y += fontSize + (this.options.labels.padding);
            cursor.line++;
            cursor.x = this.left + ((this.width - this.lineWidths[cursor.line]) / 2);
          }

          // Set the ctx for the box
          ctx.save();

          var itemOrDefault = function(item, defaulVal) {
            return angular.isDefined(item) ? item : defaulVal;
          };

          ctx.fillStyle = itemOrDefault(legendItem.fillStyle, Chart.defaults.global.defaultColor);
          ctx.lineCap = itemOrDefault(legendItem.lineCap, Chart.defaults.global.elements.line.borderCapStyle);
          ctx.lineDashOffset = itemOrDefault(legendItem.lineDashOffset, Chart.defaults.global.elements.line.borderDashOffset);
          ctx.lineJoin = itemOrDefault(legendItem.lineJoin, Chart.defaults.global.elements.line.borderJoinStyle);
          ctx.lineWidth = itemOrDefault(legendItem.lineWidth, Chart.defaults.global.elements.line.borderWidth);
          ctx.strokeStyle = itemOrDefault(legendItem.strokeStyle, Chart.defaults.global.defaultColor);

          if (ctx.setLineDash) {
            // IE 9 and 10 do not support line dash
            ctx.setLineDash(itemOrDefault(legendItem.lineDash, Chart.defaults.global.elements.line.borderDash));
          }

          // Draw the box
          ctx.beginPath();
          ctx.arc(cursor.x + 30, cursor.y + 8, this.options.labels.boxWidth / 5, 0, 2 * Math.PI);
          //ctx.fillRect(cursor.x, cursor.y, this.options.labels.boxWidth, fontSize);
          ctx.closePath();
          ctx.fill();
          ctx.restore();

          this.legendHitBoxes[i].left = cursor.x;
          this.legendHitBoxes[i].top = cursor.y;

          // Fill the actual label
          ctx.fillText(legendItem.text, this.options.labels.boxWidth + (fontSize / 2) + cursor.x, cursor.y);

          if (legendItem.hidden) {
            // Strikethrough the text if hidden
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.moveTo(this.options.labels.boxWidth + (fontSize / 2) + cursor.x, cursor.y + (fontSize / 2));
            ctx.lineTo(this.options.labels.boxWidth + (fontSize / 2) + cursor.x + textWidth, cursor.y + (fontSize / 2));
            ctx.stroke();
          }

          cursor.x += width + (this.options.labels.padding);
        }, this);
      }
    }
  };
}
