import { Page, expect } from '@playwright/test';

export class InvestmentGridPage {

    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async searchInvestment(
        initiativeName: string
    ) {

        const searchBox =
            this.page.locator('input').first();

        await searchBox.fill(
            initiativeName
        );

        await searchBox.press('Enter');
    }

    async verifyInvestmentPresent(
        initiativeName: string
    ) {

        await expect(
            this.page.getByText(
                initiativeName
            )
        ).toBeVisible();

    }
}


// import {
//     expect,
//     Page,
//     Locator
// } from '@playwright/test';

// export class InvestmentGridPage {

//     private page: Page;

//     private grid: Locator;

//     private searchBox: Locator;

//     constructor(page: Page) {

//         this.page = page;

//         this.grid =
//             page.locator(
//                 '#investment_requests_grid'
//             );

//         this.searchBox =
//             this.grid.getByRole(
//                 'searchbox',
//                 {
//                     name: /row search/i
//                 }
//             );
//     }

//     async waitForGridReady() {

//         await expect(
//             this.grid
//         ).toBeVisible({
//             timeout: 60000
//         });

//         await expect(
//             this.searchBox
//         ).toBeVisible({
//             timeout: 60000
//         });

//     }

//     async searchInvestment(
//         initiativeName: string
//     ) {

//         await this.waitForGridReady();

//         await this.searchBox.clear();

//         await this.searchBox.fill(
//             initiativeName
//         );

//         await this.searchBox.press(
//             'Enter'
//         );

//         /*
//          * Allow APEX grid refresh.
//          */
//         await this.page.waitForTimeout(
//             2000
//         );

//     }

//     async verifyInvestmentPresent(
//         initiativeName: string
//     ) {

//         await expect(
//             this.grid.getByText(
//                 initiativeName,
//                 {
//                     exact: true
//                 }
//             )
//         ).toBeVisible({
//             timeout: 30000
//         });

//     }

//     async searchAndVerifyInvestment(
//         initiativeName: string
//     ) {

//         await this.searchInvestment(
//             initiativeName
//         );

//         await this.verifyInvestmentPresent(
//             initiativeName
//         );

//     }
// }