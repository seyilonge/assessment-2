// Action type declarations
export const UPDATE_RESERVATION = 'UPDATE_RESERVATION';

// Actions
export const updateReservation = payload => {
    return {
        payload,
        type: UPDATE_RESERVATION
    };
};

