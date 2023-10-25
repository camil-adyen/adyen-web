import { test, expect } from '../../../pages/cards/card.fixture';
import { REGULAR_TEST_CARD, TEST_CVC_VALUE, TEST_DATE_VALUE } from '../../utils/constants';

test.describe('Cards (Installments)', () => {
    test('#1 should not add installments property to payload if one-time payment is selected (default selection)', async ({
        cardInstallmentsPage
    }) => {
        const { card, page } = cardInstallmentsPage;

        await card.isComponentVisible();

        await card.typeCardNumber(REGULAR_TEST_CARD);
        await card.typeExpiryDate(TEST_DATE_VALUE);
        await card.typeCvc(TEST_CVC_VALUE);

        // Inspect card.data
        const paymentDataInstallments: any = await page.evaluate('window.card.data.installments');
        await expect(paymentDataInstallments).toBe(undefined);
    });

    test('#2 should not add installments property to payload if 1x installment is selected', async ({ cardInstallmentsPage }) => {
        const { card, page } = cardInstallmentsPage;

        await card.isComponentVisible();

        await card.typeCardNumber(REGULAR_TEST_CARD);
        await card.typeExpiryDate(TEST_DATE_VALUE);
        await card.typeCvc(TEST_CVC_VALUE);

        // Select option
        await card.installmentsPaymentLabel.click();

        // Inspect card.data
        const paymentDataInstallments: any = await page.evaluate('window.card.data.installments');
        await expect(paymentDataInstallments).toBe(undefined);
    });

    test('#3 should add revolving plan to payload if selected', async ({ cardInstallmentsPage }) => {
        const { card, page } = cardInstallmentsPage;

        await card.isComponentVisible();

        await card.typeCardNumber(REGULAR_TEST_CARD);
        await card.typeExpiryDate(TEST_DATE_VALUE);
        await card.typeCvc(TEST_CVC_VALUE);

        // Select option
        await card.revolvingPaymentLabel.click();

        // Inspect card.data
        const paymentDataInstallments: any = await page.evaluate('window.card.data.installments');
        await expect(paymentDataInstallments.value).toEqual(1);
        await expect(paymentDataInstallments.plan).toEqual('revolving');
    });

    test('#4 should add installments value property if regular installment > 1 is selected', async ({ cardInstallmentsPage }) => {
        const { card, page } = cardInstallmentsPage;

        await card.isComponentVisible();

        await card.typeCardNumber(REGULAR_TEST_CARD);
        await card.typeExpiryDate(TEST_DATE_VALUE);
        await card.typeCvc(TEST_CVC_VALUE);

        // Select option
        await card.installmentsPaymentLabel.click();

        await card.installmentsDropdown.click();
        await card.pressKeyboardToNextItem();
        await card.pressKeyboardToNextItem();
        await card.pressKeyboardToSelectItem();
        // await page.waitForTimeout(5000);

        // Inspect card.data
        const paymentDataInstallments: any = await page.evaluate('window.card.data.installments');
        await expect(paymentDataInstallments.value).toEqual(2);
    });
});
