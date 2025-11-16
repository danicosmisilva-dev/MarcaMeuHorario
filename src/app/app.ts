import { Component, signal, OnDestroy } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Home } from './home/home';
import { Footer } from './footer/footer';
import { Header } from './header/header';
import { Subscription } from 'rxjs';

declare const AOS: any;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('marca-meu-horario');
  private routerSub?: Subscription;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    AOS.init({ once: true }); // initialize AOS
    // ensure AOS scans DOM after Angular has rendered
    setTimeout(() => AOS.refresh(), 50);

    // refresh AOS after each navigation so newly inserted elements animate
    this.routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        AOS.refresh();
      }
    });
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }
}
