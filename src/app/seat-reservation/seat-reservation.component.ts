import { Component } from '@angular/core';
interface Seat {
  number: number;
  booked: boolean;
  selected: boolean;
}
@Component({
  selector: 'app-seat-reservation',
  templateUrl: './seat-reservation.component.html',
  styleUrls: ['./seat-reservation.component.css'],
})
export class SeatReservationComponent {
  coach: Seat[][] = [];
  // Array to store the seat status (0 = available, 1 = booked)

  userSeats: number[] = [];
  // Array to store the user's selected seats

  numSeats: number = 0;

  constructor() {
    this.seatIntialize();
  }

  seatIntialize() {
    const totalSeats = 80;
    const seatsInRow = 7;
    const lastRowSeats = 3;

    //handling all seats in row

    let seatNumber = 1;
    const totalRows = Math.ceil(totalSeats / seatsInRow);
    for (let i = 0; i < totalRows; i++) {
      const row: Seat[] = [];
      const seatsInCurrentRow =
        i === Math.floor(totalRows) - 1 ? lastRowSeats : seatsInRow;

      for (let j = 0; j < seatsInCurrentRow; j++) {
        const seat: Seat = {
          number: seatNumber,
          booked: false,
          selected: false,
        };
        row.push(seat);
        seatNumber++;
      }

      this.coach.push(row);
    }
  }

  toggleSeatSelection(rowIndex: number, seatIndex: number) {
    const seat = this.coach[rowIndex][seatIndex];
    seat.selected = !seat.selected;

    if (seat.selected) {
      this.userSeats.push(seat.number);
    } else {
      const index = this.userSeats.indexOf(seat.number);
      if (index !== -1) {
        this.userSeats.splice(index, 1);
      }
    }
  }
  reserveSeats(numSeats: number) {
    if (numSeats <= 0 || numSeats > 7) {
      return;
    }
    // Find available seats
    const availableSeats: Seat[] = [];
    console.log(availableSeats);
    for (const row of this.coach) {
      for (const seat of row) {
        if (!seat.booked) {
          availableSeats.push(seat);
        }
      }
    }

    if (numSeats > availableSeats.length) {
      // case where requested number of seats exceeds the available seats
      alert('Not enough seats available.');
      return;
    }
    // Reserve seats
    const selectedSeats = availableSeats.slice(0, numSeats);
    for (const seat of selectedSeats) {
      seat.booked = true;
      seat.selected = false;
      this.userSeats.push(seat.number);
    }
  }
}
