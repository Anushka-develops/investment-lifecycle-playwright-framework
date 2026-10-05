// import {
//   expect,
//   Locator,
//   Page,
// } from '@playwright/test';

// export class LoginPage {
//   readonly page: Page;

//   readonly loginHeading: Locator;
//   readonly usernameInput: Locator;
//   readonly passwordInput: Locator;
//   readonly signInButton: Locator;

//   constructor(page: Page) {
//     this.page = page;

//     this.loginHeading = page.getByText(
//       'Investment Lifecycle',
//       {
//         exact: true,
//       },
//     );

//     this.usernameInput = page.locator(
//       'input[type="text"], input[type="email"]',
//     ).first();

//     this.passwordInput = page.locator(
//       'input[type="password"]',
//     );

//     this.signInButton = page.getByRole(
//       'button',
//       {
//         name: 'Sign In',
//         exact: true,
//       },
//     );
//   }

// async openApplication() {

//     console.log(
//        process.env.APP_URL
//     );

//     await this.page.goto(
//        process.env.APP_URL!
//     );

// }

//   async verifyLoginPageIsDisplayed(): Promise<void> {
//     await expect(
//       this.loginHeading,
//     ).toBeVisible({
//       timeout: 20_000,
//     });

//     await expect(
//       this.usernameInput,
//     ).toBeVisible();

//     await expect(
//       this.passwordInput,
//     ).toBeVisible();

//     await expect(
//       this.signInButton,
//     ).toBeVisible();
//   }

//   async clearLoginFields(): Promise<void> {
//     await this.usernameInput.click();
//     await this.usernameInput.clear();

//     await this.passwordInput.click();
//     await this.passwordInput.clear();
//   }

//   async enterUsername(
//     username: string,
//   ): Promise<void> {
//     await this.usernameInput.fill(username);
//   }

//   async enterPassword(
//     password: string,
//   ): Promise<void> {
//     await this.passwordInput.fill(password);
//   }

//   async clickSignIn(): Promise<void> {
//     await expect(
//       this.signInButton,
//     ).toBeEnabled();

//     await this.signInButton.click();
  
//   }

//   async login(
//     username: string,
//     password: string,
//   ): Promise<void> {
//     await this.verifyLoginPageIsDisplayed();
//     await this.clearLoginFields();
//     await this.enterUsername(username);
//     await this.enterPassword(password);
//     await this.clickSignIn();

//   }
// }






import {
    expect,
    Locator,
    Page,
} from '@playwright/test';
 
export class LoginPage {
 
    readonly page: Page;
    readonly loginHeading: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly signInButton: Locator;
 
    constructor(page: Page) {
 
        this.page = page;
 
        this.loginHeading = page.getByText(
            'Investment Lifecycle',
            { exact: true }
        );
 
        // IMPORTANT:
        // Replace these with your actual APEX item IDs.
        this.usernameInput =
            page.locator('#P9999_USERNAME');
 
        this.passwordInput =
            page.locator('#P9999_PASSWORD');
 
        this.signInButton =
            page.getByRole('button', {
                name: 'Sign In',
                exact: true,
            });
    }
 
    async openApplication() {
 
        await this.page.goto(
            process.env.APP_URL!,
            {
                waitUntil: 'domcontentloaded',
            }
        );
 
      //  await this.verifyLoginPageIsDisplayed();
    }
 
    async verifyLoginPageIsDisplayed() {
 
        await expect(this.loginHeading)
            .toBeVisible({
                timeout: 30_000,
            });
 
        await expect(this.usernameInput)
            .toBeVisible({
                timeout: 30_000,
            });
 
        await expect(this.passwordInput)
            .toBeVisible({
                timeout: 30_000,
            });
 
        await expect(this.signInButton)
            .toBeVisible({
                timeout: 30_000,
            });
    }
 
    async login(
        username: string,
        password: string
    ) {
 
        await this.usernameInput.fill(username);
 
        await this.passwordInput.fill(password);
 
        await expect(this.signInButton)
            .toBeEnabled();

            this.page.on('request', request => {
    if (
        request.method() === 'POST' ||
        request.url().includes('wwv_flow') ||
        request.url().includes('home-page')
    ) {
        console.log(
            '>>> REQUEST',
            request.method(),
            request.url()
        );
    }
});
 
    this.page.on('response', response => {
        if (
            response.url().includes('wwv_flow') ||
            response.url().includes('home-page')
        ) {
            console.log(
                '<<< RESPONSE',
                response.status(),
                response.url()
            );
        }
    });
    
    this.page.on('requestfailed', request => {
        console.log(
            '!!! REQUEST FAILED',
            request.method(),
            request.url(),
            request.failure()?.errorText
        );
    });
 
 
        await this.signInButton.click();

        console.log('URL AFTER LOGIN CLICK:', this.page.url());
        console.log(
            'COOKIES AFTER LOGIN:',
            (await this.page.context().cookies()).map(c => ({
                name: c.name,
                domain: c.domain,
                path: c.path
            }))
        );
 
        // THIS IS THE IMPORTANT PART.
        // Wait for something that proves login succeeded.
        await expect(
            this.page.getByText(
                'Investment Portfolio Dashboard',
                { exact: true }
            )
        ).toBeVisible({
            timeout: 60_000,
        });
    }
}








// import {
//   expect,
//   Locator,
//   Page,
// } from '@playwright/test';

// export class LoginPage {

//   readonly page: Page;

//   readonly loginHeading: Locator;
//   readonly usernameInput: Locator;
//   readonly passwordInput: Locator;
//   readonly signInButton: Locator;

//   constructor(page: Page) {

//     this.page = page;

//     this.loginHeading = page.getByText(
//       'Investment Lifecycle',
//       {
//         exact: true,
//       },
//     );

//     this.usernameInput = page
//       .locator(
//         'input[type="text"], input[type="text"]'
//       )
//       .first();

//     this.passwordInput = page.locator(
//       'input[type="password"]'
//     );

//     this.signInButton = page.getByRole(
//       'button',
//       {
//         name: 'Sign In',
//         exact: true,
//       },
//     );
//   }

//   async openApplication(): Promise<void> {

//     console.log(
//       'Opening URL:',
//       process.env.APP_URL
//     );

//     await this.page.goto(
//       process.env.APP_URL!
//     );

//   }

//   async verifyLoginPageIsDisplayed(): Promise<void> {

//     await expect(
//       this.loginHeading
//     ).toBeVisible({
//       timeout: 20000,
//     });

//     await expect(
//       this.usernameInput
//     ).toBeVisible();

//     await expect(
//       this.passwordInput
//     ).toBeVisible();

//     await expect(
//       this.signInButton
//     ).toBeVisible();
//   }

//   async clearLoginFields(): Promise<void> {

//     await this.usernameInput.click();
//     await this.usernameInput.clear();

//     await this.passwordInput.click();
//     await this.passwordInput.clear();

//   }

//   async enterUsername(
//     username: string
//   ): Promise<void> {

//     await this.usernameInput.fill(
//       username
//     );

//   }

//   async enterPassword(
//     password: string
//   ): Promise<void> {

//     await this.passwordInput.fill(
//       password
//     );

//   }

//   async clickSignIn(): Promise<void> {

//     await expect(
//         this.signInButton
//     ).toBeEnabled();

//      await this.signInButton.click();
    

//     await this.page.waitForTimeout(15000);

//     console.log(
//         'URL after login:',
//         this.page.url()
//     );
//      console.log(
//         "Current URL:",
//         this.page.url()
//     );

//     console.log(
//         "Title:",
//         await this.page.title()
//     );

//     console.log(
//         "Pages:",
//         this.page.context().pages().length
//     );

//     console.log(
//         "Frames:",
//         this.page.frames().length
//     );
// }

//   async login(
//   username: string,
//   password: string
//   ): Promise<void> {

//       console.log("Verify Login Page");

//       await this.verifyLoginPageIsDisplayed();

//       console.log("Clear Fields");

//       await this.clearLoginFields();

//       console.log("Enter Username");

//       await this.enterUsername(username);

//       console.log("Enter Password");

//       await this.enterPassword(password);

//       console.log("Click Sign In");

//       await this.clickSignIn();

//       console.log("Sign In Completed");

//       await this.page.waitForTimeout(30000);

//   }}


// import {
//   expect,
//   Locator,
//   Page,
// } from '@playwright/test';

// export class LoginPage {

//   readonly page: Page;

//   readonly loginHeading: Locator;
//   readonly usernameInput: Locator;
//   readonly passwordInput: Locator;
//   readonly signInButton: Locator;

//   constructor(page: Page) {

//     this.page = page;

//     this.loginHeading = page.getByText(
//       'Investment Lifecycle',
//       {
//         exact: true,
//       },
//     );

//     this.usernameInput = page
//       .locator(
//         'input[type="text"], input[type="email"]'
//       )
//       .first();

//     this.passwordInput = page.locator(
//       'input[type="password"]'
//     );

//     this.signInButton = page.getByRole(
//       'button',
//       {
//         name: 'Sign In',
//         exact: true,
//       },
//     );
//   }

//   async openApplication(): Promise<void> {

//     console.log(
//       'Opening URL:',
//       process.env.APP_URL
//     );

//     await this.page.goto(
//       process.env.APP_URL!,
//       {
//         waitUntil: 'domcontentloaded',
//         timeout: 60000,
//       }
//     );
//   }

//   async verifyLoginPageIsDisplayed(): Promise<void> {

//     await expect(
//       this.loginHeading
//     ).toBeVisible({
//       timeout: 30000,
//     });

//     await expect(
//       this.usernameInput
//     ).toBeVisible();

//     await expect(
//       this.passwordInput
//     ).toBeVisible();

//     await expect(
//       this.signInButton
//     ).toBeVisible();
//   }

//   async clearLoginFields(): Promise<void> {

//     await this.usernameInput.clear();

//     await this.passwordInput.clear();
//   }

//   async enterUsername(
//     username: string
//   ): Promise<void> {

//     await this.usernameInput.fill(
//       username
//     );

//     await expect(
//       this.usernameInput
//     ).toHaveValue(username);
//   }

//   async enterPassword(
//     password: string
//   ): Promise<void> {

//     await this.passwordInput.fill(
//       password
//     );
//   }

//   // async clickSignIn(): Promise<void> {

//   //   await expect(
//   //     this.signInButton
//   //   ).toBeEnabled();

//   //  await this.signInButton.click();

//   //  await this.page.waitForLoadState(
//   //       'networkidle',
//   //       {
//   //           timeout: 60000
//   //       }
//   //   );
//   //   /*
//   //    * Wait until APEX leaves the Login Page.
//   //    */
//   //   await expect
//   //     .poll(
//   //       () => this.page.url(),
//   //       {
//   //         timeout: 60000,
//   //         intervals: [
//   //           500,
//   //           1000,
//   //           2000,
//   //         ],
//   //       }
//   //     )
//   //     .not.toContain('/login');

//   //   console.log(
//   //     'URL after login:',
//   //     this.page.url()
//   //   );

//   //   console.log(
//   //     'Title:',
//   //     await this.page.title()
//   //   );

//   //   console.log(
//   //     'Pages:',
//   //     this.page.context().pages().length
//   //   );

//   //   console.log(
//   //     'Frames:',
//   //     this.page.frames().length
//   //   );
//   // }


//   async clickSignIn(): Promise<void> {

//     await expect(
//         this.signInButton
//     ).toBeVisible();

//     await expect(
//         this.signInButton
//     ).toBeEnabled();

//     // Allow APEX JS to finish binding events
//     await this.page.waitForTimeout(3000);

//     await this.signInButton.click();

//     await this.page.waitForTimeout(5000);

//     console.log(
//         'URL:',
//         this.page.url()
//     );

// }

//   async login(
//     username: string,
//     password: string
//   ): Promise<void> {

//     console.log(
//       'Verify Login Page'
//     );

//     await this.verifyLoginPageIsDisplayed();

//     console.log(
//       'Clear Fields'
//     );

//     await this.clearLoginFields();

//     console.log(
//       'Enter Username'
//     );

//     await this.enterUsername(
//       username
//     );

//     console.log(
//       'Enter Password'
//     );

//     await this.enterPassword(
//       password
//     );

//     console.log(
//       'Click Sign In'
//     );

//     await this.clickSignIn();

//    await expect(
//     this.page.getByText(
//         'Investment Portfolio Dashboard'
//     )
// ).toBeVisible({
//     timeout: 60000
// });
//     console.log(
//       'Sign In Completed'
//     );
//   }
// }