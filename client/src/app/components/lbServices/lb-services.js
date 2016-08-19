(function(window, angular, undefined) {'use strict';

var urlBase = "/api";
var authHeader = 'authorization';

function getHost(url) {
  var m = url.match(/^(?:https?:)?\/\/([^\/]+)/);
  return m ? m[1] : null;
}

var urlBaseHost = getHost(urlBase) || location.host;

/**
 * @ngdoc overview
 * @name lbServices
 * @module
 * @description
 *
 * The `lbServices` module provides services for interacting with
 * the models exposed by the LoopBack server via the REST API.
 *
 */
var module = angular.module("lbServices", ['ngResource']);

/**
 * @ngdoc object
 * @name lbServices.Domain
 * @header lbServices.Domain
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Domain` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Domain",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Domains/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Domain.surveys.findById() instead.
        "prototype$__findById__surveys": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Domains/:id/surveys/:fk",
          method: "GET"
        },

        // INTERNAL. Use Domain.surveys.destroyById() instead.
        "prototype$__destroyById__surveys": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Domains/:id/surveys/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Domain.surveys.updateById() instead.
        "prototype$__updateById__surveys": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Domains/:id/surveys/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Domain.teams() instead.
        "prototype$__get__teams": {
          url: urlBase + "/Domains/:id/teams",
          method: "GET"
        },

        // INTERNAL. Use Domain.surveys() instead.
        "prototype$__get__surveys": {
          isArray: true,
          url: urlBase + "/Domains/:id/surveys",
          method: "GET"
        },

        // INTERNAL. Use Domain.surveys.create() instead.
        "prototype$__create__surveys": {
          url: urlBase + "/Domains/:id/surveys",
          method: "POST"
        },

        // INTERNAL. Use Domain.surveys.destroyAll() instead.
        "prototype$__delete__surveys": {
          url: urlBase + "/Domains/:id/surveys",
          method: "DELETE"
        },

        // INTERNAL. Use Domain.surveys.count() instead.
        "prototype$__count__surveys": {
          url: urlBase + "/Domains/:id/surveys/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Domain#create
         * @methodOf lbServices.Domain
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Domain` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Domains",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Domain#createMany
         * @methodOf lbServices.Domain
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Domain` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/Domains",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Domain#upsert
         * @methodOf lbServices.Domain
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Domain` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Domains",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Domain#exists
         * @methodOf lbServices.Domain
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` -
         */
        "exists": {
          url: urlBase + "/Domains/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Domain#findById
         * @methodOf lbServices.Domain
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Domain` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Domains/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Domain#find
         * @methodOf lbServices.Domain
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Domain` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Domains",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Domain#findOne
         * @methodOf lbServices.Domain
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Domain` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Domains/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Domain#updateAll
         * @methodOf lbServices.Domain
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/Domains/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Domain#deleteById
         * @methodOf lbServices.Domain
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Domain` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/Domains/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Domain#count
         * @methodOf lbServices.Domain
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` -
         */
        "count": {
          url: urlBase + "/Domains/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Domain#prototype$updateAttributes
         * @methodOf lbServices.Domain
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Domain` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Domains/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Domain#createChangeStream
         * @methodOf lbServices.Domain
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` -
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` -
         */
        "createChangeStream": {
          url: urlBase + "/Domains/change-stream",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Domain#verify
         * @methodOf lbServices.Domain
         *
         * @description
         *
         * Verify domains
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `id` – `{number}` - Domain id to verify
         *
         *  - `uuid` – `{string}` - Domain uuid to verify
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `isVerified` – `{boolean=}` -
         */
        "verify": {
          url: urlBase + "/Domains/:id/verify",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Domain#miniGraphData
         * @methodOf lbServices.Domain
         *
         * @description
         *
         * Get all mini graph data for this survey
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{string}` - domain id.
         *
         *  - `surveyId` – `{string}` - Survey id.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `data` – `{object=}` -
         */
        "miniGraphData": {
          url: urlBase + "/Domains/:id/miniGraphData",
          method: "GET"
        },

        // INTERNAL. Use Survey.domain() instead.
        "::get::Survey::domain": {
          url: urlBase + "/Surveys/:id/domain",
          method: "GET"
        },

        // INTERNAL. Use TrackerData.domain() instead.
        "::get::TrackerData::domain": {
          url: urlBase + "/TrackerData/:id/domain",
          method: "GET"
        },

        // INTERNAL. Use Team.domains.findById() instead.
        "::findById::Team::domains": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Teams/:id/domains/:fk",
          method: "GET"
        },

        // INTERNAL. Use Team.domains.destroyById() instead.
        "::destroyById::Team::domains": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Teams/:id/domains/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Team.domains.updateById() instead.
        "::updateById::Team::domains": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Teams/:id/domains/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Team.domains.link() instead.
        "::link::Team::domains": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Teams/:id/domains/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Team.domains.unlink() instead.
        "::unlink::Team::domains": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Teams/:id/domains/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Team.domains.exists() instead.
        "::exists::Team::domains": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Teams/:id/domains/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use Team.domains() instead.
        "::get::Team::domains": {
          isArray: true,
          url: urlBase + "/Teams/:id/domains",
          method: "GET"
        },

        // INTERNAL. Use Team.domains.create() instead.
        "::create::Team::domains": {
          url: urlBase + "/Teams/:id/domains",
          method: "POST"
        },

        // INTERNAL. Use Team.domains.createMany() instead.
        "::createMany::Team::domains": {
          isArray: true,
          url: urlBase + "/Teams/:id/domains",
          method: "POST"
        },

        // INTERNAL. Use Team.domains.destroyAll() instead.
        "::delete::Team::domains": {
          url: urlBase + "/Teams/:id/domains",
          method: "DELETE"
        },

        // INTERNAL. Use Team.domains.count() instead.
        "::count::Team::domains": {
          url: urlBase + "/Teams/:id/domains/count",
          method: "GET"
        }
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Domain#updateOrCreate
         * @methodOf lbServices.Domain
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Domain` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Domain#update
         * @methodOf lbServices.Domain
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Domain#destroyById
         * @methodOf lbServices.Domain
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Domain` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Domain#removeById
         * @methodOf lbServices.Domain
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Domain` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Domain#modelName
    * @propertyOf lbServices.Domain
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Domain`.
    */
    R.modelName = "Domain";

    /**
     * @ngdoc object
     * @name lbServices.Domain.surveys
     * @header lbServices.Domain.surveys
     * @object
     * @description
     *
     * The object `Domain.surveys` groups methods
     * manipulating `Survey` instances related to `Domain`.
     *
     * Call {@link lbServices.Domain#surveys Domain.surveys()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Domain#surveys
         * @methodOf lbServices.Domain
         *
         * @description
         *
         * Queries surveys of Domain.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` -
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey` object.)
         * </em>
         */
        R.surveys = function() {
          var TargetResource = $injector.get("Survey");
          var action = TargetResource["::get::Domain::surveys"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Domain.surveys#count
         * @methodOf lbServices.Domain.surveys
         *
         * @description
         *
         * Counts surveys of Domain.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` -
         */
        R.surveys.count = function() {
          var TargetResource = $injector.get("Survey");
          var action = TargetResource["::count::Domain::surveys"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Domain.surveys#create
         * @methodOf lbServices.Domain.surveys
         *
         * @description
         *
         * Creates a new instance in surveys of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey` object.)
         * </em>
         */
        R.surveys.create = function() {
          var TargetResource = $injector.get("Survey");
          var action = TargetResource["::create::Domain::surveys"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Domain.surveys#createMany
         * @methodOf lbServices.Domain.surveys
         *
         * @description
         *
         * Creates a new instance in surveys of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey` object.)
         * </em>
         */
        R.surveys.createMany = function() {
          var TargetResource = $injector.get("Survey");
          var action = TargetResource["::createMany::Domain::surveys"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Domain.surveys#destroyAll
         * @methodOf lbServices.Domain.surveys
         *
         * @description
         *
         * Deletes all surveys of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.surveys.destroyAll = function() {
          var TargetResource = $injector.get("Survey");
          var action = TargetResource["::delete::Domain::surveys"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Domain.surveys#destroyById
         * @methodOf lbServices.Domain.surveys
         *
         * @description
         *
         * Delete a related item by id for surveys.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for surveys
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.surveys.destroyById = function() {
          var TargetResource = $injector.get("Survey");
          var action = TargetResource["::destroyById::Domain::surveys"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Domain.surveys#findById
         * @methodOf lbServices.Domain.surveys
         *
         * @description
         *
         * Find a related item by id for surveys.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for surveys
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey` object.)
         * </em>
         */
        R.surveys.findById = function() {
          var TargetResource = $injector.get("Survey");
          var action = TargetResource["::findById::Domain::surveys"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Domain.surveys#updateById
         * @methodOf lbServices.Domain.surveys
         *
         * @description
         *
         * Update a related item by id for surveys.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for surveys
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey` object.)
         * </em>
         */
        R.surveys.updateById = function() {
          var TargetResource = $injector.get("Survey");
          var action = TargetResource["::updateById::Domain::surveys"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Domain#teams
         * @methodOf lbServices.Domain
         *
         * @description
         *
         * Fetches belongsTo relation teams.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` -
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Team` object.)
         * </em>
         */
        R.teams = function() {
          var TargetResource = $injector.get("Team");
          var action = TargetResource["::get::Domain::teams"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.AuthUser
 * @header lbServices.AuthUser
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `AuthUser` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "AuthUser",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/AuthUsers/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.AuthUser#prototype$__findById__accessTokens
         * @methodOf lbServices.AuthUser
         *
         * @description
         *
         * Find a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AuthUser` object.)
         * </em>
         */
        "prototype$__findById__accessTokens": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/AuthUsers/:id/accessTokens/:fk",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.AuthUser#prototype$__destroyById__accessTokens
         * @methodOf lbServices.AuthUser
         *
         * @description
         *
         * Delete a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__destroyById__accessTokens": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/AuthUsers/:id/accessTokens/:fk",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.AuthUser#prototype$__updateById__accessTokens
         * @methodOf lbServices.AuthUser
         *
         * @description
         *
         * Update a related item by id for accessTokens.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for accessTokens
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AuthUser` object.)
         * </em>
         */
        "prototype$__updateById__accessTokens": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/AuthUsers/:id/accessTokens/:fk",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.AuthUser#prototype$__get__accountType
         * @methodOf lbServices.AuthUser
         *
         * @description
         *
         * Fetches belongsTo relation accountType.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `refresh` – `{boolean=}` -
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AuthUser` object.)
         * </em>
         */
        "prototype$__get__accountType": {
          url: urlBase + "/AuthUsers/:id/accountType",
          method: "GET"
        },

        // INTERNAL. Use AuthUser.teams.findById() instead.
        "prototype$__findById__teams": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/AuthUsers/:id/teams/:fk",
          method: "GET"
        },

        // INTERNAL. Use AuthUser.teams.destroyById() instead.
        "prototype$__destroyById__teams": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/AuthUsers/:id/teams/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use AuthUser.teams.updateById() instead.
        "prototype$__updateById__teams": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/AuthUsers/:id/teams/:fk",
          method: "PUT"
        },

        // INTERNAL. Use AuthUser.teams.link() instead.
        "prototype$__link__teams": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/AuthUsers/:id/teams/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use AuthUser.teams.unlink() instead.
        "prototype$__unlink__teams": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/AuthUsers/:id/teams/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use AuthUser.teams.exists() instead.
        "prototype$__exists__teams": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/AuthUsers/:id/teams/rel/:fk",
          method: "HEAD"
        },

        /**
         * @ngdoc method
         * @name lbServices.AuthUser#prototype$__get__accessTokens
         * @methodOf lbServices.AuthUser
         *
         * @description
         *
         * Queries accessTokens of AuthUser.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` -
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AuthUser` object.)
         * </em>
         */
        "prototype$__get__accessTokens": {
          isArray: true,
          url: urlBase + "/AuthUsers/:id/accessTokens",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.AuthUser#prototype$__create__accessTokens
         * @methodOf lbServices.AuthUser
         *
         * @description
         *
         * Creates a new instance in accessTokens of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AuthUser` object.)
         * </em>
         */
        "prototype$__create__accessTokens": {
          url: urlBase + "/AuthUsers/:id/accessTokens",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.AuthUser#prototype$__delete__accessTokens
         * @methodOf lbServices.AuthUser
         *
         * @description
         *
         * Deletes all accessTokens of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "prototype$__delete__accessTokens": {
          url: urlBase + "/AuthUsers/:id/accessTokens",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.AuthUser#prototype$__count__accessTokens
         * @methodOf lbServices.AuthUser
         *
         * @description
         *
         * Counts accessTokens of AuthUser.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` -
         */
        "prototype$__count__accessTokens": {
          url: urlBase + "/AuthUsers/:id/accessTokens/count",
          method: "GET"
        },

        // INTERNAL. Use AuthUser.teams() instead.
        "prototype$__get__teams": {
          isArray: true,
          url: urlBase + "/AuthUsers/:id/teams",
          method: "GET"
        },

        // INTERNAL. Use AuthUser.teams.create() instead.
        "prototype$__create__teams": {
          url: urlBase + "/AuthUsers/:id/teams",
          method: "POST"
        },

        // INTERNAL. Use AuthUser.teams.destroyAll() instead.
        "prototype$__delete__teams": {
          url: urlBase + "/AuthUsers/:id/teams",
          method: "DELETE"
        },

        // INTERNAL. Use AuthUser.teams.count() instead.
        "prototype$__count__teams": {
          url: urlBase + "/AuthUsers/:id/teams/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.AuthUser#create
         * @methodOf lbServices.AuthUser
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AuthUser` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/AuthUsers",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.AuthUser#createMany
         * @methodOf lbServices.AuthUser
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AuthUser` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/AuthUsers",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.AuthUser#upsert
         * @methodOf lbServices.AuthUser
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AuthUser` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/AuthUsers",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.AuthUser#exists
         * @methodOf lbServices.AuthUser
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` -
         */
        "exists": {
          url: urlBase + "/AuthUsers/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.AuthUser#findById
         * @methodOf lbServices.AuthUser
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AuthUser` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/AuthUsers/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.AuthUser#find
         * @methodOf lbServices.AuthUser
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AuthUser` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/AuthUsers",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.AuthUser#findOne
         * @methodOf lbServices.AuthUser
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AuthUser` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/AuthUsers/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.AuthUser#updateAll
         * @methodOf lbServices.AuthUser
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/AuthUsers/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.AuthUser#deleteById
         * @methodOf lbServices.AuthUser
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AuthUser` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/AuthUsers/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.AuthUser#count
         * @methodOf lbServices.AuthUser
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` -
         */
        "count": {
          url: urlBase + "/AuthUsers/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.AuthUser#prototype$updateAttributes
         * @methodOf lbServices.AuthUser
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AuthUser` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/AuthUsers/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.AuthUser#createChangeStream
         * @methodOf lbServices.AuthUser
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` -
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` -
         */
        "createChangeStream": {
          url: urlBase + "/AuthUsers/change-stream",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.AuthUser#login
         * @methodOf lbServices.AuthUser
         *
         * @description
         *
         * Login a user with username/email and password.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `include` – `{string=}` - Related objects to include in the response. See the description of return value for more details.
         *   Default value: `user`.
         *
         *  - `rememberMe` - `boolean` - Whether the authentication credentials
         *     should be remembered in localStorage across app/browser restarts.
         *     Default: `true`.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The response body contains properties of the AccessToken created on login.
         * Depending on the value of `include` parameter, the body may contain additional properties:
         *
         *   - `user` - `{User}` - Data of the currently logged in user. (`include=user`)
         *
         *
         */
        "login": {
          params: {
            include: "user"
          },
          interceptor: {
            response: function(response) {
              var accessToken = response.data;
              LoopBackAuth.setUser(accessToken.id, accessToken.userId, accessToken.user);
              LoopBackAuth.rememberMe = response.config.params.rememberMe !== false;
              LoopBackAuth.save();
              return response.resource;
            }
          },
          url: urlBase + "/AuthUsers/login",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.AuthUser#logout
         * @methodOf lbServices.AuthUser
         *
         * @description
         *
         * Logout a user with access token.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `access_token` – `{string}` - Do not supply this argument, it is automatically extracted from request headers.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "logout": {
          interceptor: {
            response: function(response) {
              LoopBackAuth.clearUser();
              LoopBackAuth.clearStorage();
              return response.resource;
            }
          },
          url: urlBase + "/AuthUsers/logout",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.AuthUser#confirm
         * @methodOf lbServices.AuthUser
         *
         * @description
         *
         * Confirm a user registration with email verification token.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `uid` – `{string}` -
         *
         *  - `token` – `{string}` -
         *
         *  - `redirect` – `{string=}` -
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "confirm": {
          url: urlBase + "/AuthUsers/confirm",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.AuthUser#resetPassword
         * @methodOf lbServices.AuthUser
         *
         * @description
         *
         * Reset password for a user with email.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        "resetPassword": {
          url: urlBase + "/AuthUsers/reset",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.AuthUser#createUserWithDomain
         * @methodOf lbServices.AuthUser
         *
         * @description
         *
         * Create a user with domain info
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `data` – `{object=}` -
         */
        "createUserWithDomain": {
          url: urlBase + "/AuthUsers/createUserWithDomain",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.AuthUser#getAllRelatedInfo
         * @methodOf lbServices.AuthUser
         *
         * @description
         *
         * Get all user info with teams, accounts and domains
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `userId` – `{number=}` -
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `data` – `{object=}` -
         */
        "getAllRelatedInfo": {
          url: urlBase + "/AuthUsers/:userId/getAllRelatedInfo",
          method: "GET"
        },

        // INTERNAL. Use Team.users.findById() instead.
        "::findById::Team::users": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Teams/:id/users/:fk",
          method: "GET"
        },

        // INTERNAL. Use Team.users.destroyById() instead.
        "::destroyById::Team::users": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Teams/:id/users/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Team.users.updateById() instead.
        "::updateById::Team::users": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Teams/:id/users/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Team.users() instead.
        "::get::Team::users": {
          isArray: true,
          url: urlBase + "/Teams/:id/users",
          method: "GET"
        },

        // INTERNAL. Use Team.users.create() instead.
        "::create::Team::users": {
          url: urlBase + "/Teams/:id/users",
          method: "POST"
        },

        // INTERNAL. Use Team.users.createMany() instead.
        "::createMany::Team::users": {
          isArray: true,
          url: urlBase + "/Teams/:id/users",
          method: "POST"
        },

        // INTERNAL. Use Team.users.destroyAll() instead.
        "::delete::Team::users": {
          url: urlBase + "/Teams/:id/users",
          method: "DELETE"
        },

        // INTERNAL. Use Team.users.count() instead.
        "::count::Team::users": {
          url: urlBase + "/Teams/:id/users/count",
          method: "GET"
        },

        // INTERNAL. Use Account.user() instead.
        "::get::Account::user": {
          url: urlBase + "/Accounts/:id/user",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.AuthUser#getCurrent
         * @methodOf lbServices.AuthUser
         *
         * @description
         *
         * Get data of the currently logged user. Fail with HTTP result 401
         * when there is no user logged in.
         *
         * @param {function(Object,Object)=} successCb
         *    Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *    `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         */
        "getCurrent": {
           url: urlBase + "/AuthUsers" + "/:id",
           method: "GET",
           params: {
             id: function() {
              var id = LoopBackAuth.currentUserId;
              if (id == null) id = '__anonymous__';
              return id;
            }
          },
          interceptor: {
            response: function(response) {
              LoopBackAuth.currentUserData = response.data;
              return response.resource;
            }
          },
          __isGetCurrentUser__: true
        }
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.AuthUser#updateOrCreate
         * @methodOf lbServices.AuthUser
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AuthUser` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.AuthUser#update
         * @methodOf lbServices.AuthUser
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.AuthUser#destroyById
         * @methodOf lbServices.AuthUser
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AuthUser` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.AuthUser#removeById
         * @methodOf lbServices.AuthUser
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AuthUser` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.AuthUser#getCachedCurrent
         * @methodOf lbServices.AuthUser
         *
         * @description
         *
         * Get data of the currently logged user that was returned by the last
         * call to {@link lbServices.AuthUser#login} or
         * {@link lbServices.AuthUser#getCurrent}. Return null when there
         * is no user logged in or the data of the current user were not fetched
         * yet.
         *
         * @returns {Object} A AuthUser instance.
         */
        R.getCachedCurrent = function() {
          var data = LoopBackAuth.currentUserData;
          return data ? new R(data) : null;
        };

        /**
         * @ngdoc method
         * @name lbServices.AuthUser#isAuthenticated
         * @methodOf lbServices.AuthUser
         *
         * @returns {boolean} True if the current user is authenticated (logged in).
         */
        R.isAuthenticated = function() {
          return this.getCurrentId() != null;
        };

        /**
         * @ngdoc method
         * @name lbServices.AuthUser#getCurrentId
         * @methodOf lbServices.AuthUser
         *
         * @returns {Object} Id of the currently logged-in user or null.
         */
        R.getCurrentId = function() {
          return LoopBackAuth.currentUserId;
        };

    /**
    * @ngdoc property
    * @name lbServices.AuthUser#modelName
    * @propertyOf lbServices.AuthUser
    * @description
    * The name of the model represented by this $resource,
    * i.e. `AuthUser`.
    */
    R.modelName = "AuthUser";

    /**
     * @ngdoc object
     * @name lbServices.AuthUser.teams
     * @header lbServices.AuthUser.teams
     * @object
     * @description
     *
     * The object `AuthUser.teams` groups methods
     * manipulating `Team` instances related to `AuthUser`.
     *
     * Call {@link lbServices.AuthUser#teams AuthUser.teams()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.AuthUser#teams
         * @methodOf lbServices.AuthUser
         *
         * @description
         *
         * Queries teams of AuthUser.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `filter` – `{object=}` -
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Team` object.)
         * </em>
         */
        R.teams = function() {
          var TargetResource = $injector.get("Team");
          var action = TargetResource["::get::AuthUser::teams"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.AuthUser.teams#count
         * @methodOf lbServices.AuthUser.teams
         *
         * @description
         *
         * Counts teams of AuthUser.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` -
         */
        R.teams.count = function() {
          var TargetResource = $injector.get("Team");
          var action = TargetResource["::count::AuthUser::teams"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.AuthUser.teams#create
         * @methodOf lbServices.AuthUser.teams
         *
         * @description
         *
         * Creates a new instance in teams of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Team` object.)
         * </em>
         */
        R.teams.create = function() {
          var TargetResource = $injector.get("Team");
          var action = TargetResource["::create::AuthUser::teams"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.AuthUser.teams#createMany
         * @methodOf lbServices.AuthUser.teams
         *
         * @description
         *
         * Creates a new instance in teams of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Team` object.)
         * </em>
         */
        R.teams.createMany = function() {
          var TargetResource = $injector.get("Team");
          var action = TargetResource["::createMany::AuthUser::teams"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.AuthUser.teams#destroyAll
         * @methodOf lbServices.AuthUser.teams
         *
         * @description
         *
         * Deletes all teams of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.teams.destroyAll = function() {
          var TargetResource = $injector.get("Team");
          var action = TargetResource["::delete::AuthUser::teams"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.AuthUser.teams#destroyById
         * @methodOf lbServices.AuthUser.teams
         *
         * @description
         *
         * Delete a related item by id for teams.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for teams
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.teams.destroyById = function() {
          var TargetResource = $injector.get("Team");
          var action = TargetResource["::destroyById::AuthUser::teams"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.AuthUser.teams#exists
         * @methodOf lbServices.AuthUser.teams
         *
         * @description
         *
         * Check the existence of teams relation to an item by id.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for teams
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Team` object.)
         * </em>
         */
        R.teams.exists = function() {
          var TargetResource = $injector.get("Team");
          var action = TargetResource["::exists::AuthUser::teams"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.AuthUser.teams#findById
         * @methodOf lbServices.AuthUser.teams
         *
         * @description
         *
         * Find a related item by id for teams.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for teams
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Team` object.)
         * </em>
         */
        R.teams.findById = function() {
          var TargetResource = $injector.get("Team");
          var action = TargetResource["::findById::AuthUser::teams"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.AuthUser.teams#link
         * @methodOf lbServices.AuthUser.teams
         *
         * @description
         *
         * Add a related item by id for teams.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for teams
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Team` object.)
         * </em>
         */
        R.teams.link = function() {
          var TargetResource = $injector.get("Team");
          var action = TargetResource["::link::AuthUser::teams"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.AuthUser.teams#unlink
         * @methodOf lbServices.AuthUser.teams
         *
         * @description
         *
         * Remove the teams relation to an item by id.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for teams
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.teams.unlink = function() {
          var TargetResource = $injector.get("Team");
          var action = TargetResource["::unlink::AuthUser::teams"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.AuthUser.teams#updateById
         * @methodOf lbServices.AuthUser.teams
         *
         * @description
         *
         * Update a related item by id for teams.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - User id
         *
         *  - `fk` – `{*}` - Foreign key for teams
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Team` object.)
         * </em>
         */
        R.teams.updateById = function() {
          var TargetResource = $injector.get("Team");
          var action = TargetResource["::updateById::AuthUser::teams"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Survey
 * @header lbServices.Survey
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Survey` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Survey",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Surveys/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Survey.domain() instead.
        "prototype$__get__domain": {
          url: urlBase + "/Surveys/:id/domain",
          method: "GET"
        },

        // INTERNAL. Use Survey.surveyResponses.findById() instead.
        "prototype$__findById__surveyResponses": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Surveys/:id/surveyResponses/:fk",
          method: "GET"
        },

        // INTERNAL. Use Survey.surveyResponses.destroyById() instead.
        "prototype$__destroyById__surveyResponses": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Surveys/:id/surveyResponses/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Survey.surveyResponses.updateById() instead.
        "prototype$__updateById__surveyResponses": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Surveys/:id/surveyResponses/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Survey.surveyResponses() instead.
        "prototype$__get__surveyResponses": {
          isArray: true,
          url: urlBase + "/Surveys/:id/surveyResponses",
          method: "GET"
        },

        // INTERNAL. Use Survey.surveyResponses.create() instead.
        "prototype$__create__surveyResponses": {
          url: urlBase + "/Surveys/:id/surveyResponses",
          method: "POST"
        },

        // INTERNAL. Use Survey.surveyResponses.destroyAll() instead.
        "prototype$__delete__surveyResponses": {
          url: urlBase + "/Surveys/:id/surveyResponses",
          method: "DELETE"
        },

        // INTERNAL. Use Survey.surveyResponses.count() instead.
        "prototype$__count__surveyResponses": {
          url: urlBase + "/Surveys/:id/surveyResponses/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey#create
         * @methodOf lbServices.Survey
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Surveys",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey#createMany
         * @methodOf lbServices.Survey
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/Surveys",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey#upsert
         * @methodOf lbServices.Survey
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Surveys",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey#exists
         * @methodOf lbServices.Survey
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` -
         */
        "exists": {
          url: urlBase + "/Surveys/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey#findById
         * @methodOf lbServices.Survey
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Surveys/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey#find
         * @methodOf lbServices.Survey
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Surveys",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey#findOne
         * @methodOf lbServices.Survey
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Surveys/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey#updateAll
         * @methodOf lbServices.Survey
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/Surveys/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey#deleteById
         * @methodOf lbServices.Survey
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/Surveys/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey#prototype$updateAttributes
         * @methodOf lbServices.Survey
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Surveys/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey#updateViewCount
         * @methodOf lbServices.Survey
         *
         * @description
         *
         * Update Survey view Count
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `id` – `{string}` - Survey id.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `updated` – `{boolean=}` -
         */
        "updateViewCount": {
          url: urlBase + "/Surveys/:id/updateViewCount",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey#updateVisitCount
         * @methodOf lbServices.Survey
         *
         * @description
         *
         * Update Survey visit Count
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `id` – `{string}` - Survey id.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `updated` – `{boolean=}` -
         */
        "updateVisitCount": {
          url: urlBase + "/Surveys/:id/updateVisitCount",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey#getSummaryData
         * @methodOf lbServices.Survey
         *
         * @description
         *
         * Get all summary graph data for this survey
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{string}` - Survey id.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `data` – `{object=}` -
         */
        "getSummaryData": {
          url: urlBase + "/Surveys/:id/getSummaryData",
          method: "GET"
        },

        // INTERNAL. Use Domain.surveys.findById() instead.
        "::findById::Domain::surveys": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Domains/:id/surveys/:fk",
          method: "GET"
        },

        // INTERNAL. Use Domain.surveys.destroyById() instead.
        "::destroyById::Domain::surveys": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Domains/:id/surveys/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Domain.surveys.updateById() instead.
        "::updateById::Domain::surveys": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Domains/:id/surveys/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Domain.surveys() instead.
        "::get::Domain::surveys": {
          isArray: true,
          url: urlBase + "/Domains/:id/surveys",
          method: "GET"
        },

        // INTERNAL. Use Domain.surveys.create() instead.
        "::create::Domain::surveys": {
          url: urlBase + "/Domains/:id/surveys",
          method: "POST"
        },

        // INTERNAL. Use Domain.surveys.createMany() instead.
        "::createMany::Domain::surveys": {
          isArray: true,
          url: urlBase + "/Domains/:id/surveys",
          method: "POST"
        },

        // INTERNAL. Use Domain.surveys.destroyAll() instead.
        "::delete::Domain::surveys": {
          url: urlBase + "/Domains/:id/surveys",
          method: "DELETE"
        },

        // INTERNAL. Use Domain.surveys.count() instead.
        "::count::Domain::surveys": {
          url: urlBase + "/Domains/:id/surveys/count",
          method: "GET"
        },

        // INTERNAL. Use SurveyResponse.survey() instead.
        "::get::SurveyResponse::survey": {
          url: urlBase + "/SurveyResponses/:id/survey",
          method: "GET"
        },

        // INTERNAL. Use Survey-view.survey() instead.
        "::get::survey-view::survey": {
          url: urlBase + "/survey-views/:id/survey",
          method: "GET"
        },

        // INTERNAL. Use Survey-visit.survey() instead.
        "::get::survey-visit::survey": {
          url: urlBase + "/survey-visits/:id/survey",
          method: "GET"
        },

        // INTERNAL. Use Survey-minimize.survey() instead.
        "::get::survey-minimize::survey": {
          url: urlBase + "/survey-minimizes/:id/survey",
          method: "GET"
        }
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Survey#updateOrCreate
         * @methodOf lbServices.Survey
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Survey#update
         * @methodOf lbServices.Survey
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Survey#destroyById
         * @methodOf lbServices.Survey
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Survey#removeById
         * @methodOf lbServices.Survey
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Survey#modelName
    * @propertyOf lbServices.Survey
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Survey`.
    */
    R.modelName = "Survey";


        /**
         * @ngdoc method
         * @name lbServices.Survey#domain
         * @methodOf lbServices.Survey
         *
         * @description
         *
         * Fetches belongsTo relation domain.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` -
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Domain` object.)
         * </em>
         */
        R.domain = function() {
          var TargetResource = $injector.get("Domain");
          var action = TargetResource["::get::Survey::domain"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Survey.surveyResponses
     * @header lbServices.Survey.surveyResponses
     * @object
     * @description
     *
     * The object `Survey.surveyResponses` groups methods
     * manipulating `SurveyResponse` instances related to `Survey`.
     *
     * Call {@link lbServices.Survey#surveyResponses Survey.surveyResponses()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Survey#surveyResponses
         * @methodOf lbServices.Survey
         *
         * @description
         *
         * Queries surveyResponses of Survey.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` -
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `SurveyResponse` object.)
         * </em>
         */
        R.surveyResponses = function() {
          var TargetResource = $injector.get("SurveyResponse");
          var action = TargetResource["::get::Survey::surveyResponses"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Survey.surveyResponses#count
         * @methodOf lbServices.Survey.surveyResponses
         *
         * @description
         *
         * Counts surveyResponses of Survey.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` -
         */
        R.surveyResponses.count = function() {
          var TargetResource = $injector.get("SurveyResponse");
          var action = TargetResource["::count::Survey::surveyResponses"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Survey.surveyResponses#create
         * @methodOf lbServices.Survey.surveyResponses
         *
         * @description
         *
         * Creates a new instance in surveyResponses of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `SurveyResponse` object.)
         * </em>
         */
        R.surveyResponses.create = function() {
          var TargetResource = $injector.get("SurveyResponse");
          var action = TargetResource["::create::Survey::surveyResponses"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Survey.surveyResponses#createMany
         * @methodOf lbServices.Survey.surveyResponses
         *
         * @description
         *
         * Creates a new instance in surveyResponses of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `SurveyResponse` object.)
         * </em>
         */
        R.surveyResponses.createMany = function() {
          var TargetResource = $injector.get("SurveyResponse");
          var action = TargetResource["::createMany::Survey::surveyResponses"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Survey.surveyResponses#destroyAll
         * @methodOf lbServices.Survey.surveyResponses
         *
         * @description
         *
         * Deletes all surveyResponses of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.surveyResponses.destroyAll = function() {
          var TargetResource = $injector.get("SurveyResponse");
          var action = TargetResource["::delete::Survey::surveyResponses"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Survey.surveyResponses#destroyById
         * @methodOf lbServices.Survey.surveyResponses
         *
         * @description
         *
         * Delete a related item by id for surveyResponses.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for surveyResponses
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.surveyResponses.destroyById = function() {
          var TargetResource = $injector.get("SurveyResponse");
          var action = TargetResource["::destroyById::Survey::surveyResponses"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Survey.surveyResponses#findById
         * @methodOf lbServices.Survey.surveyResponses
         *
         * @description
         *
         * Find a related item by id for surveyResponses.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for surveyResponses
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `SurveyResponse` object.)
         * </em>
         */
        R.surveyResponses.findById = function() {
          var TargetResource = $injector.get("SurveyResponse");
          var action = TargetResource["::findById::Survey::surveyResponses"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Survey.surveyResponses#updateById
         * @methodOf lbServices.Survey.surveyResponses
         *
         * @description
         *
         * Update a related item by id for surveyResponses.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for surveyResponses
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `SurveyResponse` object.)
         * </em>
         */
        R.surveyResponses.updateById = function() {
          var TargetResource = $injector.get("SurveyResponse");
          var action = TargetResource["::updateById::Survey::surveyResponses"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.SurveyResponse
 * @header lbServices.SurveyResponse
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `SurveyResponse` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "SurveyResponse",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/SurveyResponses/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use SurveyResponse.survey() instead.
        "prototype$__get__survey": {
          url: urlBase + "/SurveyResponses/:id/survey",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.SurveyResponse#create
         * @methodOf lbServices.SurveyResponse
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `SurveyResponse` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/SurveyResponses",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.SurveyResponse#createMany
         * @methodOf lbServices.SurveyResponse
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `SurveyResponse` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/SurveyResponses",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.SurveyResponse#upsert
         * @methodOf lbServices.SurveyResponse
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `SurveyResponse` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/SurveyResponses",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.SurveyResponse#findById
         * @methodOf lbServices.SurveyResponse
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `SurveyResponse` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/SurveyResponses/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.SurveyResponse#find
         * @methodOf lbServices.SurveyResponse
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `SurveyResponse` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/SurveyResponses",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.SurveyResponse#findOne
         * @methodOf lbServices.SurveyResponse
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `SurveyResponse` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/SurveyResponses/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.SurveyResponse#deleteById
         * @methodOf lbServices.SurveyResponse
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `SurveyResponse` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/SurveyResponses/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.SurveyResponse#count
         * @methodOf lbServices.SurveyResponse
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` -
         */
        "count": {
          url: urlBase + "/SurveyResponses/count",
          method: "GET"
        },

        // INTERNAL. Use Survey.surveyResponses.findById() instead.
        "::findById::Survey::surveyResponses": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Surveys/:id/surveyResponses/:fk",
          method: "GET"
        },

        // INTERNAL. Use Survey.surveyResponses.destroyById() instead.
        "::destroyById::Survey::surveyResponses": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Surveys/:id/surveyResponses/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Survey.surveyResponses.updateById() instead.
        "::updateById::Survey::surveyResponses": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Surveys/:id/surveyResponses/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Survey.surveyResponses() instead.
        "::get::Survey::surveyResponses": {
          isArray: true,
          url: urlBase + "/Surveys/:id/surveyResponses",
          method: "GET"
        },

        // INTERNAL. Use Survey.surveyResponses.create() instead.
        "::create::Survey::surveyResponses": {
          url: urlBase + "/Surveys/:id/surveyResponses",
          method: "POST"
        },

        // INTERNAL. Use Survey.surveyResponses.createMany() instead.
        "::createMany::Survey::surveyResponses": {
          isArray: true,
          url: urlBase + "/Surveys/:id/surveyResponses",
          method: "POST"
        },

        // INTERNAL. Use Survey.surveyResponses.destroyAll() instead.
        "::delete::Survey::surveyResponses": {
          url: urlBase + "/Surveys/:id/surveyResponses",
          method: "DELETE"
        },

        // INTERNAL. Use Survey.surveyResponses.count() instead.
        "::count::Survey::surveyResponses": {
          url: urlBase + "/Surveys/:id/surveyResponses/count",
          method: "GET"
        }
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.SurveyResponse#updateOrCreate
         * @methodOf lbServices.SurveyResponse
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `SurveyResponse` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.SurveyResponse#destroyById
         * @methodOf lbServices.SurveyResponse
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `SurveyResponse` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.SurveyResponse#removeById
         * @methodOf lbServices.SurveyResponse
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `SurveyResponse` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.SurveyResponse#modelName
    * @propertyOf lbServices.SurveyResponse
    * @description
    * The name of the model represented by this $resource,
    * i.e. `SurveyResponse`.
    */
    R.modelName = "SurveyResponse";


        /**
         * @ngdoc method
         * @name lbServices.SurveyResponse#survey
         * @methodOf lbServices.SurveyResponse
         *
         * @description
         *
         * Fetches belongsTo relation survey.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` -
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey` object.)
         * </em>
         */
        R.survey = function() {
          var TargetResource = $injector.get("Survey");
          var action = TargetResource["::get::SurveyResponse::survey"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.TrackerData
 * @header lbServices.TrackerData
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `TrackerData` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "TrackerData",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/TrackerData/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use TrackerData.domain() instead.
        "prototype$__get__domain": {
          url: urlBase + "/TrackerData/:id/domain",
          method: "GET"
        },

        // INTERNAL. Use TrackerData.team() instead.
        "prototype$__get__team": {
          url: urlBase + "/TrackerData/:id/team",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.TrackerData#create
         * @methodOf lbServices.TrackerData
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `TrackerData` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/TrackerData",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.TrackerData#createMany
         * @methodOf lbServices.TrackerData
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `TrackerData` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/TrackerData",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.TrackerData#findById
         * @methodOf lbServices.TrackerData
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `TrackerData` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/TrackerData/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.TrackerData#find
         * @methodOf lbServices.TrackerData
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `TrackerData` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/TrackerData",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.TrackerData#findOne
         * @methodOf lbServices.TrackerData
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `TrackerData` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/TrackerData/findOne",
          method: "GET"
        }
      }
    );




    /**
    * @ngdoc property
    * @name lbServices.TrackerData#modelName
    * @propertyOf lbServices.TrackerData
    * @description
    * The name of the model represented by this $resource,
    * i.e. `TrackerData`.
    */
    R.modelName = "TrackerData";


        /**
         * @ngdoc method
         * @name lbServices.TrackerData#domain
         * @methodOf lbServices.TrackerData
         *
         * @description
         *
         * Fetches belongsTo relation domain.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` -
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Domain` object.)
         * </em>
         */
        R.domain = function() {
          var TargetResource = $injector.get("Domain");
          var action = TargetResource["::get::TrackerData::domain"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.TrackerData#team
         * @methodOf lbServices.TrackerData
         *
         * @description
         *
         * Fetches belongsTo relation team.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` -
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Team` object.)
         * </em>
         */
        R.team = function() {
          var TargetResource = $injector.get("Team");
          var action = TargetResource["::get::TrackerData::team"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.ReferralUser
 * @header lbServices.ReferralUser
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `ReferralUser` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "ReferralUser",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/ReferralUsers/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.ReferralUser#create
         * @methodOf lbServices.ReferralUser
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ReferralUser` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/ReferralUsers",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.ReferralUser#createMany
         * @methodOf lbServices.ReferralUser
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ReferralUser` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/ReferralUsers",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.ReferralUser#upsert
         * @methodOf lbServices.ReferralUser
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ReferralUser` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/ReferralUsers",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.ReferralUser#exists
         * @methodOf lbServices.ReferralUser
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` -
         */
        "exists": {
          url: urlBase + "/ReferralUsers/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.ReferralUser#findById
         * @methodOf lbServices.ReferralUser
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ReferralUser` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/ReferralUsers/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.ReferralUser#find
         * @methodOf lbServices.ReferralUser
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ReferralUser` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/ReferralUsers",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.ReferralUser#findOne
         * @methodOf lbServices.ReferralUser
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ReferralUser` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/ReferralUsers/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.ReferralUser#updateAll
         * @methodOf lbServices.ReferralUser
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/ReferralUsers/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.ReferralUser#deleteById
         * @methodOf lbServices.ReferralUser
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ReferralUser` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/ReferralUsers/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.ReferralUser#count
         * @methodOf lbServices.ReferralUser
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` -
         */
        "count": {
          url: urlBase + "/ReferralUsers/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.ReferralUser#prototype$updateAttributes
         * @methodOf lbServices.ReferralUser
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ReferralUser` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/ReferralUsers/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.ReferralUser#createChangeStream
         * @methodOf lbServices.ReferralUser
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` -
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` -
         */
        "createChangeStream": {
          url: urlBase + "/ReferralUsers/change-stream",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.ReferralUser#countAhead
         * @methodOf lbServices.ReferralUser
         *
         * @description
         *
         * Count people ahead on the waiting list
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `referralId` – `{string}` - Beta user referralId.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `ahead` – `{number=}` -
         */
        "countAhead": {
          url: urlBase + "/ReferralUsers/:referralId/countAhead",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.ReferralUser#countReferred
         * @methodOf lbServices.ReferralUser
         *
         * @description
         *
         * Count people referred by this beta referralId user
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `referralId` – `{string}` - Beta user referralId.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `referred` – `{number=}` -
         */
        "countReferred": {
          url: urlBase + "/ReferralUsers/:referralId/countReferred",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.ReferralUser#countPoints
         * @methodOf lbServices.ReferralUser
         *
         * @description
         *
         * Count beta user points (tasks and referred people)
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `email` – `{string}` - Beta user email.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `points` – `{number=}` -
         */
        "countPoints": {
          url: urlBase + "/ReferralUsers/:email/countPoints",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.ReferralUser#updatePoints
         * @methodOf lbServices.ReferralUser
         *
         * @description
         *
         * update beta user points (tasks and referred people)
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `email` – `{string}` - Beta user email.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `saved` – `{boolean=}` -
         */
        "updatePoints": {
          url: urlBase + "/ReferralUsers/:email/updatePoints",
          method: "POST"
        }
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.ReferralUser#updateOrCreate
         * @methodOf lbServices.ReferralUser
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ReferralUser` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.ReferralUser#update
         * @methodOf lbServices.ReferralUser
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.ReferralUser#destroyById
         * @methodOf lbServices.ReferralUser
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ReferralUser` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.ReferralUser#removeById
         * @methodOf lbServices.ReferralUser
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `ReferralUser` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.ReferralUser#modelName
    * @propertyOf lbServices.ReferralUser
    * @description
    * The name of the model represented by this $resource,
    * i.e. `ReferralUser`.
    */
    R.modelName = "ReferralUser";


    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Survey-view
 * @header lbServices.Survey-view
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Survey-view` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Survey-view",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/survey-views/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Survey-view.survey() instead.
        "prototype$__get__survey": {
          url: urlBase + "/survey-views/:id/survey",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey-view#create
         * @methodOf lbServices.Survey-view
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey-view` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/survey-views",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey-view#createMany
         * @methodOf lbServices.Survey-view
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey-view` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/survey-views",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey-view#upsert
         * @methodOf lbServices.Survey-view
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey-view` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/survey-views",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey-view#exists
         * @methodOf lbServices.Survey-view
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` -
         */
        "exists": {
          url: urlBase + "/survey-views/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey-view#findById
         * @methodOf lbServices.Survey-view
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey-view` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/survey-views/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey-view#find
         * @methodOf lbServices.Survey-view
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey-view` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/survey-views",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey-view#findOne
         * @methodOf lbServices.Survey-view
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey-view` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/survey-views/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey-view#updateAll
         * @methodOf lbServices.Survey-view
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/survey-views/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey-view#deleteById
         * @methodOf lbServices.Survey-view
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey-view` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/survey-views/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey-view#count
         * @methodOf lbServices.Survey-view
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` -
         */
        "count": {
          url: urlBase + "/survey-views/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey-view#prototype$updateAttributes
         * @methodOf lbServices.Survey-view
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey-view` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/survey-views/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey-view#createChangeStream
         * @methodOf lbServices.Survey-view
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` -
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` -
         */
        "createChangeStream": {
          url: urlBase + "/survey-views/change-stream",
          method: "POST"
        }
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Survey-view#updateOrCreate
         * @methodOf lbServices.Survey-view
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey-view` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Survey-view#update
         * @methodOf lbServices.Survey-view
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Survey-view#destroyById
         * @methodOf lbServices.Survey-view
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey-view` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Survey-view#removeById
         * @methodOf lbServices.Survey-view
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey-view` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Survey-view#modelName
    * @propertyOf lbServices.Survey-view
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Survey-view`.
    */
    R.modelName = "Survey-view";


        /**
         * @ngdoc method
         * @name lbServices.Survey-view#survey
         * @methodOf lbServices.Survey-view
         *
         * @description
         *
         * Fetches belongsTo relation survey.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` -
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey` object.)
         * </em>
         */
        R.survey = function() {
          var TargetResource = $injector.get("Survey");
          var action = TargetResource["::get::survey-view::survey"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Survey-visit
 * @header lbServices.Survey-visit
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Survey-visit` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Survey-visit",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/survey-visits/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Survey-visit.survey() instead.
        "prototype$__get__survey": {
          url: urlBase + "/survey-visits/:id/survey",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey-visit#create
         * @methodOf lbServices.Survey-visit
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey-visit` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/survey-visits",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey-visit#createMany
         * @methodOf lbServices.Survey-visit
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey-visit` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/survey-visits",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey-visit#upsert
         * @methodOf lbServices.Survey-visit
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey-visit` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/survey-visits",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey-visit#exists
         * @methodOf lbServices.Survey-visit
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` -
         */
        "exists": {
          url: urlBase + "/survey-visits/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey-visit#findById
         * @methodOf lbServices.Survey-visit
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey-visit` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/survey-visits/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey-visit#find
         * @methodOf lbServices.Survey-visit
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey-visit` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/survey-visits",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey-visit#findOne
         * @methodOf lbServices.Survey-visit
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey-visit` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/survey-visits/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey-visit#updateAll
         * @methodOf lbServices.Survey-visit
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/survey-visits/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey-visit#deleteById
         * @methodOf lbServices.Survey-visit
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey-visit` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/survey-visits/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey-visit#count
         * @methodOf lbServices.Survey-visit
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` -
         */
        "count": {
          url: urlBase + "/survey-visits/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey-visit#prototype$updateAttributes
         * @methodOf lbServices.Survey-visit
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey-visit` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/survey-visits/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey-visit#createChangeStream
         * @methodOf lbServices.Survey-visit
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` -
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` -
         */
        "createChangeStream": {
          url: urlBase + "/survey-visits/change-stream",
          method: "POST"
        }
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Survey-visit#updateOrCreate
         * @methodOf lbServices.Survey-visit
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey-visit` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Survey-visit#update
         * @methodOf lbServices.Survey-visit
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Survey-visit#destroyById
         * @methodOf lbServices.Survey-visit
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey-visit` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Survey-visit#removeById
         * @methodOf lbServices.Survey-visit
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey-visit` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Survey-visit#modelName
    * @propertyOf lbServices.Survey-visit
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Survey-visit`.
    */
    R.modelName = "Survey-visit";


        /**
         * @ngdoc method
         * @name lbServices.Survey-visit#survey
         * @methodOf lbServices.Survey-visit
         *
         * @description
         *
         * Fetches belongsTo relation survey.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` -
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey` object.)
         * </em>
         */
        R.survey = function() {
          var TargetResource = $injector.get("Survey");
          var action = TargetResource["::get::survey-visit::survey"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Notifications
 * @header lbServices.Notifications
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Notifications` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Notifications",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Notifications/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.Notifications#create
         * @methodOf lbServices.Notifications
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Notifications` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Notifications",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Notifications#createMany
         * @methodOf lbServices.Notifications
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Notifications` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/Notifications",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Notifications#upsert
         * @methodOf lbServices.Notifications
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Notifications` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Notifications",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Notifications#exists
         * @methodOf lbServices.Notifications
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` -
         */
        "exists": {
          url: urlBase + "/Notifications/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Notifications#findById
         * @methodOf lbServices.Notifications
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Notifications` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Notifications/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Notifications#find
         * @methodOf lbServices.Notifications
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Notifications` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Notifications",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Notifications#findOne
         * @methodOf lbServices.Notifications
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Notifications` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Notifications/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Notifications#updateAll
         * @methodOf lbServices.Notifications
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/Notifications/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Notifications#deleteById
         * @methodOf lbServices.Notifications
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Notifications` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/Notifications/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Notifications#count
         * @methodOf lbServices.Notifications
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` -
         */
        "count": {
          url: urlBase + "/Notifications/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Notifications#prototype$updateAttributes
         * @methodOf lbServices.Notifications
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Notifications` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Notifications/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Notifications#createChangeStream
         * @methodOf lbServices.Notifications
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` -
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` -
         */
        "createChangeStream": {
          url: urlBase + "/Notifications/change-stream",
          method: "POST"
        }
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Notifications#updateOrCreate
         * @methodOf lbServices.Notifications
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Notifications` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Notifications#update
         * @methodOf lbServices.Notifications
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Notifications#destroyById
         * @methodOf lbServices.Notifications
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Notifications` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Notifications#removeById
         * @methodOf lbServices.Notifications
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Notifications` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Notifications#modelName
    * @propertyOf lbServices.Notifications
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Notifications`.
    */
    R.modelName = "Notifications";


    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Survey-minimize
 * @header lbServices.Survey-minimize
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Survey-minimize` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Survey-minimize",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/survey-minimizes/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Survey-minimize.survey() instead.
        "prototype$__get__survey": {
          url: urlBase + "/survey-minimizes/:id/survey",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey-minimize#create
         * @methodOf lbServices.Survey-minimize
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey-minimize` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/survey-minimizes",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey-minimize#createMany
         * @methodOf lbServices.Survey-minimize
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey-minimize` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/survey-minimizes",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey-minimize#upsert
         * @methodOf lbServices.Survey-minimize
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey-minimize` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/survey-minimizes",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey-minimize#exists
         * @methodOf lbServices.Survey-minimize
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` -
         */
        "exists": {
          url: urlBase + "/survey-minimizes/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey-minimize#findById
         * @methodOf lbServices.Survey-minimize
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey-minimize` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/survey-minimizes/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey-minimize#find
         * @methodOf lbServices.Survey-minimize
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey-minimize` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/survey-minimizes",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey-minimize#findOne
         * @methodOf lbServices.Survey-minimize
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey-minimize` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/survey-minimizes/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey-minimize#updateAll
         * @methodOf lbServices.Survey-minimize
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/survey-minimizes/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey-minimize#deleteById
         * @methodOf lbServices.Survey-minimize
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey-minimize` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/survey-minimizes/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey-minimize#count
         * @methodOf lbServices.Survey-minimize
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` -
         */
        "count": {
          url: urlBase + "/survey-minimizes/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey-minimize#prototype$updateAttributes
         * @methodOf lbServices.Survey-minimize
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey-minimize` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/survey-minimizes/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Survey-minimize#createChangeStream
         * @methodOf lbServices.Survey-minimize
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` -
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` -
         */
        "createChangeStream": {
          url: urlBase + "/survey-minimizes/change-stream",
          method: "POST"
        }
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Survey-minimize#updateOrCreate
         * @methodOf lbServices.Survey-minimize
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey-minimize` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Survey-minimize#update
         * @methodOf lbServices.Survey-minimize
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Survey-minimize#destroyById
         * @methodOf lbServices.Survey-minimize
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey-minimize` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Survey-minimize#removeById
         * @methodOf lbServices.Survey-minimize
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey-minimize` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Survey-minimize#modelName
    * @propertyOf lbServices.Survey-minimize
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Survey-minimize`.
    */
    R.modelName = "Survey-minimize";


        /**
         * @ngdoc method
         * @name lbServices.Survey-minimize#survey
         * @methodOf lbServices.Survey-minimize
         *
         * @description
         *
         * Fetches belongsTo relation survey.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` -
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Survey` object.)
         * </em>
         */
        R.survey = function() {
          var TargetResource = $injector.get("Survey");
          var action = TargetResource["::get::survey-minimize::survey"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Team
 * @header lbServices.Team
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Team` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Team",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Teams/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Team.domains.findById() instead.
        "prototype$__findById__domains": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Teams/:id/domains/:fk",
          method: "GET"
        },

        // INTERNAL. Use Team.domains.destroyById() instead.
        "prototype$__destroyById__domains": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Teams/:id/domains/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Team.domains.updateById() instead.
        "prototype$__updateById__domains": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Teams/:id/domains/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Team.domains.link() instead.
        "prototype$__link__domains": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Teams/:id/domains/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Team.domains.unlink() instead.
        "prototype$__unlink__domains": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Teams/:id/domains/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Team.domains.exists() instead.
        "prototype$__exists__domains": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Teams/:id/domains/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use Team.users.findById() instead.
        "prototype$__findById__users": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Teams/:id/users/:fk",
          method: "GET"
        },

        // INTERNAL. Use Team.users.destroyById() instead.
        "prototype$__destroyById__users": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Teams/:id/users/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Team.users.updateById() instead.
        "prototype$__updateById__users": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Teams/:id/users/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Team.domains() instead.
        "prototype$__get__domains": {
          isArray: true,
          url: urlBase + "/Teams/:id/domains",
          method: "GET"
        },

        // INTERNAL. Use Team.domains.create() instead.
        "prototype$__create__domains": {
          url: urlBase + "/Teams/:id/domains",
          method: "POST"
        },

        // INTERNAL. Use Team.domains.destroyAll() instead.
        "prototype$__delete__domains": {
          url: urlBase + "/Teams/:id/domains",
          method: "DELETE"
        },

        // INTERNAL. Use Team.domains.count() instead.
        "prototype$__count__domains": {
          url: urlBase + "/Teams/:id/domains/count",
          method: "GET"
        },

        // INTERNAL. Use Team.users() instead.
        "prototype$__get__users": {
          isArray: true,
          url: urlBase + "/Teams/:id/users",
          method: "GET"
        },

        // INTERNAL. Use Team.users.create() instead.
        "prototype$__create__users": {
          url: urlBase + "/Teams/:id/users",
          method: "POST"
        },

        // INTERNAL. Use Team.users.destroyAll() instead.
        "prototype$__delete__users": {
          url: urlBase + "/Teams/:id/users",
          method: "DELETE"
        },

        // INTERNAL. Use Team.users.count() instead.
        "prototype$__count__users": {
          url: urlBase + "/Teams/:id/users/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Team#create
         * @methodOf lbServices.Team
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Team` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Teams",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Team#createMany
         * @methodOf lbServices.Team
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Team` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/Teams",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Team#upsert
         * @methodOf lbServices.Team
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Team` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Teams",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Team#exists
         * @methodOf lbServices.Team
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` -
         */
        "exists": {
          url: urlBase + "/Teams/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Team#findById
         * @methodOf lbServices.Team
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Team` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Teams/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Team#find
         * @methodOf lbServices.Team
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Team` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Teams",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Team#findOne
         * @methodOf lbServices.Team
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Team` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Teams/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Team#updateAll
         * @methodOf lbServices.Team
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/Teams/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Team#deleteById
         * @methodOf lbServices.Team
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Team` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/Teams/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Team#count
         * @methodOf lbServices.Team
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` -
         */
        "count": {
          url: urlBase + "/Teams/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Team#prototype$updateAttributes
         * @methodOf lbServices.Team
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Team` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Teams/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Team#createChangeStream
         * @methodOf lbServices.Team
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` -
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` -
         */
        "createChangeStream": {
          url: urlBase + "/Teams/change-stream",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Team#getUsers
         * @methodOf lbServices.Team
         *
         * @description
         *
         * get team users
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{number}` - Team id to getUsers
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `data` – `{object=}` -
         */
        "getUsers": {
          url: urlBase + "/Teams/:id/getUsers",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Team#inviteUser
         * @methodOf lbServices.Team
         *
         * @description
         *
         * invite user by email to team
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `data` – `{object=}` -
         *
         *  - `id` – `{number}` - Team id to getUsers
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `data` – `{object=}` -
         */
        "inviteUser": {
          url: urlBase + "/Teams/:id/inviteUser",
          method: "POST"
        },

        // INTERNAL. Use Domain.teams() instead.
        "::get::Domain::teams": {
          url: urlBase + "/Domains/:id/teams",
          method: "GET"
        },

        // INTERNAL. Use AuthUser.teams.findById() instead.
        "::findById::AuthUser::teams": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/AuthUsers/:id/teams/:fk",
          method: "GET"
        },

        // INTERNAL. Use AuthUser.teams.destroyById() instead.
        "::destroyById::AuthUser::teams": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/AuthUsers/:id/teams/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use AuthUser.teams.updateById() instead.
        "::updateById::AuthUser::teams": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/AuthUsers/:id/teams/:fk",
          method: "PUT"
        },

        // INTERNAL. Use AuthUser.teams.link() instead.
        "::link::AuthUser::teams": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/AuthUsers/:id/teams/rel/:fk",
          method: "PUT"
        },

        // INTERNAL. Use AuthUser.teams.unlink() instead.
        "::unlink::AuthUser::teams": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/AuthUsers/:id/teams/rel/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use AuthUser.teams.exists() instead.
        "::exists::AuthUser::teams": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/AuthUsers/:id/teams/rel/:fk",
          method: "HEAD"
        },

        // INTERNAL. Use AuthUser.teams() instead.
        "::get::AuthUser::teams": {
          isArray: true,
          url: urlBase + "/AuthUsers/:id/teams",
          method: "GET"
        },

        // INTERNAL. Use AuthUser.teams.create() instead.
        "::create::AuthUser::teams": {
          url: urlBase + "/AuthUsers/:id/teams",
          method: "POST"
        },

        // INTERNAL. Use AuthUser.teams.createMany() instead.
        "::createMany::AuthUser::teams": {
          isArray: true,
          url: urlBase + "/AuthUsers/:id/teams",
          method: "POST"
        },

        // INTERNAL. Use AuthUser.teams.destroyAll() instead.
        "::delete::AuthUser::teams": {
          url: urlBase + "/AuthUsers/:id/teams",
          method: "DELETE"
        },

        // INTERNAL. Use AuthUser.teams.count() instead.
        "::count::AuthUser::teams": {
          url: urlBase + "/AuthUsers/:id/teams/count",
          method: "GET"
        },

        // INTERNAL. Use TrackerData.team() instead.
        "::get::TrackerData::team": {
          url: urlBase + "/TrackerData/:id/team",
          method: "GET"
        },

        // INTERNAL. Use Account.teams.findById() instead.
        "::findById::Account::teams": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Accounts/:id/teams/:fk",
          method: "GET"
        },

        // INTERNAL. Use Account.teams.destroyById() instead.
        "::destroyById::Account::teams": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Accounts/:id/teams/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Account.teams.updateById() instead.
        "::updateById::Account::teams": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Accounts/:id/teams/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Account.teams() instead.
        "::get::Account::teams": {
          isArray: true,
          url: urlBase + "/Accounts/:id/teams",
          method: "GET"
        },

        // INTERNAL. Use Account.teams.create() instead.
        "::create::Account::teams": {
          url: urlBase + "/Accounts/:id/teams",
          method: "POST"
        },

        // INTERNAL. Use Account.teams.createMany() instead.
        "::createMany::Account::teams": {
          isArray: true,
          url: urlBase + "/Accounts/:id/teams",
          method: "POST"
        },

        // INTERNAL. Use Account.teams.destroyAll() instead.
        "::delete::Account::teams": {
          url: urlBase + "/Accounts/:id/teams",
          method: "DELETE"
        },

        // INTERNAL. Use Account.teams.count() instead.
        "::count::Account::teams": {
          url: urlBase + "/Accounts/:id/teams/count",
          method: "GET"
        }
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Team#updateOrCreate
         * @methodOf lbServices.Team
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Team` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Team#update
         * @methodOf lbServices.Team
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Team#destroyById
         * @methodOf lbServices.Team
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Team` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Team#removeById
         * @methodOf lbServices.Team
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Team` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Team#modelName
    * @propertyOf lbServices.Team
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Team`.
    */
    R.modelName = "Team";

    /**
     * @ngdoc object
     * @name lbServices.Team.domains
     * @header lbServices.Team.domains
     * @object
     * @description
     *
     * The object `Team.domains` groups methods
     * manipulating `Domain` instances related to `Team`.
     *
     * Call {@link lbServices.Team#domains Team.domains()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Team#domains
         * @methodOf lbServices.Team
         *
         * @description
         *
         * Queries domains of Team.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` -
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Domain` object.)
         * </em>
         */
        R.domains = function() {
          var TargetResource = $injector.get("Domain");
          var action = TargetResource["::get::Team::domains"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Team.domains#count
         * @methodOf lbServices.Team.domains
         *
         * @description
         *
         * Counts domains of Team.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` -
         */
        R.domains.count = function() {
          var TargetResource = $injector.get("Domain");
          var action = TargetResource["::count::Team::domains"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Team.domains#create
         * @methodOf lbServices.Team.domains
         *
         * @description
         *
         * Creates a new instance in domains of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Domain` object.)
         * </em>
         */
        R.domains.create = function() {
          var TargetResource = $injector.get("Domain");
          var action = TargetResource["::create::Team::domains"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Team.domains#createMany
         * @methodOf lbServices.Team.domains
         *
         * @description
         *
         * Creates a new instance in domains of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Domain` object.)
         * </em>
         */
        R.domains.createMany = function() {
          var TargetResource = $injector.get("Domain");
          var action = TargetResource["::createMany::Team::domains"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Team.domains#destroyAll
         * @methodOf lbServices.Team.domains
         *
         * @description
         *
         * Deletes all domains of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.domains.destroyAll = function() {
          var TargetResource = $injector.get("Domain");
          var action = TargetResource["::delete::Team::domains"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Team.domains#destroyById
         * @methodOf lbServices.Team.domains
         *
         * @description
         *
         * Delete a related item by id for domains.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for domains
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.domains.destroyById = function() {
          var TargetResource = $injector.get("Domain");
          var action = TargetResource["::destroyById::Team::domains"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Team.domains#exists
         * @methodOf lbServices.Team.domains
         *
         * @description
         *
         * Check the existence of domains relation to an item by id.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for domains
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Domain` object.)
         * </em>
         */
        R.domains.exists = function() {
          var TargetResource = $injector.get("Domain");
          var action = TargetResource["::exists::Team::domains"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Team.domains#findById
         * @methodOf lbServices.Team.domains
         *
         * @description
         *
         * Find a related item by id for domains.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for domains
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Domain` object.)
         * </em>
         */
        R.domains.findById = function() {
          var TargetResource = $injector.get("Domain");
          var action = TargetResource["::findById::Team::domains"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Team.domains#link
         * @methodOf lbServices.Team.domains
         *
         * @description
         *
         * Add a related item by id for domains.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for domains
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Domain` object.)
         * </em>
         */
        R.domains.link = function() {
          var TargetResource = $injector.get("Domain");
          var action = TargetResource["::link::Team::domains"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Team.domains#unlink
         * @methodOf lbServices.Team.domains
         *
         * @description
         *
         * Remove the domains relation to an item by id.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for domains
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.domains.unlink = function() {
          var TargetResource = $injector.get("Domain");
          var action = TargetResource["::unlink::Team::domains"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Team.domains#updateById
         * @methodOf lbServices.Team.domains
         *
         * @description
         *
         * Update a related item by id for domains.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for domains
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Domain` object.)
         * </em>
         */
        R.domains.updateById = function() {
          var TargetResource = $injector.get("Domain");
          var action = TargetResource["::updateById::Team::domains"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Team.users
     * @header lbServices.Team.users
     * @object
     * @description
     *
     * The object `Team.users` groups methods
     * manipulating `AuthUser` instances related to `Team`.
     *
     * Call {@link lbServices.Team#users Team.users()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Team#users
         * @methodOf lbServices.Team
         *
         * @description
         *
         * Queries users of Team.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` -
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AuthUser` object.)
         * </em>
         */
        R.users = function() {
          var TargetResource = $injector.get("AuthUser");
          var action = TargetResource["::get::Team::users"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Team.users#count
         * @methodOf lbServices.Team.users
         *
         * @description
         *
         * Counts users of Team.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` -
         */
        R.users.count = function() {
          var TargetResource = $injector.get("AuthUser");
          var action = TargetResource["::count::Team::users"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Team.users#create
         * @methodOf lbServices.Team.users
         *
         * @description
         *
         * Creates a new instance in users of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AuthUser` object.)
         * </em>
         */
        R.users.create = function() {
          var TargetResource = $injector.get("AuthUser");
          var action = TargetResource["::create::Team::users"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Team.users#createMany
         * @methodOf lbServices.Team.users
         *
         * @description
         *
         * Creates a new instance in users of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AuthUser` object.)
         * </em>
         */
        R.users.createMany = function() {
          var TargetResource = $injector.get("AuthUser");
          var action = TargetResource["::createMany::Team::users"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Team.users#destroyAll
         * @methodOf lbServices.Team.users
         *
         * @description
         *
         * Deletes all users of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.users.destroyAll = function() {
          var TargetResource = $injector.get("AuthUser");
          var action = TargetResource["::delete::Team::users"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Team.users#destroyById
         * @methodOf lbServices.Team.users
         *
         * @description
         *
         * Delete a related item by id for users.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for users
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.users.destroyById = function() {
          var TargetResource = $injector.get("AuthUser");
          var action = TargetResource["::destroyById::Team::users"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Team.users#findById
         * @methodOf lbServices.Team.users
         *
         * @description
         *
         * Find a related item by id for users.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for users
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AuthUser` object.)
         * </em>
         */
        R.users.findById = function() {
          var TargetResource = $injector.get("AuthUser");
          var action = TargetResource["::findById::Team::users"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Team.users#updateById
         * @methodOf lbServices.Team.users
         *
         * @description
         *
         * Update a related item by id for users.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for users
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AuthUser` object.)
         * </em>
         */
        R.users.updateById = function() {
          var TargetResource = $injector.get("AuthUser");
          var action = TargetResource["::updateById::Team::users"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Account
 * @header lbServices.Account
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Account` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Account",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Accounts/:id",
      { 'id': '@id' },
      {

        // INTERNAL. Use Account.user() instead.
        "prototype$__get__user": {
          url: urlBase + "/Accounts/:id/user",
          method: "GET"
        },

        // INTERNAL. Use Account.teams.findById() instead.
        "prototype$__findById__teams": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Accounts/:id/teams/:fk",
          method: "GET"
        },

        // INTERNAL. Use Account.teams.destroyById() instead.
        "prototype$__destroyById__teams": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Accounts/:id/teams/:fk",
          method: "DELETE"
        },

        // INTERNAL. Use Account.teams.updateById() instead.
        "prototype$__updateById__teams": {
          params: {
          'fk': '@fk'
          },
          url: urlBase + "/Accounts/:id/teams/:fk",
          method: "PUT"
        },

        // INTERNAL. Use Account.plans() instead.
        "prototype$__get__plans": {
          url: urlBase + "/Accounts/:id/plans",
          method: "GET"
        },

        // INTERNAL. Use Account.plans.create() instead.
        "prototype$__create__plans": {
          url: urlBase + "/Accounts/:id/plans",
          method: "POST"
        },

        // INTERNAL. Use Account.plans.update() instead.
        "prototype$__update__plans": {
          url: urlBase + "/Accounts/:id/plans",
          method: "PUT"
        },

        // INTERNAL. Use Account.plans.destroy() instead.
        "prototype$__destroy__plans": {
          url: urlBase + "/Accounts/:id/plans",
          method: "DELETE"
        },

        // INTERNAL. Use Account.teams() instead.
        "prototype$__get__teams": {
          isArray: true,
          url: urlBase + "/Accounts/:id/teams",
          method: "GET"
        },

        // INTERNAL. Use Account.teams.create() instead.
        "prototype$__create__teams": {
          url: urlBase + "/Accounts/:id/teams",
          method: "POST"
        },

        // INTERNAL. Use Account.teams.destroyAll() instead.
        "prototype$__delete__teams": {
          url: urlBase + "/Accounts/:id/teams",
          method: "DELETE"
        },

        // INTERNAL. Use Account.teams.count() instead.
        "prototype$__count__teams": {
          url: urlBase + "/Accounts/:id/teams/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Account#create
         * @methodOf lbServices.Account
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Account` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Accounts",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Account#createMany
         * @methodOf lbServices.Account
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Account` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/Accounts",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Account#upsert
         * @methodOf lbServices.Account
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Account` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Accounts",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Account#exists
         * @methodOf lbServices.Account
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` -
         */
        "exists": {
          url: urlBase + "/Accounts/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Account#findById
         * @methodOf lbServices.Account
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Account` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Accounts/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Account#find
         * @methodOf lbServices.Account
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Account` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Accounts",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Account#findOne
         * @methodOf lbServices.Account
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Account` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Accounts/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Account#updateAll
         * @methodOf lbServices.Account
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/Accounts/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Account#deleteById
         * @methodOf lbServices.Account
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Account` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/Accounts/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Account#count
         * @methodOf lbServices.Account
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` -
         */
        "count": {
          url: urlBase + "/Accounts/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Account#prototype$updateAttributes
         * @methodOf lbServices.Account
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Account` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Accounts/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Account#createChangeStream
         * @methodOf lbServices.Account
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` -
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` -
         */
        "createChangeStream": {
          url: urlBase + "/Accounts/change-stream",
          method: "POST"
        }
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Account#updateOrCreate
         * @methodOf lbServices.Account
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Account` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Account#update
         * @methodOf lbServices.Account
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Account#destroyById
         * @methodOf lbServices.Account
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Account` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Account#removeById
         * @methodOf lbServices.Account
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Account` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Account#modelName
    * @propertyOf lbServices.Account
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Account`.
    */
    R.modelName = "Account";


        /**
         * @ngdoc method
         * @name lbServices.Account#user
         * @methodOf lbServices.Account
         *
         * @description
         *
         * Fetches belongsTo relation user.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` -
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `AuthUser` object.)
         * </em>
         */
        R.user = function() {
          var TargetResource = $injector.get("AuthUser");
          var action = TargetResource["::get::Account::user"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Account.teams
     * @header lbServices.Account.teams
     * @object
     * @description
     *
     * The object `Account.teams` groups methods
     * manipulating `Team` instances related to `Account`.
     *
     * Call {@link lbServices.Account#teams Account.teams()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Account#teams
         * @methodOf lbServices.Account
         *
         * @description
         *
         * Queries teams of Account.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `filter` – `{object=}` -
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Team` object.)
         * </em>
         */
        R.teams = function() {
          var TargetResource = $injector.get("Team");
          var action = TargetResource["::get::Account::teams"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Account.teams#count
         * @methodOf lbServices.Account.teams
         *
         * @description
         *
         * Counts teams of Account.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` -
         */
        R.teams.count = function() {
          var TargetResource = $injector.get("Team");
          var action = TargetResource["::count::Account::teams"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Account.teams#create
         * @methodOf lbServices.Account.teams
         *
         * @description
         *
         * Creates a new instance in teams of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Team` object.)
         * </em>
         */
        R.teams.create = function() {
          var TargetResource = $injector.get("Team");
          var action = TargetResource["::create::Account::teams"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Account.teams#createMany
         * @methodOf lbServices.Account.teams
         *
         * @description
         *
         * Creates a new instance in teams of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Team` object.)
         * </em>
         */
        R.teams.createMany = function() {
          var TargetResource = $injector.get("Team");
          var action = TargetResource["::createMany::Account::teams"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Account.teams#destroyAll
         * @methodOf lbServices.Account.teams
         *
         * @description
         *
         * Deletes all teams of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.teams.destroyAll = function() {
          var TargetResource = $injector.get("Team");
          var action = TargetResource["::delete::Account::teams"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Account.teams#destroyById
         * @methodOf lbServices.Account.teams
         *
         * @description
         *
         * Delete a related item by id for teams.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for teams
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.teams.destroyById = function() {
          var TargetResource = $injector.get("Team");
          var action = TargetResource["::destroyById::Account::teams"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Account.teams#findById
         * @methodOf lbServices.Account.teams
         *
         * @description
         *
         * Find a related item by id for teams.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for teams
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Team` object.)
         * </em>
         */
        R.teams.findById = function() {
          var TargetResource = $injector.get("Team");
          var action = TargetResource["::findById::Account::teams"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Account.teams#updateById
         * @methodOf lbServices.Account.teams
         *
         * @description
         *
         * Update a related item by id for teams.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `fk` – `{*}` - Foreign key for teams
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Team` object.)
         * </em>
         */
        R.teams.updateById = function() {
          var TargetResource = $injector.get("Team");
          var action = TargetResource["::updateById::Account::teams"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Account.plans
     * @header lbServices.Account.plans
     * @object
     * @description
     *
     * The object `Account.plans` groups methods
     * manipulating `Plan` instances related to `Account`.
     *
     * Call {@link lbServices.Account#plans Account.plans()}
     * to query all related instances.
     */


        /**
         * @ngdoc method
         * @name lbServices.Account#plans
         * @methodOf lbServices.Account
         *
         * @description
         *
         * Fetches hasOne relation plans.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         *  - `refresh` – `{boolean=}` -
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Plan` object.)
         * </em>
         */
        R.plans = function() {
          var TargetResource = $injector.get("Plan");
          var action = TargetResource["::get::Account::plans"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Account.plans#create
         * @methodOf lbServices.Account.plans
         *
         * @description
         *
         * Creates a new instance in plans of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Plan` object.)
         * </em>
         */
        R.plans.create = function() {
          var TargetResource = $injector.get("Plan");
          var action = TargetResource["::create::Account::plans"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Account.plans#createMany
         * @methodOf lbServices.Account.plans
         *
         * @description
         *
         * Creates a new instance in plans of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Plan` object.)
         * </em>
         */
        R.plans.createMany = function() {
          var TargetResource = $injector.get("Plan");
          var action = TargetResource["::createMany::Account::plans"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Account.plans#destroy
         * @methodOf lbServices.Account.plans
         *
         * @description
         *
         * Deletes plans of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * This method returns no data.
         */
        R.plans.destroy = function() {
          var TargetResource = $injector.get("Plan");
          var action = TargetResource["::destroy::Account::plans"];
          return action.apply(R, arguments);
        };

        /**
         * @ngdoc method
         * @name lbServices.Account.plans#update
         * @methodOf lbServices.Account.plans
         *
         * @description
         *
         * Update plans of this model.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Plan` object.)
         * </em>
         */
        R.plans.update = function() {
          var TargetResource = $injector.get("Plan");
          var action = TargetResource["::update::Account::plans"];
          return action.apply(R, arguments);
        };

    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Plan
 * @header lbServices.Plan
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Plan` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Plan",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Plans/:id",
      { 'id': '@id' },
      {

        /**
         * @ngdoc method
         * @name lbServices.Plan#create
         * @methodOf lbServices.Plan
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Plan` object.)
         * </em>
         */
        "create": {
          url: urlBase + "/Plans",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Plan#createMany
         * @methodOf lbServices.Plan
         *
         * @description
         *
         * Create a new instance of the model and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Plan` object.)
         * </em>
         */
        "createMany": {
          isArray: true,
          url: urlBase + "/Plans",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Plan#upsert
         * @methodOf lbServices.Plan
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Plan` object.)
         * </em>
         */
        "upsert": {
          url: urlBase + "/Plans",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Plan#exists
         * @methodOf lbServices.Plan
         *
         * @description
         *
         * Check whether a model instance exists in the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `exists` – `{boolean=}` -
         */
        "exists": {
          url: urlBase + "/Plans/:id/exists",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Plan#findById
         * @methodOf lbServices.Plan
         *
         * @description
         *
         * Find a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         *  - `filter` – `{object=}` - Filter defining fields and include
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Plan` object.)
         * </em>
         */
        "findById": {
          url: urlBase + "/Plans/:id",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Plan#find
         * @methodOf lbServices.Plan
         *
         * @description
         *
         * Find all instances of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Array.<Object>,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Array.<Object>} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Plan` object.)
         * </em>
         */
        "find": {
          isArray: true,
          url: urlBase + "/Plans",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Plan#findOne
         * @methodOf lbServices.Plan
         *
         * @description
         *
         * Find first instance of the model matched by filter from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Plan` object.)
         * </em>
         */
        "findOne": {
          url: urlBase + "/Plans/findOne",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Plan#updateAll
         * @methodOf lbServices.Plan
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        "updateAll": {
          url: urlBase + "/Plans/update",
          method: "POST"
        },

        /**
         * @ngdoc method
         * @name lbServices.Plan#deleteById
         * @methodOf lbServices.Plan
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Plan` object.)
         * </em>
         */
        "deleteById": {
          url: urlBase + "/Plans/:id",
          method: "DELETE"
        },

        /**
         * @ngdoc method
         * @name lbServices.Plan#count
         * @methodOf lbServices.Plan
         *
         * @description
         *
         * Count instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `count` – `{number=}` -
         */
        "count": {
          url: urlBase + "/Plans/count",
          method: "GET"
        },

        /**
         * @ngdoc method
         * @name lbServices.Plan#prototype$updateAttributes
         * @methodOf lbServices.Plan
         *
         * @description
         *
         * Update attributes for a model instance and persist it into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - PersistedModel id
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Plan` object.)
         * </em>
         */
        "prototype$updateAttributes": {
          url: urlBase + "/Plans/:id",
          method: "PUT"
        },

        /**
         * @ngdoc method
         * @name lbServices.Plan#createChangeStream
         * @methodOf lbServices.Plan
         *
         * @description
         *
         * Create a change stream.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         *  - `options` – `{object=}` -
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * Data properties:
         *
         *  - `changes` – `{ReadableStream=}` -
         */
        "createChangeStream": {
          url: urlBase + "/Plans/change-stream",
          method: "POST"
        },

        // INTERNAL. Use Account.plans() instead.
        "::get::Account::plans": {
          url: urlBase + "/Accounts/:id/plans",
          method: "GET"
        },

        // INTERNAL. Use Account.plans.create() instead.
        "::create::Account::plans": {
          url: urlBase + "/Accounts/:id/plans",
          method: "POST"
        },

        // INTERNAL. Use Account.plans.createMany() instead.
        "::createMany::Account::plans": {
          isArray: true,
          url: urlBase + "/Accounts/:id/plans",
          method: "POST"
        },

        // INTERNAL. Use Account.plans.update() instead.
        "::update::Account::plans": {
          url: urlBase + "/Accounts/:id/plans",
          method: "PUT"
        },

        // INTERNAL. Use Account.plans.destroy() instead.
        "::destroy::Account::plans": {
          url: urlBase + "/Accounts/:id/plans",
          method: "DELETE"
        }
      }
    );



        /**
         * @ngdoc method
         * @name lbServices.Plan#updateOrCreate
         * @methodOf lbServices.Plan
         *
         * @description
         *
         * Update an existing model instance or insert a new one into the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *   This method does not accept any parameters.
         *   Supply an empty object or omit this argument altogether.
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Plan` object.)
         * </em>
         */
        R["updateOrCreate"] = R["upsert"];

        /**
         * @ngdoc method
         * @name lbServices.Plan#update
         * @methodOf lbServices.Plan
         *
         * @description
         *
         * Update instances of the model matched by where from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `where` – `{object=}` - Criteria to match model instances
         *
         * @param {Object} postData Request data.
         *
         * This method expects a subset of model properties as request parameters.
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * The number of instances updated
         */
        R["update"] = R["updateAll"];

        /**
         * @ngdoc method
         * @name lbServices.Plan#destroyById
         * @methodOf lbServices.Plan
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Plan` object.)
         * </em>
         */
        R["destroyById"] = R["deleteById"];

        /**
         * @ngdoc method
         * @name lbServices.Plan#removeById
         * @methodOf lbServices.Plan
         *
         * @description
         *
         * Delete a model instance by id from the data source.
         *
         * @param {Object=} parameters Request parameters.
         *
         *  - `id` – `{*}` - Model id
         *
         * @param {function(Object,Object)=} successCb
         *   Success callback with two arguments: `value`, `responseHeaders`.
         *
         * @param {function(Object)=} errorCb Error callback with one argument:
         *   `httpResponse`.
         *
         * @returns {Object} An empty reference that will be
         *   populated with the actual data once the response is returned
         *   from the server.
         *
         * <em>
         * (The remote method definition does not provide any description.
         * This usually means the response is a `Plan` object.)
         * </em>
         */
        R["removeById"] = R["deleteById"];


    /**
    * @ngdoc property
    * @name lbServices.Plan#modelName
    * @propertyOf lbServices.Plan
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Plan`.
    */
    R.modelName = "Plan";


    return R;
  }]);

/**
 * @ngdoc object
 * @name lbServices.Email
 * @header lbServices.Email
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Email` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
module.factory(
  "Email",
  ['LoopBackResource', 'LoopBackAuth', '$injector', function(Resource, LoopBackAuth, $injector) {
    var R = Resource(
      urlBase + "/Emails/:id",
      { 'id': '@id' },
      {
      }
    );




    /**
    * @ngdoc property
    * @name lbServices.Email#modelName
    * @propertyOf lbServices.Email
    * @description
    * The name of the model represented by this $resource,
    * i.e. `Email`.
    */
    R.modelName = "Email";


    return R;
  }]);


module
  .factory('LoopBackAuth', function() {
    var props = ['accessTokenId', 'currentUserId', 'rememberMe'];
    var propsPrefix = '$LoopBack$';

    function LoopBackAuth() {
      var self = this;
      props.forEach(function(name) {
        self[name] = load(name);
      });
      this.currentUserData = null;
    }

    LoopBackAuth.prototype.save = function() {
      var self = this;
      var storage = this.rememberMe ? localStorage : sessionStorage;
      props.forEach(function(name) {
        save(storage, name, self[name]);
      });
    };

    LoopBackAuth.prototype.setUser = function(accessTokenId, userId, userData) {
      this.accessTokenId = accessTokenId;
      this.currentUserId = userId;
      this.currentUserData = userData;
    }

    LoopBackAuth.prototype.clearUser = function() {
      this.accessTokenId = null;
      this.currentUserId = null;
      this.currentUserData = null;
    }

    LoopBackAuth.prototype.clearStorage = function() {
      props.forEach(function(name) {
        save(sessionStorage, name, null);
        save(localStorage, name, null);
      });
    };

    return new LoopBackAuth();

    // Note: LocalStorage converts the value to string
    // We are using empty string as a marker for null/undefined values.
    function save(storage, name, value) {
      var key = propsPrefix + name;
      if (value == null) value = '';
      storage[key] = value;
    }

    function load(name) {
      var key = propsPrefix + name;
      return localStorage[key] || sessionStorage[key] || null;
    }
  })
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('LoopBackAuthRequestInterceptor');
  }])
  .factory('LoopBackAuthRequestInterceptor', ['$q', 'LoopBackAuth',
    function($q, LoopBackAuth) {
      return {
        'request': function(config) {

          // filter out external requests
          var host = getHost(config.url);
          if (host && host !== urlBaseHost) {
            return config;
          }

          if (LoopBackAuth.accessTokenId) {
            config.headers[authHeader] = LoopBackAuth.accessTokenId;
          } else if (config.__isGetCurrentUser__) {
            // Return a stub 401 error for User.getCurrent() when
            // there is no user logged in
            var res = {
              body: { error: { status: 401 } },
              status: 401,
              config: config,
              headers: function() { return undefined; }
            };
            return $q.reject(res);
          }
          return config || $q.when(config);
        }
      }
    }])

  /**
   * @ngdoc object
   * @name lbServices.LoopBackResourceProvider
   * @header lbServices.LoopBackResourceProvider
   * @description
   * Use `LoopBackResourceProvider` to change the global configuration
   * settings used by all models. Note that the provider is available
   * to Configuration Blocks only, see
   * {@link https://docs.angularjs.org/guide/module#module-loading-dependencies Module Loading & Dependencies}
   * for more details.
   *
   * ## Example
   *
   * ```js
   * angular.module('app')
   *  .config(function(LoopBackResourceProvider) {
   *     LoopBackResourceProvider.setAuthHeader('X-Access-Token');
   *  });
   * ```
   */
  .provider('LoopBackResource', function LoopBackResourceProvider() {
    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#setAuthHeader
     * @methodOf lbServices.LoopBackResourceProvider
     * @param {string} header The header name to use, e.g. `X-Access-Token`
     * @description
     * Configure the REST transport to use a different header for sending
     * the authentication token. It is sent in the `Authorization` header
     * by default.
     */
    this.setAuthHeader = function(header) {
      authHeader = header;
    };

    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#setUrlBase
     * @methodOf lbServices.LoopBackResourceProvider
     * @param {string} url The URL to use, e.g. `/api` or `//example.com/api`.
     * @description
     * Change the URL of the REST API server. By default, the URL provided
     * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
     */
    this.setUrlBase = function(url) {
      urlBase = url;
      urlBaseHost = getHost(urlBase) || location.host;
    };

    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#getUrlBase
     * @methodOf lbServices.LoopBackResourceProvider
     * @description
     * Get the URL of the REST API server. The URL provided
     * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
     */
    this.getUrlBase = function() {
      return urlBase;
    };

    this.$get = ['$resource', function($resource) {
      return function(url, params, actions) {
        var resource = $resource(url, params, actions);

        // Angular always calls POST on $save()
        // This hack is based on
        // http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/
        resource.prototype.$save = function(success, error) {
          // Fortunately, LoopBack provides a convenient `upsert` method
          // that exactly fits our needs.
          var result = resource.upsert.call(this, {}, this, success, error);
          return result.$promise || result;
        };
        return resource;
      };
    }];
  });

})(window, window.angular);
