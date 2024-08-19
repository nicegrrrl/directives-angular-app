import { Directive, ElementRef, inject, input } from '@angular/core';

@Directive({
  // selector: 'app-safe-link',
  selector: 'a[appSafeLink]', // apply this directive to any anchor element that has the appSafeLink attribute on it! :D
  // use the attribute selector, so the directive can be added like an attribute onto the element
  // that should be enhanced
  standalone: true,
  // if you were building a Directive for a NgModule-based Angular application, you'd set 'standalone' to false and add
  // the directive to the 'declarations' array of NgModule (like a component)
  host: {
    '(click)': 'onConfirmLeavePage($event)',
  },
  // alternatively, you can aldo use the @HostListener decorator
})
export class SafeLinkDirective {
  // queryParam = input('my-app');
  queryParam = input('my-app', { alias: 'appSafeLink' });
  private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  constructor() {
    console.log('SafeLinkDirective is active!');
  }

  onConfirmLeavePage(event: MouseEvent) {
    const wantsToLeave = window.confirm('Do you want to leave the app?');

    if (wantsToLeave) {
      // const address = (event.target as HTMLAnchorElement).href;
      // (event.target as HTMLAnchorElement).href =
      //   address + '?from=' + this.queryParam();

      const address = this.hostElementRef.nativeElement.href;
      this.hostElementRef.nativeElement.href =
        address + '?from=' + this.queryParam();
      return;
    }

    event?.preventDefault();
  }
}
