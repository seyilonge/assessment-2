import { SUBMIT_RESERVATION } from './submission.actions';
import { actions } from '../index';
import { Reservation } from '../../../data/objects';

describe( 'Submit Reservation Actions', () => {

    it( 'Submit a reservation', () => {
        const reservation = new Reservation().reservationObj;
        reservation.isSelected = true;
        const payload = [reservation];
        const expectedAction = {
            payload,
            type: SUBMIT_RESERVATION
        };
        expect( actions.submitReservation( payload ) ).toEqual( expectedAction );
    } );
} );
