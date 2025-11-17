import { Component } from '@angular/core';
import { HomeArea } from '../home-area/home-area';  
import { CategoryArea } from '../category-area/category-area';
import { WorksArea } from '../works-area/works-area';
import { ServiceArea } from '../service-area/service-area';
import { BookingModal } from '../booking-modal/booking-modal';
import { ServiceAreaGrid } from '../service-area-grid/service-area-grid';
@Component({
  selector: 'app-home',
  imports: [HomeArea, CategoryArea, WorksArea, ServiceArea, BookingModal, ServiceAreaGrid],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
