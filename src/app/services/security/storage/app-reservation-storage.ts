import { Injectable } from '@angular/core';

import { ApiReservation } from '@models/security';
import { LoggerService } from '@services/utils';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppReservationStorage {
  static RES_KEY = '_reservation';

  seanceChange: Subject<any> = new Subject<any>();

  constructor(private logger: LoggerService) {}

  load(): ApiReservation {
    const value = window.localStorage[AppReservationStorage.RES_KEY];

    if (!value) {
      return {} as ApiReservation;
    }

    try {
      const stored = JSON.parse(value) as ApiReservation;
      const seanceId = stored.seance_id;
      this.seanceChange.next(seanceId ? seanceId : null);
      return stored;
    } catch (e) {
      this.logger.log(e);
    }

    return {} as ApiReservation;
  }

  save(reservation: ApiReservation): void {
    const reservationValue = JSON.stringify(reservation);
    const seanceId = reservation.seance_id;
    this.seanceChange.next(seanceId ? seanceId : null);
    window.localStorage[AppReservationStorage.RES_KEY] = reservationValue;
  }

  clear(): void {
    this.seanceChange.next(null);
    window.localStorage.removeItem(AppReservationStorage.RES_KEY);
  }
}
