import Cookies from 'js-cookie';

import { SUBMIT_RESERVATION } from './submission.actions';

// Submission default state
export const submissionDefaultState = {
    isReservationSubmitted: false
};

// Reducers
export default function submission (
    state = submissionDefaultState,
    action
) {
    const { payload, type } = action;
    switch ( type ) {
        case SUBMIT_RESERVATION: {
            Cookies.set( 'reservations', JSON.stringify( payload ) );
            return {
                ...state,
                isReservationSubmitted: true
            };
        }
        default:
            return state;
    }
};
