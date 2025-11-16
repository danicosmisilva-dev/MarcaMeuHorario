import { Component } from '@angular/core';
import { HomeArea } from '../home-area/home-area';  
import { CategoryArea } from '../category-area/category-area';
import { WorksArea } from '../works-area/works-area';
import { ServiceArea } from '../service-area/service-area';

@Component({
  selector: 'app-home',
  imports: [HomeArea, CategoryArea, WorksArea, ServiceArea],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
