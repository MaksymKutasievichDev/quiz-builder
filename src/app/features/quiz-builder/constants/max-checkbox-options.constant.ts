import { InjectionToken } from '@angular/core';

const defaultRestriction = 5;

export const MAX_CHECKBOX_OPTIONS = new InjectionToken<number>('MAX_CHECKBOX_OPTIONS', {
  providedIn: 'root',
  factory: () => defaultRestriction
});
