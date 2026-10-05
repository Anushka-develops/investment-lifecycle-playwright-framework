// import { expect, Page } from '@playwright/test';

// export class DashboardPage {

//     private page: Page;

//     constructor(page: Page) {
//         this.page = page;
//     }

//     private navButton() {
//         return this.page.locator(
//             '#t_Button_navControl'
//         );
//     }

//     async navigateToPage(
//         pageName: string
//     ) {

//         await expect(
//         this.page.getByText(
//             'Investment Portfolio Dashboard'
//         )
//         ).toBeVisible({
//                 timeout: 60000
//         });
//         await this.navButton().click();
//         await this.page
//     .getByRole('treeitem', {
//         name: pageName,
//         exact: true
//     })
//     .click({
//         noWaitAfter: true
//     });

//     await this.page.waitForLoadState('domcontentloaded');
//     await this.page.waitForTimeout(60000);
//     await this.navButton().click();

//     }

//     async clickNewInvestment() {

//         await expect(
//             this.page.getByRole(
//                 'heading',
//                 {
//                     name: 'Investment Requests'
//                 }
//             )
//         ).toBeVisible({
//             timeout: 60000
//         });

//         await this.page
//             .getByRole('button', {
//                 name: /new investment/i
//             })
//             .click();

//     }
// }






import {
    expect,
    Page,
} from '@playwright/test';
 
export class DashboardPage {
 
    constructor(
        private page: Page
    ) {}
 
    private navButton() {
        return this.page.locator(
            '#t_Button_navControl'
        );
    }
 
    async navigateToPage(
        pageName: string
    ) {
 
        // Confirm dashboard is actually ready
        await expect(
            this.page.getByText(
                'Investment Portfolio Dashboard',
                { exact: true }
            )
        ).toBeVisible({
            timeout: 60_000,
        });
 
        // Open navigation
        await expect(
            this.navButton()
        ).toBeVisible();
 
        await this.navButton().click();
 
        // Wait for target menu item
        const targetPage =
            this.page.getByRole(
                'treeitem',
                {
                    name: pageName,
                    exact: true,
                }
            );
 
        await expect(targetPage)
            .toBeVisible({
                timeout: 30_000,
            });
 
        await targetPage.click();
 
        // IMPORTANT:
        // Wait for the actual destination page,
        // NOT domcontentloaded/networkidle.
        await expect(
            this.page.getByRole(
                'heading',
                {
                    name: 'Investment Requests',
                    exact: true,
                }
            )
        ).toBeVisible({
            timeout: 60_000,
        });
    }
 
    async clickNewInvestment() {
 
        await expect(
            this.page.getByRole(
                'heading',
                {
                    name: 'Investment Requests',
                }
            )
        ).toBeVisible({
            timeout: 60_000,
        });
 
        await this.page.getByRole(
            'button',
            {
                name: /new investment/i,
            }
        ).click();
    }
}







// import {
//     expect,
//     Page
// } from '@playwright/test';

// export class DashboardPage {

//     private page: Page;

//     constructor(page: Page) {
//         this.page = page;
//     }

//     private navButton() {
//         return this.page.locator(
//             '#t_Button_navControl'
//         );
//     }

//     async navigateToPage(
//         pageName: string
//     ) {

//         await expect(
//             this.page.getByText(
//                 'Welcome to Investment Lifecycle'
//             )
//         ).toBeVisible({
//             timeout: 30000
//         });

//         await this.navButton().click();

//         const menuItem =
//             this.page.getByRole(
//                 'treeitem',
//                 {
//                     name: pageName,
//                     exact: true
//                 }
//             );

//         await expect(
//             menuItem
//         ).toBeVisible({
//             timeout: 30000
//         });

//         const href =
//             await menuItem.getAttribute(
//                 'href'
//             );

//         if (!href) {
//             throw new Error(
//                 `${pageName} menu does not contain href`
//             );
//         }

//         // APEX-friendly navigation
//         await this.page.goto(
//             href,
//             {
//                 waitUntil: 'domcontentloaded'
//             }
//         );

//     }

//     async clickNewInvestment() {

//         await expect(
//             this.page.getByRole(
//                 'button',
//                 {
//                     name: /new investment/i
//                 }
//             )
//         ).toBeVisible({
//             timeout: 60000
//         });

//         await this.page
//             .getByRole(
//                 'button',
//                 {
//                     name: /new investment/i
//                 }
//             )
//             .click();
//     }
// }