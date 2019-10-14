import React from 'react';
import styled from 'styled-components';

import { Reservation } from '../data/objects';
import { actions } from '../redux/modules';

const DetailsContainer = styled.div`
    padding: 12px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    background-color: #e7e7e7;

    &.active {
        background-color: #fff;
    }

    .reservations-container {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        justify-content: space-between;

        .reservations {
            flex: 1
            padding: 5px;
        }
    }

    .adult-selection,
    .child-selection {
        margin-top: 5px;
    }
`
const changeHandler = ( roomNumber, type, count, event, dispatch ) => {
    const { value } = event.target;
    const { updateReservation } = actions;
    const reservation = new Reservation().reservationObj;

    if ( type === 'adult' ) {
        reservation.adultOccupancyCount = Number( value );
        reservation.childOccupancyCount = count;
    } else {
        reservation.adultOccupancyCount = count
        reservation.childOccupancyCount = Number( value );
    }

    reservation.isSelected = true;
    reservation.roomNumber = roomNumber;
    dispatch( updateReservation( reservation ) );
};

const ReservationDetails = ( {
    adultOccupancy,
    childOccupancy,
    dispatch,
    reservation,
    roomNumber
} ) => {
    const { adultOccupancyCount, childOccupancyCount, isSelected } = reservation;
    return (
        <DetailsContainer className={ isSelected ? 'active' : '' }>
            <div className="reservations-container">
                <div className="reservations">
                    <div>Adults</div>
                    <div>(18+)</div>
                    <select id={`adult-selection${roomNumber}`}
                            className="adult-selection"
                            value={adultOccupancyCount || 1}
                            disabled={!isSelected}
                            name="adults"
                            onChange={ (event) => changeHandler(roomNumber, 'adult', childOccupancyCount, event, dispatch) }>
                        {adultOccupancy.map( ( numberOfAdults, index ) => {
                            const adults = adultOccupancyCount || numberOfAdults;
                            return (
                                <option key={index} value={numberOfAdults}>{numberOfAdults}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="reservations">
                    <div>Children</div>
                    <div>(0-17)</div>
                    <select id={`child-selection${roomNumber}`}
                            className="child-selection"
                            value={childOccupancyCount}
                            disabled={!isSelected}
                            name="children"
                            onChange={ (event) => changeHandler(roomNumber, 'child', adultOccupancyCount, event, dispatch) }>
                        {childOccupancy.map( ( numberOfChildren, index ) => {
                            const children = childOccupancyCount || numberOfChildren;
                            return (
                                <option key={index} value={numberOfChildren}>{numberOfChildren}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
        </DetailsContainer>
    )
};

export default ReservationDetails;
