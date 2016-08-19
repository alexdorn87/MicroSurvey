'strict';
class SurveyService {
    constructor($q, $log, LoopBackAuth, DomainService, TeamService, Survey, Domain, AuthUser, $state) {
        'ngInject';
        this.$state = $state;
        this.$log = $log;
        this.Domain = Domain;
        this.Survey = Survey;
        this.AuthUser = AuthUser;
        this.LoopBackAuth = LoopBackAuth;
        this.TeamService = TeamService;
        this.DomainService = DomainService;
        this.$q = $q;
    }

    getSurvey(id) {
        //this.AuthUser.teams({id: this.AuthUser.getCurrentId()})
        //    .$promise.then((teams) => {
        //    let currentTeam = teams.filter((t) => { this.TeamService.selected.id == t.id })
        //    console.log(currentTeam);
        //    currentTeam[0].prototype_$findById_domains({
        //      id: this.DomainService.selected.id
        //    })
        //    .then((d) => {
        //      console.log(d);
        //    })
        //});
      console.log(this.Survey);
      return this.Survey.findById({id}).$promise;
        //return this.Domain.prototype$__findById__surveys(params, extras).$promise;
    }

    getSurveys({domainId}) {
        return this.Survey.find({where: domainId}).$promise;
    }

    deleteSurvey(params) {
        return this.Domain.prototype$__destroyById__surveys(params).$promise;
    }

    copySurvey(survey) {
        return this.getSurvey({
            id: survey.domainId,
            fk: survey.id
          })

      .then((survey) => {
        return this.getSurveys({
          id: survey.domainId,
          filter: {
            where: {
              duplicateFromId: survey.id
            }
          }
        })
        .then((duplicatedSurveys)=> {
          survey.name = survey.name + " (" + (duplicatedSurveys.length + 1) + ")";
          survey.duplicateFromId = survey.id;
          survey.id = null;
          survey.created = new Date();
          return this.createSurvey({id: survey.domainId}, survey);
        });
      });
    }

    /**
     * Creates a survey child of parent Domain with id passed as 1st param as {id: id}
     * @param id DomainId
     * @param params
     * @returns {*|Function}
     */
    createSurvey(id, params) {
      console.log(id, params);
      params.domainId = id;
      return this.Survey.create(id,params)
        .$promise;
      //return this.AuthUser.teams({id: this.LoopBackAuth.currentUserId})
      //  .$promise.then((teams) => {
      //  let currentTeam = teams.filter((t) => { return this.TeamService.teams.selected.id == t.id });
      //  console.log(this.DomainService.domains.selected.id, currentTeam[0]);
      //    console.log(this.Survey);
      //  currentTeam[0].$prototype$__findById__domains({
      //      id: currentTeam[0].id,
      //      fk: this.DomainService.domains.selected.id
      //    })
      //    .then((d) => {
      //      console.log(d);
      //    })
      //});
        //return this.Domain.prototype$__create__surveys(id, params).$promise;
    }

    updateSurvey(id, params) {
        return this.Domain.prototype$__updateById__surveys(id, params).$promise;
    }

    getMiniGraphData(params) {
      return this.Domain.miniGraphData(params).$promise;
    }

    getSummaryData(params) {
      this.$log.debug(params);
      return this.Survey.getSummaryData(params).$promise;
    }
}

export default SurveyService;
