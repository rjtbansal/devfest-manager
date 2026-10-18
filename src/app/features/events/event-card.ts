import { DatePipe } from '@angular/common';
import { Component, computed, input, linkedSignal, output } from '@angular/core';

@Component({
  selector: 'app-event-card',
  imports: [DatePipe],
  template: `
    <div
      class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <!--Add Image -->
       <div class="relative h-48 w-full bg-gray-200">
        <!-- we are using the input() function to get the image URL. You pass the name of your input here image
         and call it like a function since its a signal. You use square brackets to specify the binding for input as in data coming from the parent component -->
    <img [src]="image()"
      class="object-cover w-full h-full max-h-full max-w-full"
      alt="Event thumbnail"
    />
  </div>

      <div class="p-6">
        <div class="flex justify-between items-center mt-4">
          <!-- TODO Mod 1: Add Date using DatePipe -->
          <p class="text-sm text-blue-600 font-semibold mb-2">
          {{ (date() | date: 'mediumDate' ) || 'TBA' }}
          </p>

          <!-- Add daysUntil() using @let -->
           <!-- @let allows you to create a local variable that tracks the state of a signal -->
           @let days = daysUntil();
           <!-- @if allows you to conditionally render a block of code based on the value of a signal -->           
          @if (days != null) {
          <div
            class="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm"
          >
            @if (days > 0) {
              In {{ days }} Days
            } 
            @else if (days < 0) {
              Past Event
            } 
            @else {
              Happening Now
            }
          </div>
        }
      </div>

        <!-- Add Title Input -->
        <h3 class="text-xl font-bold text-gray-800 my-2"> {{ title() }}</h3>

        <div class="flex justify-between items-center mt-4">
          <!-- TODO Mod 1: Add Derived State (Like Button) -->
           <!-- we are calling toggleFavorite on click and updating the isFavorite state
           We are also using the isFavorite() signal to conditionally apply a CSS class to change the color of the button when it is liked. 
           -->
          <button 
          (click)="toggleFavorite()" 
          [class.text-red-500]="isFavorite()"
          class="text-gray-400 hover:text-red-500 transition-colors cursor-pointer">
             {{ isFavorite() ? '❤️' : '🤍' }} Like
          </button>

          <!-- TODO Mod 1: Add Output -->
          <button 
          (click)="removeEvent()"
          class="text-gray-400 text-sm hover:text-gray-600 cursor-pointer">Remove</button>
        </div>

        <div class="mt-4 pt-4 border-t border-gray-100 text-right">
          <a class="text-blue-600 font-medium hover:underline cursor-pointer"> View Details → </a>
        </div>
      </div>
    </div>
  `,
})
export class EventCard {
  // TODO Mod 1: Implement input(), output(), and model()
  // below is newer way to define inputs instead of using @Input() decorator
  title = input.required<string>();
  image = input.required<string>();
  date = input<string>(); // optional

  /** initialLike is an input signal that allows the parent component to set the initial liked state of the event.
   * It is initialized with a default value of false, indicating that the event is not liked by default.
   */
  initialLike = input<boolean>(false);
  /** isFavorite is a derived state that tracks whether the event is liked. 
   * It is initialized with the value of initialLike input and can be updated based on user interaction.
   */
  isFavorite = linkedSignal(() => this.initialLike());

  delete = output();

    // computed allows you to create a derived state that automatically updates when its dependencies change. In this case, we are creating a computed signal that calculates the number of days until the event based on the date input signal.
  daysUntil = computed(() => {
    const eventDate = this.date();
    if(!eventDate) return null;

    const today = new Date();
    const target = new Date(eventDate);

    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
});

toggleFavorite() {
  // This method toggles the isFavorite signal between true and false when the user clicks the like button.
  this.isFavorite.update((val) => !val);
}

removeEvent() {
  this.delete.emit();
}

}
