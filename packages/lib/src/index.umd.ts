import { AdyenCheckout } from './AdyenCheckout';
import { NewableComponent } from './core/core.registry';
import * as components from './components';
import * as locales from './language/locales';
import createComponentFromTxVariant from './create-component.umd';

const { Dropin, ...Components } = components;
const Classes: NewableComponent[] = Object.keys(Components).map(key => Components[key]);

// Register all Components
AdyenCheckout.register(...Classes);

const AdyenWeb = {
    AdyenCheckout,
    createComponentFromTxVariant,
    ...components,
    ...locales
};

if (typeof window !== 'undefined') {
    if (!window.AdyenWeb) window.AdyenWeb = {};
    window.AdyenWeb = AdyenWeb;
}
