import {
  expect,
  Page,
} from '@playwright/test';

export class ApexInteractiveGrid {
  constructor(
    private readonly page: Page,
  ) {}

  async waitForGridReady(
    staticId: string,
  ): Promise<void> {
    const region =
      this.page.locator(
        `#${staticId}`,
      );

    await expect(region).toBeVisible({
      timeout: 30_000,
    });

    await expect
      .poll(
        async () => {
          return await this.page.evaluate(
            regionStaticId => {
              const apexObject =
                (
                  window as unknown as {
                    apex?: {
                      region: (
                        id: string
                      ) => {
                        widget?: () => {
                          interactiveGrid?: (
                            method: string,
                            view: string
                          ) => unknown;
                        };
                      };
                    };
                  }
                ).apex;

              if (!apexObject) {
                return false;
              }

              const apexRegion =
                apexObject.region(
                  regionStaticId,
                );

              if (
                !apexRegion ||
                !apexRegion.widget
              ) {
                return false;
              }

              try {
                const widget =
                  apexRegion.widget();

                const gridView =
                  widget.interactiveGrid?.(
                    'getViews',
                    'grid',
                  );

                return Boolean(gridView);
              } catch {
                return false;
              }
            },
            staticId,
          );
        },
        {
          message:
            `Expected Interactive Grid "${staticId}" to become ready`,
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

  async search(
    staticId: string,
    searchText: string,
  ): Promise<void> {
    const grid =
      this.page.locator(
        `#${staticId}`,
      );

    const searchInput =
      grid.getByRole(
        'searchbox',
        {
          name: /row search/i,
        },
      );

    await expect(
      searchInput,
    ).toBeVisible({
      timeout: 20_000,
    });

    await searchInput.fill(searchText);

    await searchInput.press('Enter');
  }

  async verifyText(
    staticId: string,
    text: string,
  ): Promise<void> {
    await expect(
      this.page
        .locator(`#${staticId}`)
        .getByText(
          text,
          {
            exact: true,
          },
        ),
    ).toBeVisible({
      timeout: 30_000,
    });
  }
}