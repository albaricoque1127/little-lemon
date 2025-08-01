export const notificationOptions = [
  { id: 'orderStatuses', label: 'Order statuses' },
  { id: 'specialOffers',    label: 'Special offers'    },
  { id: 'newsletter',   label: 'Newsletter'    },
];

// reducer to toggle or set all at once
export function notificationsReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE':
      return { 
        ...state, 
        [action.id]: !state[action.id] 
      };
    case 'SET_ALL':
      return { ...action.payload };
    default:
      return state;
  }
}

// helper to shape defaults from options array
export function makeDefaultPrefs() {
  return notificationOptions.reduce(
    (acc, { id }) => ({ ...acc, [id]: false }),
    {}
  );
}