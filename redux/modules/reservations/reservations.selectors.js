import { createSelector } from 'reselect';

export const getReservations = state => state.reservations;

export const getReservationCount = createSelector(
    getReservations,
    reservations => reservations.length
);
