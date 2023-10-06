import { Component, Fragment, h } from 'preact';
import getProp from '../../../../utils/getProp';
import UIElement from '../../../UIElement';
import { Order, OrderStatus } from '../../../../types';
import OrderPaymentMethods from './OrderPaymentMethods';
import InstantPaymentMethods from './InstantPaymentMethods';
import useCoreContext from '../../../../core/Context/useCoreContext';
import { useBrandLogoConfiguration } from './useBrandLogoConfiguration';
import PaymentMethodsContainer, { PaymentMethodsContainerProps } from './PaymentMethodsContainer';

interface PaymentMethodListProps extends Omit<PaymentMethodsContainerProps, 'label' | 'classNameModifiers'> {
    instantPaymentMethods?: UIElement[];
    storedPaymentMethods?: UIElement[];
    openFirstStoredPaymentMethod?: boolean;
    openFirstPaymentMethod?: boolean;
    order?: Order;
    orderStatus?: OrderStatus;
    onOrderCancel?: (order) => void;
}

class PaymentMethodList extends Component<PaymentMethodListProps> {
    public static defaultProps: PaymentMethodListProps = {
        instantPaymentMethods: [],
        storedPaymentMethods: [],
        paymentMethods: [], // Payment methods exclude stored payments
        activePaymentMethod: null,
        cachedPaymentMethods: {},
        orderStatus: null,
        onSelect: () => {},
        onDisableStoredPaymentMethod: () => {},
        isDisablingPaymentMethod: false,
        isLoading: false
    };

    componentDidMount() {
        // Open first PaymentMethodItem
        const firstStoredPayment = this.props.storedPaymentMethods[0];
        const firstNonStoredPayment = this.props.paymentMethods[0];

        if (firstStoredPayment || firstNonStoredPayment) {
            const shouldOpenFirstStored = this.props.openFirstStoredPaymentMethod && getProp(firstStoredPayment, 'props.oneClick') === true;
            if (shouldOpenFirstStored) {
                this.props.onSelect(firstStoredPayment);
                return;
            }

            if (this.props.openFirstPaymentMethod) {
                this.props.onSelect(firstNonStoredPayment);
            }
        }
    }

    // @ts-ignore ignore
    render({ paymentMethods, instantPaymentMethods, storedPaymentMethods }) {
        const { i18n } = useCoreContext();
        const brandLogoConfiguration = useBrandLogoConfiguration(paymentMethods);

        return (
            <Fragment>
                {this.props.orderStatus && (
                    <OrderPaymentMethods
                        order={this.props.order}
                        orderStatus={this.props.orderStatus}
                        onOrderCancel={this.props.onOrderCancel}
                        brandLogoConfiguration={brandLogoConfiguration}
                    />
                )}

                {!!instantPaymentMethods.length && <InstantPaymentMethods paymentMethods={instantPaymentMethods} />}

                {!!storedPaymentMethods.length && (
                    <PaymentMethodsContainer
                        {...this.props}
                        label={i18n.get('paymentMethodsList.storedPayments.label')}
                        classNameModifiers={['storedPayments']}
                        paymentMethods={storedPaymentMethods}
                    ></PaymentMethodsContainer>
                )}

                {!!paymentMethods.length && (
                    <PaymentMethodsContainer
                        {...this.props}
                        label={i18n.get('paymentMethodsList.otherPayments.label')}
                        classNameModifiers={['otherPayments']}
                        paymentMethods={paymentMethods}
                    ></PaymentMethodsContainer>
                )}
            </Fragment>
        );
    }
}

export default PaymentMethodList;
