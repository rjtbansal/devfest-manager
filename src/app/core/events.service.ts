import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { DevFestEvent } from '../models/event.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private readonly http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/events';

  // 1. Define the Resource Factory
  // We accept a Signal<string> so the resource can react to changes automatically.
  getEventsResource(query: Signal<string>) {
    return httpResource<DevFestEvent[]>(() => {
      const searchQuery = query();
      /**Function returns the url to fetch. Whenever searchQuery changes
       * httpResource will automatically re-fetch the data from the new URL.
       */
      return searchQuery ? `${this.apiUrl}?q=${searchQuery}` : this.apiUrl;
    });
  }

  // 2. Delete an event
  /** We return an Observable for the component to subscribe to */
  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
