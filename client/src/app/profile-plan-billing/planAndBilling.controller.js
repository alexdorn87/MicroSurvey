'strict';
class PlanAndBillingController {
  constructor($log) {
    'ngInject';
    this.$log = $log;
    this.activate();
  }

  activate() {
    this.$log.debug('PlanAndBilling Controller');
  }
}

export default PlanAndBillingController;
