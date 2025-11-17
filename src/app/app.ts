import { Component, signal, OnDestroy } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Footer } from './footer/footer';
import { Header } from './header/header';
import { Subscription } from 'rxjs';

declare const AOS: any;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
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

    // Initialize theme's legacy scripts (sliders, menus, etc.) after Angular renders
    setTimeout(() => {
      try {
        // Ensure pignose calendar CSS is present (added at runtime to avoid build-time font resolution issues)
        try {
          if (!document.querySelector('link[data-vendor="pignose"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = '/assets/css/vendors/pignose.calendar.min.css';
            link.setAttribute('data-vendor', 'pignose');
            document.head.appendChild(link);
          }
        } catch (err) {
          // ignore runtime CSS injection errors
        }

        (window as any).initTheme?.();
        try { AOS.refresh(); } catch (e) {}
      } catch (e) {
        // ignore
      }
    }, 150);

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

// Ensure TypeScript knows about global Swiper when used by the legacy scripts
declare global {
  interface Window {
    Swiper?: any;
    initTheme?: () => void;
  }
}
