export * from './components';
export * from './AdyenCheckout';

import * as elements from './components';
import { NewableComponent } from './core/core.registry';

export const components: NewableComponent[] = Object.keys(elements).map(key => elements[key]);
