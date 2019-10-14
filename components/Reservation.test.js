import { expect } from 'chai';
import { mount, noop } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import ReservationComp from './Reservation';
import ReservationDetails from './ReservationDetails';
import { Reservation } from '../data/objects';
import rooms from '../data/rooms.json';

describe( 'Reservation Component', () => {
    let initialState,
        mockStore,
        reservation,
        reservations,
        store,
        wrapper;
    beforeEach( () => {
        mockStore = configureStore();
        reservation = new Reservation().reservationObj;
        reservations = [reservation];
        initialState = {
            reservations,
            rooms,
            submission: { isReservationSubmitted: false }
         };
        store = mockStore( initialState );
        wrapper = mount(
            <Provider store={store}>
                <ReservationComp availableRooms={rooms}
                                dispatch={noop}
                                isReservationSubmitted={false}
                                reservations={reservations}
                />
            </Provider>
        );
        wrapper.update();
    } );

    it( 'Component renders', () => {
        expect( wrapper.find( '.ut-reservation-container' ).every( '.ut-reservation-container' ) ).to.equal( true );
    } );

    it( 'Component renders 4 ReservationDetails components for 4 rooms', () => {
        expect( wrapper.find( ReservationDetails ) ).to.have.lengthOf( 4 );
    } );

} );
