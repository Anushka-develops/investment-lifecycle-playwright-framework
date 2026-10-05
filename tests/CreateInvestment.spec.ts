import { test } from '@playwright/test';

import { LoginPage }
from '../pages/LoginPage';

import { DashboardPage }
from '../pages/DashboardPage';

import { InvestmentRequestPage }
from '../pages/InvestmentRequestPage';

import { InvestmentGridPage }
from '../pages/InvestmentGridPage';

import { createInvestmentData }
from '../testdata/InvestmentData';

test(
'Create Investment',
async ({ page }) => {

    const loginPage =
        new LoginPage(page);

    const dashboardPage =
        new DashboardPage(page);

    const investmentPage =
        new InvestmentRequestPage(page);

    const gridPage =
        new InvestmentGridPage(page);

    const data =
        createInvestmentData();

    await loginPage
        .openApplication();

    // await loginPage.login(
    //     process.env.APP_USERNAME!,
    //     process.env.APP_PASSWORD!
    // );

    // await dashboardPage.navigateToPage('Investment Requests');

    await dashboardPage
        .clickNewInvestment();

    await investmentPage
        .verifyFormIsDisplayed();

    await investmentPage
        .fillInvestmentForm(data);

    await investmentPage
        .submitInvestmentRequest();

});


// import {
//   test,
// } from '@playwright/test';

// import {
//   LoginPage,
// } from '../pages/LoginPage';

// import {
//   DashboardPage,
// } from '../pages/DashboardPage';

// import {
//   InvestmentRequestPage,
// } from '../pages/InvestmentRequestPage';

// import {
//   InvestmentGridPage,
// } from '../pages/InvestmentGridPage';

// import {
//   createInvestmentData,
// } from '../testdata/InvestmentData';

// test(
//   'Create Investment',
//   async ({ page }) => {

//     test.setTimeout(180_000);

//     const loginPage =
//       new LoginPage(page);

//     const dashboardPage =
//       new DashboardPage(page);

//     const investmentRequestPage =
//       new InvestmentRequestPage(page);

//     const investmentGridPage =
//       new InvestmentGridPage(page);

//     const investmentData =
//       createInvestmentData();

//     await test.step(
//       'Open Application',
//       async () => {

//         await loginPage
//           .openApplication();

//       },
//     );

//     /*
//      * Execute only when authentication
//      * is enabled.
//      */
//     if (
//       process.env.APP_USERNAME &&
//       process.env.APP_PASSWORD
//     )
//      {
//       await test.step(
//         'Login',
//         async () => {

          
//        await loginPage.login(
//     process.env.APP_USERNAME!,
//     process.env.APP_PASSWORD!
// );

//         },
//       );

//     }

//     await test.step(
//       'Navigate To Investment Requests',
//       async () => {

//         await dashboardPage
//           .navigateToPage(
//             'Investment Requests'
//           );

//       },
//     );

//     await test.step(
//       'Open New Investment Dialog',
//       async () => {

//         await dashboardPage
//           .clickNewInvestment();

//         await investmentRequestPage
//           .verifyFormIsDisplayed();

//       },
//     );

//     await test.step(
//       'Fill Investment Form',
//       async () => {

//         await investmentRequestPage
//           .fillInvestmentForm(
//             investmentData
//           );

//       },
//     );

//     await test.step(
//       'Submit Investment Request',
//       async () => {

//         await investmentRequestPage
//           .submitInvestmentRequest();

//         await investmentRequestPage
//           .verifyNoValidationErrors();

//         await investmentRequestPage
//           .verifySuccessfulCreation();

//       },
//     );

//     await test.step(
//       'Verify Investment In Grid',
//       async () => {

//         await investmentGridPage
//           .searchAndVerifyInvestment(
//             investmentData.initiativeName
//           );

//       },
//     );

//   },
// );