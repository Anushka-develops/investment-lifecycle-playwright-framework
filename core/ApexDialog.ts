import {
  expect,
  FrameLocator,
  Locator,
  Page,
} from '@playwright/test';

export class ApexDialog {
  constructor(
    private readonly page: Page,
  ) {}

  frame(
    dialogTitle: string,
  ): FrameLocator {
    return this.page.frameLocator(
      `iframe[title="${dialogTitle}"]`,
    );
  }

  frameElement(
    dialogTitle: string,
  ): Locator {
    return this.page.locator(
      `iframe[title="${dialogTitle}"]`,
    );
  }

  async waitForDialog(
    dialogTitle: string,
    readyElement: Locator,
  ): Promise<void> {
    await expect(
      this.frameElement(dialogTitle),
    ).toBeAttached({
      timeout: 30_000,
    });

    await expect(
      this.frameElement(dialogTitle),
    ).toBeVisible({
      timeout: 30_000,
    });

    await expect(
      readyElement,
    ).toBeVisible({
      timeout: 30_000,
    });
  }

  async waitForDialogToClose(
    dialogTitle: string,
  ): Promise<void> {
    await expect(
      this.frameElement(dialogTitle),
    ).toHaveCount(
      0,
      {
        timeout: 30_000,
      },
    );
  }
}