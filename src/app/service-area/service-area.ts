import { Component } from '@angular/core';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-service-area',
  imports: [],
  templateUrl: './service-area.html',
  styleUrl: './service-area.css',
})
export class ServiceArea {
  constructor(public booking: BookingService) {}

}
