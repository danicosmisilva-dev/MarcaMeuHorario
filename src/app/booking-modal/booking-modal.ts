import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-booking-modal',
  imports: [],
  templateUrl: './booking-modal.html',
  styleUrl: './booking-modal.css',
})
export class BookingModal implements AfterViewInit {
  ngAfterViewInit(): void {
    try {
      const modalEl = document.getElementById('makeBooking');
      const bs = (window as any).bootstrap;
      if (modalEl && bs && typeof bs.Modal === 'function') {
        // Ensure a Modal instance exists and has a proper config
        const inst = bs.Modal.getInstance(modalEl);
        if (!inst) {
          // create with default config
          new bs.Modal(modalEl, { backdrop: true, keyboard: true });
        }
      }
    } catch (e) {
      // ignore initialization errors
      console.warn('Booking modal bootstrap init failed', e);
    }

    // Initialize pignose-calendar when view is ready. This uses global jQuery if available
    try {
      const $ = (window as any).$ || (window as any).jQuery;
      if ($ && typeof $.fn !== 'undefined' && typeof $.fn.pignoseCalendar === 'function') {
        // provide a minimal init callback that wires booking time clicks to stepper
        $('.booking-calendar').pignoseCalendar({
          init: function () {
            $('.booking-time .item').off('click.pignoseInit').on('click.pignoseInit', function () {
              try {
                (window as any).bookingStepper?.next();
              } catch (err) {
                // noop
              }
            });
          }
        });
      } else {
        console.warn('pignose-calendar or jQuery not available at BookingModal init');
      }
    } catch (err) {
      console.warn('Failed to initialize pignose-calendar in BookingModal', err);
    }
  }

}
