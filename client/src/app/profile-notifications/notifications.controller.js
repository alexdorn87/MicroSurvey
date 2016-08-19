'strict';
class NotificationsController {
  constructor($log, Notifications, UserService) {
    'ngInject';
    this.$log = $log;
    this.Notifications = Notifications;
    this.UserService = UserService;
    this.user = UserService.currentUser;
    this.activate();
  }

  activate() {
    this.$log.debug('Notifications Controller');
    this.Notifications.find({filter:{where:{type: 'general'}}}).$promise.then((generalNotifications) => {
      this.$log.debug(generalNotifications);
      this.generalNotifications = generalNotifications;
    })
  }

  updateNotification(notification) {
    this.UserService.updateUser({id:this.user.id}, {notifications: notification})
      .then((res)=> {
        this.$log.debug(res);
      })
  }
}

export default NotificationsController;
