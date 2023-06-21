import { HttpOptions, httpPost } from '../Services/http';
import { AnalyticsObject } from './types';

interface CAActions {
    channel: 'Web';
    events: AnalyticsObject[];
    errors: AnalyticsObject[];
    logs: AnalyticsObject[];
}

export interface EQObject {
    add: (t, a) => void;
    run: (id) => Promise<any>;
    getQueue: () => CAActions;
    _runQueue: (id) => Promise<any>;
}

const CAEventsQueue = ({ analyticsContext, clientKey }) => {
    const caActions: CAActions = {
        channel: 'Web',
        events: [],
        errors: [],
        logs: []
    };

    const eqObject: EQObject = {
        add: (type, actionObj) => {
            caActions[type].push(actionObj);
        },

        run: checkoutAttemptId => {
            const promise = eqObject._runQueue(checkoutAttemptId);

            caActions.events = [];
            caActions.errors = [];
            caActions.logs = [];

            return promise;
        },

        // Expose getter for testing purposes
        getQueue: () => caActions,

        _runQueue: (checkoutAttemptId): Promise<any> => {
            if (!caActions.events.length && !caActions.logs.length && !caActions.errors.length) {
                return Promise.resolve(null);
            }

            const options: HttpOptions = {
                errorLevel: 'silent' as const,
                loadingContext: analyticsContext,
                path: `v2/analytics/${checkoutAttemptId}?clientKey=${clientKey}`
            };

            const promise = httpPost(options, caActions)
                .then(() => {
                    console.log('### CAEventsQueue::send:: success');
                    return undefined;
                })
                .catch(() => {});

            return promise;
        }
    };

    return eqObject;
};

export default CAEventsQueue;
