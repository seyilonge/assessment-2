// Action type declarations
export const SUBMIT_RESERVATION = 'SUBMIT_RESERVATION';

// Actions
export const submitReservation = payload => {
    return {
        payload,
        type: SUBMIT_RESERVATION
    }
};

