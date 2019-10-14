import { UPDATE_RESERVATION } from './reservations.actions';
import { actions } from '../index';
import { Reservation } from '../../../data/objects';

describe( 'Reservation Actions', () => {

    it( 'Update Reservation', () => {
        const payload = new Reservation().reservationObj;
        const expectedAction = {
            payload,
            type: UPDATE_RESERVATION
        };
        expect( actions.updateReservation( payload ) ).toEqual( expectedAction );
    } );
} );
