import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Reservation from '../components/Reservation';
import { withRedux } from '../lib/redux';
import { getReservations } from '../redux/modules/reservations/reservations.selectors';
import { getRooms } from '../redux/modules/rooms/rooms.selectors';
import { getIsReservationSubmitted } from '../redux/modules/submission/submission.selectors';

const IndexPage = () => {
    const availableRooms = useSelector( getRooms );
    const dispatch = useDispatch();
    const isReservationSubmitted = useSelector( getIsReservationSubmitted );
    const reservations = useSelector( getReservations );

    return (
        <>
            <Reservation availableRooms={availableRooms}
                         dispatch={dispatch}
                         isReservationSubmitted={isReservationSubmitted}
                         reservations={reservations}
            />
        </>
    );
};

IndexPage.getInitialProps = ( { reduxStore } ) => {
    return {};
};

export default withRedux( IndexPage );
