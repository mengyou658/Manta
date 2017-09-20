import * as ACTION_TYPES from '../constants/actions.jsx';
import sounds from '../../libs/sounds';
import uuidv4 from 'uuid/v4';

const UIMiddleware = ({ getState }) => next => action => {
  switch (action.type) {
    // Changing Tabs
    case ACTION_TYPES.UI_TAB_CHANGE: {
      const currentState = getState();
      const currentTab = currentState.UIReducer.activeTab;
      if (action.payload !== currentTab) {
        sounds.play('TAP');
        next(action);
      }
      break;
    }

    // New Notification
    case ACTION_TYPES.UI_NOTIFICATION_NEW: {
      // Play a sound based on notification type
      switch (action.payload.type) {
        case 'success': {
          sounds.play('SUCCESS');
          break;
        }
        case 'warning': {
          sounds.play('WARNING');
          break;
        }
      }
      // Create a new ID for the notification
      next(Object.assign({}, action, {
        payload: Object.assign({}, action.payload, {
          id: uuidv4(),
        })
      }));
      break;
    }

    // Others Actions
    case ACTION_TYPES.FORM_ITEM_ADD: {
      sounds.play('ADD');
      next(action);
      break;
    }

    case ACTION_TYPES.FORM_ITEM_REMOVE: {
      sounds.play('REMOVE');
      next(action);
      break;
    }

    case ACTION_TYPES.FORM_CLEAR: {
      if (!action.payload) {
        sounds.play('RELOAD');
      }
      next(action);
      break;
    }

    // Default
    default: {
      next(action);
      break;
    }
  }
};

export default UIMiddleware;