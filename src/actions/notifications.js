/* eslint-disable class-methods-use-this */
import levels from '../models/notification-levels';

export default class NotificationsActions {
    /**
   * Show notification.
   * @param {String} title - Notification title.
   * @param {String} message - Notification message.
   * @param {String} level - Notification level.
   */
    notify(title, message, level) {
        return {
            title,
            message,
            level
        };
    }

    info(title, message) {
        return this.notify(title, message, levels.INFO);
    }

    success(title, message) {
        return this.notify(title, message, levels.SUCCESS);
    }

    warning(title, message) {
        return this.notify(title, message, levels.WARNING);
    }

    error(title, message) {
        return this.notify(title, message, levels.ERROR);
    }

    /**
   * Close notification.
   * @param {String} id - Notification id.
   */
    dismiss(id) {
        return id;
    }
}
