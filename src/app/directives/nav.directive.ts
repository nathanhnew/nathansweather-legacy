import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})

export class ClickOutsideDirective {
  constructor (private el: ElementRef) {

  }
  @Output()
  public clickOutside = new EventEmitter();

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    if(!(targetElement.classList.contains('dropdown-toggle') || targetElement.classList.contains('navbar-toggler') || targetElement.classList.contains('fa-bars'))) {
      this.clickOutside.emit(null);
    }
  }
}
