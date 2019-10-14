import { AVAILABLE_ROOMS } from './rooms.actions';
import availableRooms from '../../../data/rooms.json';

export const roomsDefaultState = availableRooms;

// Reducers
export default function rooms (
    state = roomsDefaultState,
    action
) {
    const { payload, type } = action;
    switch ( type ) {
        case AVAILABLE_ROOMS: {
            return payload;
        }
        default:
            return state;
    }
};
