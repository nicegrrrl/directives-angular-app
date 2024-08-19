import {
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

import { Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true,
})
export class AuthDirective {
  userType = input.required<Permission>({ alias: 'appAuth' });
  private authService = inject(AuthService);
  private templateRef = inject(TemplateRef); // super important step when building a structural directive
  private viewContainerRef = inject(ViewContainerRef); // is a reference to the place in the dom where this templateRef is being used

  constructor() {
    effect(() => {
      if (this.authService.activePermission() === this.userType()) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
        // a method provided by angular that will render some new content into a certain place in the dom
      } else {
        this.viewContainerRef.clear();
      }
    });
  }
}
