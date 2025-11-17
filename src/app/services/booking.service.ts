import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BookingService {
  open(): void {
    try {
      const modalEl = document.getElementById('makeBooking');
      const bs = (window as any).bootstrap;
      if (!modalEl) return;
      if (bs && typeof bs.Modal === 'function') {
        let inst = bs.Modal.getInstance(modalEl);
        if (!inst) inst = new bs.Modal(modalEl, { backdrop: true, keyboard: true });
        inst.show();
      } else {
        // fallback: toggle class (for non-bootstrap environments)
        modalEl.classList.add('show');
        modalEl.style.display = 'block';
        modalEl.setAttribute('aria-modal', 'true');
      }
    } catch (e) {
      console.warn('BookingService.open failed', e);
    }
  }

  close(): void {
    try {
      const modalEl = document.getElementById('makeBooking');
      const bs = (window as any).bootstrap;
      if (!modalEl) return;
      if (bs && typeof bs.Modal === 'function') {
        const inst = bs.Modal.getInstance(modalEl);
        if (inst) inst.hide();
      } else {
        modalEl.classList.remove('show');
        modalEl.style.display = 'none';
        modalEl.removeAttribute('aria-modal');
      }
    } catch (e) {
      console.warn('BookingService.close failed', e);
    }
  }
}
