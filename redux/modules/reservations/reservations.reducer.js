import Cookies from 'js-cookie';

import { UPDATE_RESERVATION } from './reservations.actions';
import { Reservation } from '../../../data/objects';

// Reservations default state
const reservation = new Reservation().reservationObj;
reservation.isSelected = true;
const reservationsFromCache = Cookies.get( 'reservations' )
    ? JSON.parse( Cookies.get( 'reservations' ) )
    : undefined;

export const reservationsDefaultState = reservationsFromCache || [reservation];

// Reducers
export default function reservations (
    state = reservationsDefaultState,
    action
) {
    const { payload, type } = action;
    switch ( type ) {
        case UPDATE_RESERVATION: {
            const roomNumber = payload.roomNumber;
            const isExistingReservation = state.some( reservation => reservation.roomNumber === roomNumber );
            const reservations = isExistingReservation
                ? state.map( reservation => {
                    return reservation.roomNumber === roomNumber ? payload : reservation;
                } )
                : state.concat( payload ).sort( ( a, b ) => a.roomNumber > b.roomNumber ? 1 : -1 );

            return reservations;
        }
        default: {
            return state;
        }
    }
};
