export class Reservation {
    constructor() {
        this.reservationObj = {
            adultOccupancyCount: 1,
            childOccupancyCount: 0,
            isSelected: false,
            roomNumber: 1
        };
        return this;
    }
}
