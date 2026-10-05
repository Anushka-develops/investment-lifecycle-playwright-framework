// import { defineConfig, devices } from '@playwright/test';
// import dotenv from 'dotenv';

// dotenv.config();

// export default defineConfig({
//   testDir: './tests',

//   fullyParallel: false,

//   timeout: 60_000,

//   expect: {
//     timeout: 10_000,
//   },

//   forbidOnly: !!process.env.CI,

//   retries: process.env.CI ? 2 : 0,

//   workers: process.env.CI ? 1 : 1,

//   reporter: [
//     ['list'],
//     ['html', {
//       outputFolder: 'playwright-report',
//       open: 'never',
//     }],
//   ],

//   use: {
//   baseURL: process.env.APP_URL,

//   channel: 'chromium',

//   serviceWorkers: 'block',

//   headless: false,

//   viewport: null,

//   launchOptions: {
//     args: ['--start-maximized'],
//   },

//   actionTimeout: 30_000,
//   navigationTimeout: 90_000,

//   screenshot: 'only-on-failure',
//   video: 'retain-on-failure',
//   trace: 'retain-on-failure',
// },

//   projects: [
//     {
//       name: 'chromium',
//       use: {
//         ...devices['Desktop Chrome'],
//       },
//     },

//     {
//       name: 'Microsoft Edge',
//       use: {
//       ...devices['Desktop Edge'],
//       channel: 'msedge',
//       },
//     },

//     // Enable these browsers after the Chromium test is stable.
//     // {
//     //   name: 'firefox',
//     //   use: {
//     //     ...devices['Desktop Firefox'],
//     //   },
//     // },
//     //
//     // {
//     //   name: 'webkit',
//     //   use: {
//     //     ...devices['Desktop Safari'],
//     //   },
//     // },
//   ],

//   outputDir: 'test-results',
// });




// import {
//   defineConfig,
//   devices,
// } from '@playwright/test';

// import dotenv from 'dotenv';

// dotenv.config();

// if (!process.env.APP_URL) {
//   throw new Error(
//     'APP_URL is missing from the .env file'
//   );
// }

// export default defineConfig({
//   testDir: './tests',

//   fullyParallel: false,

//   timeout: 180_000,

//   expect: {
//     timeout: 30_000,
//   },

//   workers: 1,

//   retries: 0,

//   reporter: [
//     ['list'],
//     [
//       'html',
//       {
//         outputFolder: 'playwright-report',
//         open: 'never',
//       },
//     ],
//   ],

//   use: {
//     baseURL: process.env.APP_URL,

//     headless: false,

//     viewport: null,

//     actionTimeout: 30_000,

//     navigationTimeout: 60_000,

//     trace: 'retain-on-failure',

//     screenshot: 'only-on-failure',

//     video: 'retain-on-failure',

//     launchOptions: {
//       args: [
//         '--start-maximized',
//       ],
//     },
//   },

//   projects: [
//     {
//   name: 'Microsoft Edge',

//   use: {

//     channel: 'msedge',
//     serviceWorkers: 'block',
//     viewport: null,

//     launchOptions: {
//       args: [
//         '--start-maximized'
//       ]
//     }

//   }
// }
//   ],

//   outputDir: 'test-results',
// });



import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
 
dotenv.config();
 
if (!process.env.APP_URL) {
    throw new Error('APP_URL is missing from the .env file');
}
 
export default defineConfig({
 
    testDir: './tests',
 
    fullyParallel: false,
 
    workers: 1,
 
    retries: 0,
 
    timeout: 180_000,
 
    expect: {
        timeout: 30_000,
    },
 
    reporter: [
        ['list'],
        [
            'html',
            {
                outputFolder: 'playwright-report',
                open: 'never',
            },
        ],
    ],
 
    outputDir: 'test-results',
 
    use: {
        baseURL: process.env.APP_URL,
 
        headless: false,
 
        viewport: null,
 
        actionTimeout: 30_000,
 
        navigationTimeout: 60_000,
 
        serviceWorkers: 'block',
 
        trace: 'retain-on-failure',
 
        screenshot: 'only-on-failure',
 
        video: 'retain-on-failure',
 
        launchOptions: {
            args: [
                '--start-maximized',
            ],
        },
    },
 
    projects: [
        {
            name: 'Microsoft Edge',
 
            use: {
                channel: 'msedge',
            },
        },
      
      //   {
      //       name: 'Chromium',
      //         use: {
      //       browserName: 'chromium',
      //       serviceWorkers: 'block',
      //       viewport: null,
      //       launchOptions: {
      //           args: ['--start-maximized']
      //       },
      //   },
      // },
      ],
});
 