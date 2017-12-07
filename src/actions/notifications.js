import composeClass from 'compose-class';
import levels from '../models/notification-levels';

/**
 * Represents a notifications actions.
 * @class NotificationsActions
 */
export default composeClass({
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
    },

    info(title, message) {
        return this.notify(title, message, levels.INFO);
    },

    success(title, message) {
        return this.notify(title, message, levels.SUCCESS);
    },

    warning(title, message) {
        return this.notify(title, message, levels.WARNING);
    },

    error(title, message) {
        return this.notify(title, message, levels.ERROR);
    },

    /**
     * Close notification.
     * @param {String} id - Notification id.
     */
    dismiss(id) {
        return id;
    }
});
