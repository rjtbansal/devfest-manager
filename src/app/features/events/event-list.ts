import { Component } from '@angular/core';
import { EventCard } from './event-card';

@Component({
  selector: 'app-event-list',
  imports: [EventCard],
  template: `
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">Upcoming Events</h1>
      <!-- TODO Mod 1: Add SearchBar here -->
    </div>

    <!-- TODO Mod 2: Wrap in @if (events.isLoading()) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- TODO Mod 2: Use @for to iterate over resource -->

      <!-- Static Placeholders for initial verify -->
       <!-- from this parent component we are passing image and date value to app-event-card -->
      <app-event-card title = "Angular Keynote" 
      image="/images/angular-keynote.png" 
      date="2024-06-15" />

      <app-event-card title = "Signals Deep Dive" 
      image="/images/signals-deep-dive.png" 
      date="2026-10-20" />
      <!-- <app-event-card /> -->
    </div>
  `,
})
export class EventList {
  // TODO Mod 2: Inject Service and use resource()
}
