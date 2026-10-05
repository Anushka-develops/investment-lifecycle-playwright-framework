import {
  expect,
  Locator,
  Page,
} from '@playwright/test';

export class ApexPage {
  constructor(
    protected readonly page: Page,
  ) {}

  async openApplication(): Promise<void> {
    await this.page.goto('/', {
      waitUntil: 'domcontentloaded',
      timeout: 60_000,
    });
  }

  async waitForApexAvailable(): Promise<void> {
    await expect
      .poll(
        async () => {
          return await this.page.evaluate(() => {
            return Boolean(
              (window as unknown as {
                apex?: unknown;
              }).apex
            );
          });
        },
        {
          message:
            'Expected the Oracle APEX JavaScript object to become available',
          timeout: 30_000,
          intervals: [
            250,
            500,
            1000,
          ],
        },
      )
      .toBe(true);
  }

  async waitForApexProcessingToFinish(): Promise<void> {
    const processingIndicators =
      this.page.locator(
        '.u-Processing, ' +
        '.u-Processing-spinner, ' +
        '.apex_wait_overlay, ' +
        '.apex-loading-indicator',
      );

    await expect
      .poll(
        async () => {
          return await processingIndicators.count();
        },
        {
          message:
            'Expected visible APEX processing indicators to disappear',
          timeout: 30_000,
          intervals: [
            250,
            500,
            1000,
          ],
        },
      )
      .toBe(0);
  }

  async waitForElementReady(
    locator: Locator,
    timeout = 30_000,
  ): Promise<void> {
    await expect(locator).toBeAttached({
      timeout,
    });

    await expect(locator).toBeVisible({
      timeout,
    });

    await expect(locator).toBeEnabled({
      timeout,
    });
  }

  async logPageState(
    label: string,
  ): Promise<void> {
    console.log(
      `[${label}] URL: ${this.page.url()}`
    );

    console.log(
      `[${label}] Title: ${await this.page.title()}`
    );

    console.log(
      `[${label}] Frames: ${this.page.frames().length}`
    );

    console.log(
      `[${label}] Pages: ${this.page.context().pages().length}`
    );
  }

  attachDiagnostics(): void {
    this.page.on(
      'console',
      message => {
        console.log(
          `[Browser ${message.type()}] ${message.text()}`
        );
      },
    );

    this.page.on(
      'pageerror',
      error => {
        console.log(
          `[Browser Error] ${error.message}`
        );
      },
    );

    this.page.on(
      'requestfailed',
      request => {
        console.log(
          `[Request Failed] ${request.method()} ${request.url()}`
        );

        console.log(
          `[Failure] ${request.failure()?.errorText}`
        );
      },
    );

    this.page.on(
      'response',
      response => {
        if (response.status() >= 400) {
          console.log(
            `[HTTP ${response.status()}] ${response.url()}`
          );
        }
      },
    );
  }
}