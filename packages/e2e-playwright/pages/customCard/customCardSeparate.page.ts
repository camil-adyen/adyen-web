import { Locator, Page } from '@playwright/test';
import { CustomCard } from '../../models/customCard';
// import { CustomCard } from '../../models/customCardSeparate';

class CustomCardPageSeparate {
    readonly page: Page;

    readonly card: CustomCard;
    readonly payButton: Locator;
    readonly payButtonRegular: Locator;

    constructor(page: Page) {
        this.page = page;
        this.card = new CustomCard(page, '.secured-fields-2');
        // this.card = new CustomCard(page);
        this.payButton = page.getByTestId('pay-customCardSeparate');
    }

    async goto(url?: string) {
        await this.page.goto('http://localhost:3024/customcards');
    }

    async pay() {
        await this.payButton.click();
    }
}

export { CustomCardPageSeparate };
