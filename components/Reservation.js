import React from 'react';
import styled from 'styled-components';

import ReservationDetails from './ReservationDetails';
import { Reservation } from '../data/objects';
import { actions } from '../redux/modules';

const ReservationContainer = styled.section`
    display: flex;
    padding: 1.5em;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-between;
    font-family: sans-serif;
    width: 80%;
`
const ReservationBox = styled.div`
    flex: 1;
    margin-top: 10px;
    margin-right: 10px;
    border: 2px solid #cdd0df;
    border-radius: 4px;
`

const ReservationBoxTitle = styled.h4`
    margin: 0;
    padding: 12px;
    font-size: 0.85em;
    background-color: #e7e7e7;

    &.default {
        padding-top: 15px;
        padding-bottom: 15px;
        font-weight: 600;
    }

    input.hide {
        display: none;
    }
`

const Button = styled.button`
    margin: 1.5em;
`

const StatusMessage = styled.div`
    padding: 1.25em;

`

const setReservationStatus = (
    checked,
    dispatch,
    roomNumber
) => {
    const { updateReservation } = actions;
    const reservation = new Reservation().reservationObj;
    reservation.adultOccupancyCount = 1;
    reservation.isSelected = checked;
    reservation.roomNumber = roomNumber;

    dispatch( updateReservation( reservation ) );
};

const checkboxClickHandler = (
    roomNumber,
    index,
    availableRooms,
    event,
    dispatch
) => {
    const { checked } = event.target;

    // For the weird edge case should default room 1 checkbox be visible
    // and user checks and unchecks, early exit so no store action is tied to this.
    if ( index === 0 ) {
        return;
    }

    let loopCount = index;
    const selectableRoomCount = availableRooms.length - 1;

    if ( checked ) {
        for ( let step = 1; step < loopCount + 1; step++ ) {
            const currentRoomNumber = roomNumber - ( step - 1 );
            setReservationStatus( checked, dispatch, currentRoomNumber );
        }
    } else {
        // Determine the number of times to loop and set 'isSelected' property to false to uncheck
        loopCount = index === selectableRoomCount // if selected index is last room on room scale
            ? 1 // loop once to uncheck only selected index
            : index === 1 // if selected index is the first selecteable on room scale
                ? selectableRoomCount // loop x times which equals amount of selectable rooms
                : index; // loop x times which equals index number (this occurs for rooms in middle of scale)

        for ( let step = 1; step < loopCount + 1; step++ ) {
            const currentRoomNumber = roomNumber + ( step - 1 );
            setReservationStatus( checked, dispatch, currentRoomNumber );
        }
    }
};


const submitHandler = ( reservations, dispatch ) => {
    const { submitReservation } = actions;
    dispatch( submitReservation( reservations ) );
};

const ReservationPage = ( {
    availableRooms,
    dispatch,
    isReservationSubmitted,
    reservations
} ) => {

    return (
        <>
            <ReservationContainer className="ut-reservation-container">
                {availableRooms.map( ( room, index ) => {
                    const {
                        adultOccupancy,
                        childOccupancy,
                        isDefaultSelection,
                        roomNumber
                    } = room;
                    const reservation = reservations.filter( room => room.roomNumber == roomNumber )[0] || {};
                    const { isSelected } = reservation;
                    return (
                        <ReservationBox key={roomNumber}>
                            <ReservationBoxTitle className={ isDefaultSelection ? 'default' : '' }>
                                <label htmlFor={`room-selection-${roomNumber}`}
                                        className="">
                                    <input id={`room-selection-${roomNumber}`}
                                        className={isDefaultSelection ? 'hide' : ''}
                                        checked={isSelected}
                                        name={`room-selection-${roomNumber}`}
                                        onChange={(event) => checkboxClickHandler(roomNumber, index, availableRooms, event, dispatch)}
                                        type="checkbox"
                                    />
                                    <span className="checkbox-label">Room {roomNumber}</span>
                                </label>
                            </ReservationBoxTitle>
                            <ReservationDetails adultOccupancy={adultOccupancy}
                                                childOccupancy={childOccupancy}
                                                dispatch={dispatch}
                                                reservation={reservation}
                                                roomNumber={roomNumber}
                            />
                        </ReservationBox>
                    );

                } )}
            </ReservationContainer>
            <Button className="ut-submit-button"
                    name="submit"
                    onClick={() => { submitHandler( reservations, dispatch ) }}>
                Submit
            </Button>
            { isReservationSubmitted &&
                <StatusMessage className="ut-status-message">Your reservation has been saved!</StatusMessage>
            }
        </>
    )
};

export default ReservationPage;
