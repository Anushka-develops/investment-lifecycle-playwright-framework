import {
  expect,
  Locator,
  Page,
} from '@playwright/test';

import {
  ApexPage,
} from './ApexPage';

export class ApexNavigation
  extends ApexPage {

  readonly navigationButton: Locator;

  constructor(page: Page) {
    super(page);

    this.navigationButton =
      page.locator(
        '#t_Button_navControl',
      );
  }

  private navigationItem(
    pageName: string,
  ): Locator {
    return this.page.getByRole(
      'treeitem',
      {
        name: pageName,
        exact: true,
      },
    );
  }

  async openNavigation(): Promise<void> {
    await this.waitForElementReady(
      this.navigationButton,
    );

    const expanded =
      await this.navigationButton
        .getAttribute(
          'aria-expanded',
        );

    if (expanded !== 'true') {
      await this.navigationButton.click();

      await expect(
        this.page.locator(
          '.a-TreeView',
        ),
      ).toBeVisible({
        timeout: 20_000,
      });
    }
  }

  async closeNavigation(): Promise<void> {
    const expanded =
      await this.navigationButton
        .getAttribute(
          'aria-expanded',
        );

    if (expanded === 'true') {
      await this.navigationButton.click();
    }
  }

  async navigateToPage(
    pageName: string,
    destinationReadyElement: Locator,
  ): Promise<void> {
    await this.openNavigation();

    const menuItem =
      this.navigationItem(pageName);

    await this.waitForElementReady(
      menuItem,
    );

    const destination =
      await menuItem.getAttribute(
        'href',
      );

    if (!destination) {
      throw new Error(
        `Navigation item "${pageName}" does not contain an href`
      );
    }

    console.log(
      `Navigating to: ${destination}`
    );

    /*
     * APEX tree navigation click was hanging while
     * Playwright waited for scheduled navigation.
     *
     * Navigating to the actual APEX-generated href
     * separates destination loading from tree animation
     * and click lifecycle handling.
     */
    await this.page.goto(
      destination,
      {
        waitUntil: 'domcontentloaded',
        timeout: 60_000,
      },
    );

    await this.waitForApexAvailable();

    await expect(
      destinationReadyElement,
    ).toBeVisible({
      timeout: 60_000,
    });
  }
}