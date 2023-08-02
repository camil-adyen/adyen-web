import AdyenCheckout from '@adyen/adyen-web';
import '@adyen/adyen-web/dist/es/adyen.css';
import { getPaymentMethods, makePayment, checkBalance, createOrder, cancelOrder, makeDetailsCall } from '../../services';
import { amount, shopperLocale, countryCode, returnUrl } from '../../config/commonConfig';
import { getSearchParameters } from '../../utils';

export async function initManual() {
    const paymentMethodsResponse = await getPaymentMethods({ amount, shopperLocale });
    window.checkout = await AdyenCheckout({
        amount,
        countryCode,
        clientKey: process.env.__CLIENT_KEY__,
        paymentMethodsResponse,
        locale: shopperLocale,
        environment: process.env.__CLIENT_ENV__,
        installmentOptions: {
            mc: {
                values: [1, 2, 3, 4]
            }
        },
        // onSubmit: async (state, component, { resolve, reject }, actions: { handleOrder }) => {
        onSubmit: async (state, component, actions) => {
            //     // PLAN A - return object from submit, making onSubmit async
            //     // PLAN B - onAuthorized, come after onSubmit,
            //     try {
            //         const result = await makePayment(state.data);
            //         const order = await createOrder();
            //
            //
            //
            //         // component.handleApplePayOrder(order);
            //
            //         // actions.resolve({ order });
            //
            // },
            // onAuthorized(resolve, reject, event)
            //     const order = createOrder();
            //     resolve(order);
            // }
            //
            //
            //     } catch () {
            //         actions.reject({
            //             error:
            //         });
            //     },
            //     onAuthorized(resolve, reject, event) => {
            //
            //     },

            const result = await makePayment(state.data);
            const txVariant = state.data.paymentMethod.type;

            // If Refused
            if (result.resultCode === 'Refused') {
                let paymentMethodError = {};
                if (txVariant === 'applepay') {
                    //  ApplePayJS.ApplePayPaymentAuthorizationResult
                    paymentMethodError = {
                        status: 1,
                        errors: [
                            {
                                code: 'billingContactInvalid',
                                contactField: 'postalAddress',
                                message: 'Invalid name'
                            }
                        ]
                    };
                    throw paymentMethodError;
                }

                if (txVariant === 'googlepay') {
                    paymentMethodError = {
                        transactionState: 'ERROR',
                        error: {
                            intent: 'PAYMENT_AUTHORIZATION',
                            message: 'Insufficient funds',
                            reason: 'PAYMENT_DATA_INVALID'
                        }
                    };
                    throw paymentMethodError;
                }
            }

            if (txVariant === 'applepay') {
                const applePayOrder = await createApplePayOrder();

                return {
                    applePay: {
                        orderDetails: applePayOrder
                    }
                };
            }

            if (txVariant === 'googlepay') {
                return {
                    googlePay: {
                        customStuff: {}
                    }
                };
            }

            // handle actions
            if (result.action) {
                // demo only - store paymentData & order
                if (result.action.paymentData) localStorage.setItem('storedPaymentData', result.action.paymentData);
                component.handleAction(result.action);
            } else if (result.order && result.order?.remainingAmount?.value > 0) {
                // handle orders
                const order = {
                    orderData: result.order.orderData,
                    pspReference: result.order.pspReference
                };

                const orderPaymentMethods = await getPaymentMethods({ order, amount, shopperLocale });
                checkout.update({ paymentMethodsResponse: orderPaymentMethods, order, amount: result.order.remainingAmount });
            } else {
                // localStorage.removeItem('storedPaymentData');

                if (result.resultCode === 'Authorised' || result.resultCode === 'Received') {
                    dropin.setStatus('success');
                } else {
                    dropin.setStatus('error');
                }
            }
        },
        onChange: state => {
            console.log('onChange', state);
        },
        onAdditionalDetails: async (state, component) => {
            const result = await makeDetailsCall(state.data);

            if (result.action) {
                component.handleAction(result.action);
            } else {
                handleFinalState(result.resultCode, component);
            }
        },
        onBalanceCheck: async (resolve, reject, data) => {
            resolve(await checkBalance(data));
        },
        onOrderRequest: async (resolve, reject) => {
            resolve(await createOrder({ amount }));
        },
        onOrderCancel: async order => {
            await cancelOrder(order);
            checkout.update({ paymentMethodsResponse: await getPaymentMethods({ amount, shopperLocale }), order: null, amount });
        },
        onError: (error, component) => {
            console.info(error.name, error.message, error.stack, component);
        },
        onActionHandled: rtnObj => {
            console.log('onActionHandled', rtnObj);
        },
        paymentMethodsConfiguration: {
            card: {
                enableStoreDetails: false,
                hasHolderName: true,
                holderNameRequired: true
            },
            googlepay: {
                buttonType: 'plain',
                onAuthorized(data) {
                    console.log(data);
                }
            }
        }
    });

    function handleFinalState(resultCode, dropin) {
        localStorage.removeItem('storedPaymentData');

        if (resultCode === 'Authorised' || resultCode === 'Received') {
            dropin.setStatus('success');
        } else {
            dropin.setStatus('error');
        }
    }

    function handleRedirectResult() {
        const storedPaymentData = localStorage.getItem('storedPaymentData');
        const { amazonCheckoutSessionId, redirectResult, payload } = getSearchParameters(window.location.search);

        if (redirectResult || payload) {
            dropin.setStatus('loading');
            return makeDetailsCall({
                ...(storedPaymentData && { paymentData: storedPaymentData }),
                details: {
                    ...(redirectResult && { redirectResult }),
                    ...(payload && { payload })
                }
            }).then(result => {
                if (result.action) {
                    dropin.handleAction(result.action);
                } else {
                    handleFinalState(result.resultCode, dropin);
                }

                return true;
            });
        }

        // Handle Amazon Pay redirect result
        if (amazonCheckoutSessionId) {
            window.amazonpay = checkout
                .create('amazonpay', {
                    amazonCheckoutSessionId,
                    showOrderButton: false,
                    onSubmit: state => {
                        makePayment(state.data).then(result => {
                            if (result.action) {
                                dropin.handleAction(result.action);
                            } else {
                                handleFinalState(result.resultCode, dropin);
                            }
                        });
                    }
                })
                .mount('body');

            window.amazonpay.submit();
        }

        return Promise.resolve(true);
    }

    const dropin = checkout
        .create('dropin', {
            instantPaymentTypes: ['googlepay']
        })
        .mount('#dropin-container');

    handleRedirectResult();

    return [checkout, dropin];
}
