import { Component } from '@angular/core';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-works-area',
  imports: [],
  templateUrl: './works-area.html',
  styleUrl: './works-area.css',
})
export class WorksArea {
  constructor(public booking: BookingService) {}

}
