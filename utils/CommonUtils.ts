import { Page } from '@playwright/test';

export class CommonUtils {
  static getTimestamp(): string {
    return new Date()
      .toISOString()
      .replace(/[:.]/g, '-');
  }

  static async captureScreenshot(
    page: Page,
    screenshotName: string,
  ): Promise<void> {
    await page.screenshot({
      path: `screenshots/${screenshotName}-${this.getTimestamp()}.png`,
      fullPage: true,
    });
  }
}