import { Component, inject, signal } from '@angular/core';
import { EventCard } from './event-card';
import { SearchBar } from './search-bar';
import { EventsService } from '../../core/events.service';

@Component({
  selector: 'app-event-list',
  imports: [EventCard, SearchBar],
  template: `
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">Upcoming Events</h1>
      <!-- Add SearchBar here -->
      <!-- we are binding to searchQuery signal in this parent component. query exists in SearchBar -->
      <app-search-bar [(query)]="searchQuery" />
      <p class="text-gray-500 mt-2">Searching for: {{ searchQuery() }}</p>
    </div>

    <!-- TODO Mod 2: Wrap in @if (events.isLoading()) -->
    @if (events.error()) {
      <div class="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
        Failed to load events. Is the server running?
      </div>
    }

    @if (events.isLoading()) {
      <div class="text-center py-12 text-gray-500 animate-pulse">Loading events...</div>
    }

    <!-- always need to check if value has been fetched else get errors -->
    @if (events.hasValue()) {
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (event of events.value(); track event.id) {
          <app-event-card
            [title]="event.title"
            [image]="event.image"
            [date]="event.date"
            (delete)="deleteEvent(event.id)"
          />
        } @empty {
          <p class="col-span-3 text-center text-gray-500">
            No events found for "{{ searchQuery() }}".
          </p>
        }
      </div>
    }
  `,
})
export class EventList {
  // TODO Mod 2: Inject Service and use resource()
  readonly eventsService = inject(EventsService);
  // aliasing console this way allows us to use console logs in the template
  // this is also a common practice to make enums and other static values available in the template
  // readonly console = console;
  searchQuery = signal('');

  /** 1. Initialize the Resource. We pass our signal directly to the service.
   * This creates a live connection: searchQuery -> Http Request -> events.value
   */
  events = this.eventsService.getEventsResource(this.searchQuery);

  deleteEvent(id: string) {
    this.eventsService.deleteEvent(id).subscribe({
      next: () => {
        this.events.reload();
      },
      error(err) {
        console.error('Failed to delete event', err);
        alert('Failed to delete event. Please try again later.');
      },
    });
  }
}
