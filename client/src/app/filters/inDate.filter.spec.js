(function() {
  'use strict';
  var $rootScope, moment, surveys;
  describe('In Date Filter', function() {
    console.log('Describe Filter');
    beforeEach(angular.mock.module('alexio'));

    beforeEach(inject(function(_$rootScope_, _moment_) {
      $rootScope = _$rootScope_;
      moment = _moment_;

      surveys = JSON.parse('[{"name":"Some smart name","status":null,"filters":[{"type":{"name":"SEO Source","code":"SOURCE"},"value":"Paid Search"}],"parameters":{},"questions":[{"name":"test","inputType":{"name":"Text Field","type":"textField"},"type":{"name":"Main Question","type":"main"}}],"buttons":[{}],"thankYouMessage":"Thanks for your submission adasdsa","created":"2015-11-24T21:21:16.425Z","endDate":null,"id":20,"domainId":1},{"name":"Weird short title","status":null,"filters":[{"type":{"name":"SEO Source","code":"SOURCE"},"value":"Mobile"},{"type":{"name":"Device Type","code":"DEVICE"},"value":"Desktop"},{"type":{"name":"SEO Source","code":"SOURCE"},"value":"Social"}],"parameters":{},"questions":[{"name":"test","inputType":{"name":"Text Field","type":"textField"},"type":{"name":"Main Question","type":"main"}}],"buttons":[{}],"thankYouMessage":"Thanks for your submission adasdsa","created":"2015-11-24T21:21:16.425Z","endDate":null,"id":21,"domainId":1},{"name":"amazing title","status":null,"filters":[{"type":{"name":"SEO Source","code":"SOURCE"},"value":"Paid Search"}],"parameters":{},"questions":[{"name":"test","inputType":{"name":"Text Field","type":"textField"},"type":{"name":"Main Question","type":"main"}}],"buttons":[{}],"thankYouMessage":"Thanks for your submission adasdsa","created":"2015-11-24T21:21:16.425Z","endDate":null,"id":25,"domainId":1},{"name":"Awesome survey title asdasd 2","status":null,"filters":[{"type":{"name":"SEO Source","code":"SOURCE"},"value":"Paid Search"}],"parameters":{},"questions":[{"name":"test","inputType":{"name":"Text Field","type":"textField"},"type":{"name":"Main Question","type":"main"}}],"buttons":[{}],"thankYouMessage":"Thanks for your submission adasdsa","created":"2015-11-24T21:21:16.425Z","endDate":null,"id":26,"domainId":1},{"name":"Awesome survey title asdasd 2","status":null,"filters":[{"type":{"name":"SEO Source","code":"SOURCE"},"value":"Paid Search"}],"parameters":{},"questions":[{"name":"test","inputType":{"name":"Text Field","type":"textField"},"type":{"name":"Main Question","type":"main"}}],"buttons":[{}],"thankYouMessage":"Thanks for your submission adasdsa","created":"2015-11-25T00:25:19.390Z","endDate":null,"id":27,"domainId":1},{"name":"Awesome survey title Test Question ??","status":"off","filters":[{"type":{"name":"SEO Source","code":"SOURCE"},"value":"Paid Search"},{"type":{"name":"Device Type","code":"DEVICE"},"value":"Desktop"}],"parameters":{},"questions":[{"type":{"name":"Main Question","type":"main"},"name":"Test Question ??","inputType":{"name":"Text Field","type":"textField"}}],"buttons":[{}],"thankYouMessage":"Thanks for your submission ....","created":"2015-11-25T00:27:35.493Z","endDate":null,"id":28,"domainId":1},{"name":"Awesome survey title 2","status":"off","filters":[{}],"parameters":{},"questions":[{"type":{"name":"Main Question","type":"main"},"inputType":{"name":"Radio Buttons","type":"radioButtons"},"name":"test"}],"buttons":[{}],"thankYouMessage":"Thanks for your submission","created":"2015-11-26T00:23:08.659Z","endDate":null,"id":30,"domainId":1},{"name":"Awesome survey title","status":"off","filters":[{}],"parameters":{},"questions":[{}],"buttons":[{}],"thankYouMessage":"Thanks for your submission","created":"2015-11-27T23:35:18.742Z","endDate":null,"id":31,"domainId":1}]');
    }));

    it('should filter surveys per date', inject(function($filter) {
      var inDateFilter = $filter('inDateFilter');
      expect(Array.isArray(surveys)).toBeTruthy();

      var dummyDate = moment('2015-11-27T23:35:18.742Z');

      var length = inDateFilter(surveys, dummyDate.valueOf()).length;
      expect(length === 1).toBe(true);

      length = inDateFilter(surveys, dummyDate.subtract(3,'days').valueOf()).length;
      expect(length === 6).toBe(true);

      length = inDateFilter(surveys, dummyDate.add(2,'days').valueOf()).length;
      expect(length === 0).toBe(true);
    }));

    it('should only filter surveys per date if a date is selected', inject(function($filter) {
      var inDateFilter = $filter('inDateFilter');
      expect(Array.isArray(surveys)).toBeTruthy();
      var dummyDate = '';

      var length = inDateFilter(surveys, dummyDate).length;
      expect(length === 8).toBe(true);
    }));
  });
})();
