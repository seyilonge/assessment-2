// Action type declarations
export const AVAILABLE_ROOMS = 'AVAILABLE_ROOMS';

// Actions
export const availableRooms = ( payload ) => {
    return {
        payload,
        type: AVAILABLE_ROOMS
    };
};
