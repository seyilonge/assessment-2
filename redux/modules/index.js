import * as reservationsActions from './reservations/reservations.actions';
import reservations, { reservationsDefaultState } from './reservations/reservations.reducer';
import * as roomsActions from './rooms/rooms.actions';
import rooms, { roomsDefaultState } from './rooms/rooms.reducer';
import * as submissionActions from './submission/submission.actions';
import submission, { submissionDefaultState } from './submission/submission.reducer';

export default {
    reservations,
    rooms,
    submission
};

export const actions = {
    ...reservationsActions,
    ...roomsActions,
    ...submissionActions
};

export const defaultState = {
    reservations: reservationsDefaultState,
    rooms: roomsDefaultState,
    submission: submissionDefaultState
};
