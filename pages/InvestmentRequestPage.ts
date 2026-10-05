import {
  expect,
  FrameLocator,
  Locator,
  Page,
} from '@playwright/test';

import {
  InvestmentData,
} from '../testdata/InvestmentData';

export class InvestmentRequestPage {
  readonly page: Page;

  /*
   * Oracle APEX opens the New Investment Form
   * inside this iframe.
   */
  readonly formFrame: FrameLocator;

  readonly formHeading: Locator;

  readonly initiativeName: Locator;
  readonly fundingType: Locator;
  readonly description: Locator;
  readonly initiativeType: Locator;
  readonly requestingSegment: Locator;
  readonly strategicPriority: Locator;
  readonly requestingLob: Locator;
  readonly requestingElt: Locator;
  readonly businessContact: Locator;
  readonly financeContact: Locator;
  readonly internationalRelated: Locator;
  readonly closedSalesImpact: Locator;
  readonly cbaApplicable: Locator;
  readonly leaderPriority: Locator;
  readonly prelimRoi: Locator;
  readonly techResourceRequired: Locator;
  readonly iusEligible: Locator;
  readonly targetFundingStartDate: Locator;
  readonly decisionDateRequired: Locator;

  readonly createButton: Locator;
  readonly cancelButton: Locator;

  readonly validationErrors: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    /*
     * Your HTML shows:
     *
     * <iframe title="New Investment Form">
     *
     * Using the title is more specific than
     * page.frameLocator('iframe').
     */
    this.formFrame = page.frameLocator(
      'iframe[title="New Investment Form"]',
    );

    /*
     * "Investment Profile" is inside the iframe.
     * "New Investment Form" is the outer dialog title.
     */
    this.formHeading = this.formFrame.getByRole(
      'heading',
      {
        name: 'Investment Profile',
        exact: true,
      },
    );

    /*
     * Every form locator must use this.formFrame,
     * not this.page.
     */
    this.initiativeName = this.formFrame.getByLabel(
  'Initiative Name',
  {
    exact: true,
  },
);

    this.fundingType = this.formFrame.getByLabel(
      'Funding Type',
      {
        exact: true,
      },
    );

    this.description = this.formFrame.getByLabel(
      'Description',
      {
        exact: true,
      },
    );

    this.initiativeType = this.formFrame.getByLabel(
      'Initiative Type',
      {
        exact: true,
      },
    );

    this.requestingSegment = this.formFrame.getByLabel(
      'Requesting Segment',
      {
        exact: true,
      },
    );

    this.strategicPriority = this.formFrame.getByLabel(
      'Strategic Priority',
      {
        exact: true,
      },
    );

    this.requestingLob = this.formFrame.getByLabel(
      /Requesting LOB/i,
    );

    this.requestingElt = this.formFrame.getByLabel(
      'Requesting ELT',
      {
        exact: true,
      },
    );

    this.businessContact = this.formFrame.getByLabel(
      'Business Contact',
      {
        exact: true,
      },
    );

    this.financeContact = this.formFrame.getByLabel(
      'Finance Contact',
      {
        exact: true,
      },
    );

    this.internationalRelated =
      this.formFrame.getByLabel(
        'International Related?',
        {
          exact: true,
        },
      );

    this.closedSalesImpact =
      this.formFrame.getByLabel(
        'Closed Sales Impact?',
        {
          exact: true,
        },
      );

    this.cbaApplicable = this.formFrame.getByLabel(
      'CBA Applicable?',
      {
        exact: true,
      },
    );

    this.leaderPriority = this.formFrame.getByLabel(
      'Leader Priority?',
      {
        exact: true,
      },
    );

    this.prelimRoi = this.formFrame.getByLabel(
      /Prelim ROI/i,
    );

    this.techResourceRequired =
      this.formFrame.getByLabel(
        'Tech Resource Required?',
        {
          exact: true,
        },
      );

    this.iusEligible = this.formFrame.getByLabel(
      'IUS Eligible?',
      {
        exact: true,
      },
    );

    this.targetFundingStartDate =
      this.formFrame.getByLabel(
        'Target Funding Start Date',
        {
          exact: true,
        },
      );

    this.decisionDateRequired =
      this.formFrame.getByLabel(
        'Decision Date Required',
        {
          exact: true,
        },
      );

    /*
     * Create and Cancel are also inside the iframe.
     */
    this.createButton = this.formFrame.getByRole(
      'button',
      {
        name: 'Create',
        exact: true,
      },
    );

    this.cancelButton = this.formFrame.getByRole(
      'button',
      {
        name: 'Cancel',
        exact: true,
      },
    );

    /*
     * Validation messages are displayed inside
     * the iframe containing the form.
     */
    this.validationErrors = this.formFrame.locator(
      '.t-Form-error:not(:empty), ' +
      '.a-AlertMessage:not(:empty), ' +
      '.t-Alert--danger',
    );

    /*
     * After creation, the APEX success message may
     * appear on the main dashboard page.
     */
    this.successMessage = page.locator(
      '.t-Alert--success, ' +
      '.t-Alert-success, ' +
      '.t-Body-alert .t-Alert--success',
    );
  }

  async verifyFormIsDisplayed(): Promise<void> {
    /*
     * frameLocator automatically waits for the
     * iframe to be attached.
     */
    await expect(
      this.formHeading,
    ).toBeVisible({
      timeout: 30000,
    });

    await expect(
      this.initiativeName,
    ).toBeVisible({
      timeout: 20_000,
    });

    await expect(
      this.fundingType,
    ).toBeVisible({
      timeout: 20_000,
    });

    await expect(
      this.createButton,
    ).toBeVisible({
      timeout: 20_000,
    });
  }

  private async selectDropdownOption(
    field: Locator,
    optionText: string,
  ): Promise<void> {
    await field.scrollIntoViewIfNeeded();

    await expect(field).toBeVisible({
      timeout: 20_000,
    });

    await expect(field).toBeEnabled({
      timeout: 20_000,
    });

    const tagName = await field.evaluate(
      element => element.tagName.toLowerCase(),
    );

    /*
     * Your screenshot indicates that the fields
     * are standard select elements.
     */
    if (tagName === 'select') {
      await field.selectOption({
        label: optionText,
      });

      await expect(field).toHaveValue(
        /.+/,
      );

      return;
    }

    /*
     * Fallback for an APEX Popup LOV or custom
     * accessible dropdown.
     */
    await field.click();

    const optionByRole =
      this.formFrame.getByRole(
        'option',
        {
          name: optionText,
          exact: true,
        },
      );

    if (await optionByRole.count() > 0) {
      await optionByRole.last().click();
      return;
    }

    /*
     * Final fallback for custom dropdown options
     * that do not expose the option role.
     */
    const optionByText =
      this.formFrame.getByText(
        optionText,
        {
          exact: true,
        },
      );

    await expect(
      optionByText.last(),
    ).toBeVisible({
      timeout: 15_000,
    });

    await optionByText.last().click();
  }

  private async enterDate(
    field: Locator,
    dateValue: string,
  ): Promise<void> {
    await field.scrollIntoViewIfNeeded();

    await expect(field).toBeVisible({
      timeout: 20_000,
    });

    await expect(field).toBeEnabled({
      timeout: 20_000,
    });

    await field.fill(dateValue);

    /*
     * Tab triggers the APEX change/blur event.
     */
    await field.press('Tab');
  }

  async enterInitiativeName(
    value: string,
  ): Promise<void> {
    await this.initiativeName.fill(value);

    await expect(
      this.initiativeName,
    ).toHaveValue(value);
  }

  async selectFundingType(
    value: string,
  ): Promise<void> {
    await this.selectDropdownOption(
      this.fundingType,
      value,
    );
  }

  async enterDescription(
    value: string,
  ): Promise<void> {
    await this.description.fill(value);

    await expect(
      this.description,
    ).toHaveValue(value);
  }

  async selectInitiativeType(
    value: string,
  ): Promise<void> {
    await this.selectDropdownOption(
      this.initiativeType,
      value,
    );
  }

  async selectRequestingSegment(
    value: string,
  ): Promise<void> {
    await this.selectDropdownOption(
      this.requestingSegment,
      value,
    );
  }

  async selectStrategicPriority(
    value: string,
  ): Promise<void> {
    await this.selectDropdownOption(
      this.strategicPriority,
      value,
    );
  }

  async selectRequestingLob(
    value: string,
  ): Promise<void> {
    await this.selectDropdownOption(
      this.requestingLob,
      value,
    );
  }

  async selectRequestingElt(
    value: string,
  ): Promise<void> {
    await this.selectDropdownOption(
      this.requestingElt,
      value,
    );
  }

  async selectBusinessContact(
    value: string,
  ): Promise<void> {
    await this.selectDropdownOption(
      this.businessContact,
      value,
    );
  }

  async selectFinanceContact(
    value: string,
  ): Promise<void> {
    await this.selectDropdownOption(
      this.financeContact,
      value,
    );
  }

  async selectInternationalRelated(
    value: string,
  ): Promise<void> {
    await this.selectDropdownOption(
      this.internationalRelated,
      value,
    );
  }

  async selectClosedSalesImpact(
    value: string,
  ): Promise<void> {
    await this.selectDropdownOption(
      this.closedSalesImpact,
      value,
    );
  }

  async selectCbaApplicable(
    value: string,
  ): Promise<void> {
    await this.selectDropdownOption(
      this.cbaApplicable,
      value,
    );
  }

  async selectLeaderPriority(
    value: string,
  ): Promise<void> {
    await this.selectDropdownOption(
      this.leaderPriority,
      value,
    );
  }

  async enterPrelimRoi(
    value: string,
  ): Promise<void> {
    await this.prelimRoi.scrollIntoViewIfNeeded();

    await expect(
      this.prelimRoi,
    ).toBeVisible({
      timeout: 20_000,
    });

    await expect(
      this.prelimRoi,
    ).toBeEnabled({
      timeout: 20_000,
    });

    await this.prelimRoi.fill(value);

    await expect(
      this.prelimRoi,
    ).toHaveValue(value);
  }

  async selectTechResourceRequired(
    value: string,
  ): Promise<void> {
    await this.selectDropdownOption(
      this.techResourceRequired,
      value,
    );
  }

  async selectIusEligible(
    value: string,
  ): Promise<void> {
    await this.selectDropdownOption(
      this.iusEligible,
      value,
    );
  }

private async selectApexDate(
  itemName: string,
  dateValue: string,
): Promise<void> {

  /*
   * Expected input format:
   * DD/MM/YYYY
   *
   * Example:
   * 01/08/2029
   */
  const [
    day,
    month,
    year,
  ] = dateValue.split('/');

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const monthName =
    monthNames[
      Number(month) - 1
    ];

  /*
   * Convert 01/08/2029 into 2029-08-01,
   * matching the APEX data-date attribute.
   */
  const isoDate =
    `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

  /*
   * Calendar button is inside the iframe.
   */
  const calendarButton =
    this.formFrame.locator(
      `button[aria-describedby="${itemName}_LABEL"]`
    );

  await expect(
    calendarButton,
  ).toBeVisible({
    timeout: 20_000,
  });

  await calendarButton.click();

  /*
   * Month, year and calendar popup are rendered
   * outside the iframe, so use this.page.
   */
  const yearSelect =
    this.page.locator(
      `#${itemName}_year`
    );

  const monthSelect =
    this.page.locator(
      `#${itemName}_month`
    );

  const calendar =
    this.page.locator(
      `#${itemName}_calendar`
    );

  await expect(
    yearSelect,
  ).toBeVisible({
    timeout: 20_000,
  });

  /*
   * Select year first.
   */
  await yearSelect.selectOption(
    year
  );

  await expect(
    monthSelect,
  ).toBeVisible({
    timeout: 20_000,
  });

  /*
   * Select month second.
   */
  await monthSelect.selectOption({
    label: monthName,
  });

  /*
   * Wait for APEX to refresh the calendar grid
   * after changing year and month.
   */
  await expect(
    calendar.locator(
      `td[data-date="${isoDate}"]`
    ),
  ).toBeVisible({
    timeout: 20_000,
  });

  /*
   * Select the exact date using data-date.
   *
   * HTML:
   * <td data-date="2029-08-01" role="gridcell">
   *   <span role="link">1</span>
   * </td>
   */
  const dateCell =
    calendar.locator(
      `td[data-date="${isoDate}"]`
    );

  await dateCell
    .locator(
      'span[role="link"]'
    )
    .click();

  /*
   * After selecting the day, use formFrame again.
   * This automatically returns the locator context
   * to the iframe.
   */
  const dateInput =
    this.formFrame.locator(
      `#${itemName}_input`
    );

  /*
   * Confirm that APEX populated the date field.
   * This avoids assuming the displayed format until
   * its actual APEX date mask is confirmed.
   */
  await expect(
    dateInput,
  ).not.toHaveValue('', {
    timeout: 20_000,
  });

  console.log(
    `${itemName} selected: ${isoDate}`
  );
}

async enterDecisionDateRequired(
  value: string,
): Promise<void> {

  console.log(
    `Selecting Decision Date Required: ${value}`
  );

  await this.selectApexDate(
    'P5_DECISION_DATE_REQUIRED',
    value,
  );
}







 async enterTargetFundingStartDate(
  value: string,
): Promise<void> {

  console.log(
    `Selecting Target Funding Start Date: ${value}`
  );

  await this.selectApexDate(
    'P5_TARGET_FUNDING_START_DATE',
    value,
  );
}


  async fillInvestmentForm(
    data: InvestmentData,
  ): Promise<void> {
    await this.enterInitiativeName(
      data.initiativeName,
    );

    await this.selectFundingType(
      data.fundingType,
    );

    await this.enterDescription(
      data.description,
    );

    await this.selectInitiativeType(
      data.initiativeType,
    );

    await this.selectRequestingSegment(
      data.requestingSegment,
    );

    /*
     * For SP, Strategic Priority is mandatory.
     */
    if (
      data.initiativeType
        .trim()
        .toUpperCase() === 'SP'
    ) {
      await this.selectStrategicPriority(
        data.strategicPriority,
      );
    }

    await this.selectRequestingLob(
      data.requestingLob,
    );

    await this.selectRequestingElt(
      data.requestingElt,
    );

    await this.selectBusinessContact(
      data.businessContact,
    );

    await this.selectFinanceContact(
      data.financeContact,
    );

    await this.selectInternationalRelated(
      data.internationalRelated,
    );

    await this.selectClosedSalesImpact(
      data.closedSalesImpact,
    );

    await this.selectCbaApplicable(
      data.cbaApplicable,
    );

    await this.selectLeaderPriority(
      data.leaderPriority,
    );

    /*
     * Fill Prelim ROI only when the selected
     * business values enable the field.
     */
    if (data.prelimRoi) {
      await this.enterPrelimRoi(
        data.prelimRoi,
      );
    }

    await this.selectTechResourceRequired(
      data.techResourceRequired,
    );

    await this.selectIusEligible(
      data.iusEligible,
    );

    /*
     * Enter Decision Date first because your
     * validation compares these two dates.
     */
    await this.enterDecisionDateRequired(
      data.decisionDateRequired,
    );

    await this.enterTargetFundingStartDate(
      data.targetFundingStartDate,
    );
  }

  async submitInvestmentRequest(): Promise<void> {
    await this.createButton.scrollIntoViewIfNeeded();

    await expect(
      this.createButton,
    ).toBeVisible({
      timeout: 20_000,
    });

    await expect(
      this.createButton,
    ).toBeEnabled({
      timeout: 20_000,
    });

    await this.createButton.click();
  }

  async verifySuccessfulCreation(): Promise<void> {
    /*
     * A successful Create action should close or
     * detach the iframe from the main page.
     *
     * This is more reliable than immediately checking
     * isHidden(), which does not retry.
     */
    const dialogFrame = this.page.locator(
      'iframe[title="New Investment Form"]',
    );

    await expect
      .poll(
        async () => {
          const frameRemoved =
            await dialogFrame.count() === 0;

          const frameHidden =
            await dialogFrame
              .isHidden()
              .catch(() => false);

          const successVisible =
            await this.successMessage
              .isVisible()
              .catch(() => false);

          return (
            frameRemoved ||
            frameHidden ||
            successVisible
          );
        },
        {
          message:
            'Expected the investment dialog to close or a success message to appear.',
          timeout: 30_000,
        },
      )
      .toBe(true);
  }
}




// import {
//   expect,
//   FrameLocator,
//   Locator,
//   Page,
// } from '@playwright/test';

// import {
//   InvestmentData,
// } from '../testdata/InvestmentData';

// export class InvestmentRequestPage {
//   readonly page: Page;

//   /*
//    * APEX modal dialog iframe.
//    */
//   readonly formFrame: FrameLocator;

//   /*
//    * The actual iframe element on the parent page.
//    */
//   readonly dialogFrameElement: Locator;

//   readonly formHeading: Locator;

//   readonly initiativeName: Locator;
//   readonly fundingType: Locator;
//   readonly description: Locator;
//   readonly initiativeType: Locator;
//   readonly requestingSegment: Locator;
//   readonly strategicPriority: Locator;
//   readonly requestingLob: Locator;
//   readonly requestingElt: Locator;
//   readonly businessContact: Locator;
//   readonly financeContact: Locator;
//   readonly internationalRelated: Locator;
//   readonly closedSalesImpact: Locator;
//   readonly cbaApplicable: Locator;
//   readonly leaderPriority: Locator;
//   readonly prelimRoi: Locator;
//   readonly techResourceRequired: Locator;
//   readonly iusEligible: Locator;
//   readonly targetFundingStartDate: Locator;
//   readonly decisionDateRequired: Locator;

//   readonly createButton: Locator;
//   readonly cancelButton: Locator;

//   readonly validationErrors: Locator;
//   readonly successMessage: Locator;

//   /*
//    * Common Oracle APEX loading indicators.
//    */
//   readonly parentProcessingIndicator: Locator;
//   readonly dialogProcessingIndicator: Locator;

//   constructor(page: Page) {
//     this.page = page;

//     this.dialogFrameElement = page.locator(
//       'iframe[title="New Investment Form"]',
//     );

//     this.formFrame = page.frameLocator(
//       'iframe[title="New Investment Form"]',
//     );

//     this.formHeading = this.formFrame.getByRole(
//       'heading',
//       {
//         name: 'Investment Profile',
//         exact: true,
//       },
//     );

//     /*
//      * All form items are inside the APEX dialog iframe.
//      */
//     this.initiativeName = this.formFrame.getByLabel(
//       'Initiative Name',
//       {
//         exact: true,
//       },
//     );

//     this.fundingType = this.formFrame.getByLabel(
//       'Funding Type',
//       {
//         exact: true,
//       },
//     );

//     this.description = this.formFrame.getByLabel(
//       'Description',
//       {
//         exact: true,
//       },
//     );

//     this.initiativeType = this.formFrame.getByLabel(
//       'Initiative Type',
//       {
//         exact: true,
//       },
//     );

//     this.requestingSegment = this.formFrame.getByLabel(
//       'Requesting Segment',
//       {
//         exact: true,
//       },
//     );

//     this.strategicPriority = this.formFrame.getByLabel(
//       'Strategic Priority',
//       {
//         exact: true,
//       },
//     );

//     this.requestingLob = this.formFrame.getByLabel(
//       /Requesting LOB/i,
//     );

//     this.requestingElt = this.formFrame.getByLabel(
//       'Requesting ELT',
//       {
//         exact: true,
//       },
//     );

//     this.businessContact = this.formFrame.getByLabel(
//       'Business Contact',
//       {
//         exact: true,
//       },
//     );

//     this.financeContact = this.formFrame.getByLabel(
//       'Finance Contact',
//       {
//         exact: true,
//       },
//     );

//     this.internationalRelated =
//       this.formFrame.getByLabel(
//         'International Related?',
//         {
//           exact: true,
//         },
//       );

//     this.closedSalesImpact =
//       this.formFrame.getByLabel(
//         'Closed Sales Impact?',
//         {
//           exact: true,
//         },
//       );

//     this.cbaApplicable = this.formFrame.getByLabel(
//       'CBA Applicable?',
//       {
//         exact: true,
//       },
//     );

//     this.leaderPriority = this.formFrame.getByLabel(
//       'Leader Priority?',
//       {
//         exact: true,
//       },
//     );

//     this.prelimRoi = this.formFrame.getByLabel(
//       /Prelim ROI/i,
//     );

//     this.techResourceRequired =
//       this.formFrame.getByLabel(
//         'Tech Resource Required?',
//         {
//           exact: true,
//         },
//       );

//     this.iusEligible = this.formFrame.getByLabel(
//       'IUS Eligible?',
//       {
//         exact: true,
//       },
//     );

//     this.targetFundingStartDate =
//       this.formFrame.getByLabel(
//         'Target Funding Start Date',
//         {
//           exact: true,
//         },
//       );

//     this.decisionDateRequired =
//       this.formFrame.getByLabel(
//         'Decision Date Required',
//         {
//           exact: true,
//         },
//       );

//     this.createButton = this.formFrame.getByRole(
//       'button',
//       {
//         name: 'Create',
//         exact: true,
//       },
//     );

//     this.cancelButton = this.formFrame.getByRole(
//       'button',
//       {
//         name: 'Cancel',
//         exact: true,
//       },
//     );

//     this.validationErrors = this.formFrame.locator(
//       '.t-Form-error:not(:empty), ' +
//       '.a-AlertMessage:not(:empty), ' +
//       '.t-Alert--danger:visible',
//     );

//     /*
//      * The success message normally appears on the
//      * parent page after the dialog closes.
//      */
//     this.successMessage = page.locator(
//       '.t-Alert--success, ' +
//       '.t-Alert-success, ' +
//       '.t-Body-alert .t-Alert--success',
//     );

//     /*
//      * Parent-page APEX processing indicators.
//      */
//     this.parentProcessingIndicator = page.locator(
//       '.u-Processing:visible, ' +
//       '.u-Processing-spinner:visible, ' +
//       '.apex_wait_overlay:visible, ' +
//       '.apex-loading-indicator:visible',
//     );

//     /*
//      * Dialog iframe processing indicators.
//      */
//     this.dialogProcessingIndicator =
//       this.formFrame.locator(
//         '.u-Processing:visible, ' +
//         '.u-Processing-spinner:visible, ' +
//         '.apex_wait_overlay:visible, ' +
//         '.apex-loading-indicator:visible',
//       );
//   }

//   /*
//    * Wait until the parent-page processing indicators
//    * have disappeared.
//    */
//   private async waitForParentProcessingToFinish():
//   Promise<void> {
//     await expect
//       .poll(
//         async () => {
//           return await this.parentProcessingIndicator.count();
//         },
//         {
//           message:
//             'Expected parent-page APEX processing indicators to disappear',
//           timeout: 30_000,
//           intervals: [
//             250,
//             500,
//             1000,
//           ],
//         },
//       )
//       .toBe(0);
//   }

//   /*
//    * Wait until the dialog's own APEX processing
//    * indicators have disappeared.
//    */
//   private async waitForDialogProcessingToFinish():
//   Promise<void> {
//     await expect
//       .poll(
//         async () => {
//           return await this.dialogProcessingIndicator.count();
//         },
//         {
//           message:
//             'Expected dialog APEX processing indicators to disappear',
//           timeout: 30_000,
//           intervals: [
//             250,
//             500,
//             1000,
//           ],
//         },
//       )
//       .toBe(0);
//   }

//   /*
//    * Wait until a field is attached, visible,
//    * enabled and ready for interaction.
//    */
//   private async waitForFieldReady(
//     field: Locator,
//     timeout = 30_000,
//   ): Promise<void> {
//     await expect(field).toBeAttached({
//       timeout,
//     });

//     await expect(field).toBeVisible({
//       timeout,
//     });

//     await expect(field).toBeEnabled({
//       timeout,
//     });
//   }

//   /*
//    * Verify that the iframe and the form content
//    * are both fully rendered.
//    */
//   async verifyFormIsDisplayed(): Promise<void> {
//     await this.waitForParentProcessingToFinish();

//     await expect(
//       this.dialogFrameElement,
//     ).toBeAttached({
//       timeout: 30_000,
//     });

//     await expect(
//       this.dialogFrameElement,
//     ).toBeVisible({
//       timeout: 30_000,
//     });

//     await expect(
//       this.formHeading,
//     ).toBeVisible({
//       timeout: 30_000,
//     });

//     await this.waitForDialogProcessingToFinish();

//     await this.waitForFieldReady(
//       this.initiativeName,
//     );

//     await this.waitForFieldReady(
//       this.fundingType,
//     );

//     await expect(
//       this.createButton,
//     ).toBeVisible({
//       timeout: 30_000,
//     });
//   }

//   /*
//    * Supports:
//    *
//    * 1. Standard HTML SELECT items
//    * 2. APEX Select Lists
//    * 3. Accessible APEX Popup LOVs
//    * 4. Text-based custom LOV options
//    */
//   private async selectDropdownOption(
//     field: Locator,
//     optionText: string,
//   ): Promise<void> {
//     await this.waitForDialogProcessingToFinish();

//     await field.scrollIntoViewIfNeeded();

//     await this.waitForFieldReady(field);

//     const tagName = await field.evaluate(
//       element => element.tagName.toLowerCase(),
//     );

//     /*
//      * Standard select list.
//      */
//     if (tagName === 'select') {
//       await field.selectOption({
//         label: optionText,
//       });

//       /*
//        * Confirm that a value was selected.
//        */
//       await expect(field).not.toHaveValue('');

//       /*
//        * Tab allows APEX change and blur events
//        * to execute.
//        */
//       await field.press('Tab');

//       await this.waitForDialogProcessingToFinish();

//       return;
//     }

//     /*
//      * APEX Popup LOV or custom list.
//      */
//     await field.click();

//     const optionByRole =
//       this.formFrame.getByRole(
//         'option',
//         {
//           name: optionText,
//           exact: true,
//         },
//       );

//     if (await optionByRole.count() > 0) {
//       await expect(
//         optionByRole.last(),
//       ).toBeVisible({
//         timeout: 15_000,
//       });

//       await optionByRole.last().click();

//       await this.waitForDialogProcessingToFinish();

//       return;
//     }

//     /*
//      * Fallback when the custom LOV option does not
//      * expose an accessibility option role.
//      */
//     const optionByText =
//       this.formFrame.getByText(
//         optionText,
//         {
//           exact: true,
//         },
//       );

//     await expect(
//       optionByText.last(),
//     ).toBeVisible({
//       timeout: 15_000,
//     });

//     await optionByText.last().click();

//     await this.waitForDialogProcessingToFinish();
//   }

//   /*
//    * Clears and fills an APEX date field.
//    * Tab triggers APEX change and blur events.
//    */
//   private async enterDate(
//     field: Locator,
//     dateValue: string,
//   ): Promise<void> {
//     await this.waitForDialogProcessingToFinish();

//     await field.scrollIntoViewIfNeeded();

//     await this.waitForFieldReady(field);

//     await field.clear();

//     await field.fill(dateValue);

//     await expect(field).toHaveValue(dateValue);

//     await field.press('Tab');

//     await this.waitForDialogProcessingToFinish();
//   }

//   async enterInitiativeName(
//     value: string,
//   ): Promise<void> {
//     await this.waitForFieldReady(
//       this.initiativeName,
//     );

//     await this.initiativeName.clear();

//     await this.initiativeName.fill(value);

//     await expect(
//       this.initiativeName,
//     ).toHaveValue(value);
//   }

//   async selectFundingType(
//     value: string,
//   ): Promise<void> {
//     await this.selectDropdownOption(
//       this.fundingType,
//       value,
//     );
//   }

//   async enterDescription(
//     value: string,
//   ): Promise<void> {
//     await this.waitForFieldReady(
//       this.description,
//     );

//     await this.description.clear();

//     await this.description.fill(value);

//     await expect(
//       this.description,
//     ).toHaveValue(value);
//   }

//   async selectInitiativeType(
//     value: string,
//   ): Promise<void> {
//     await this.selectDropdownOption(
//       this.initiativeType,
//       value,
//     );
//   }

//   async selectRequestingSegment(
//     value: string,
//   ): Promise<void> {
//     await this.selectDropdownOption(
//       this.requestingSegment,
//       value,
//     );
//   }

//   async selectStrategicPriority(
//     value: string,
//   ): Promise<void> {
//     await this.selectDropdownOption(
//       this.strategicPriority,
//       value,
//     );
//   }

//   async selectRequestingLob(
//     value: string,
//   ): Promise<void> {
//     await this.selectDropdownOption(
//       this.requestingLob,
//       value,
//     );
//   }

//   async selectRequestingElt(
//     value: string,
//   ): Promise<void> {
//     await this.selectDropdownOption(
//       this.requestingElt,
//       value,
//     );
//   }

//   async selectBusinessContact(
//     value: string,
//   ): Promise<void> {
//     await this.selectDropdownOption(
//       this.businessContact,
//       value,
//     );
//   }

//   async selectFinanceContact(
//     value: string,
//   ): Promise<void> {
//     await this.selectDropdownOption(
//       this.financeContact,
//       value,
//     );
//   }

//   async selectInternationalRelated(
//     value: string,
//   ): Promise<void> {
//     await this.selectDropdownOption(
//       this.internationalRelated,
//       value,
//     );
//   }

//   async selectClosedSalesImpact(
//     value: string,
//   ): Promise<void> {
//     await this.selectDropdownOption(
//       this.closedSalesImpact,
//       value,
//     );
//   }

//   async selectCbaApplicable(
//     value: string,
//   ): Promise<void> {
//     await this.selectDropdownOption(
//       this.cbaApplicable,
//       value,
//     );
//   }

//   async selectLeaderPriority(
//     value: string,
//   ): Promise<void> {
//     await this.selectDropdownOption(
//       this.leaderPriority,
//       value,
//     );
//   }

//   async enterPrelimRoi(
//     value: string,
//   ): Promise<void> {
//     await this.waitForDialogProcessingToFinish();

//     await this.prelimRoi.scrollIntoViewIfNeeded();

//     await this.waitForFieldReady(
//       this.prelimRoi,
//     );

//     await this.prelimRoi.clear();

//     await this.prelimRoi.fill(value);

//     await expect(
//       this.prelimRoi,
//     ).toHaveValue(value);

//     await this.prelimRoi.press('Tab');

//     await this.waitForDialogProcessingToFinish();
//   }

//   async selectTechResourceRequired(
//     value: string,
//   ): Promise<void> {
//     await this.selectDropdownOption(
//       this.techResourceRequired,
//       value,
//     );
//   }

//   async selectIusEligible(
//     value: string,
//   ): Promise<void> {
//     await this.selectDropdownOption(
//       this.iusEligible,
//       value,
//     );
//   }

//   async enterDecisionDateRequired(
//     value: string,
//   ): Promise<void> {
//     await this.enterDate(
//       this.decisionDateRequired,
//       value,
//     );
//   }

//   async enterTargetFundingStartDate(
//     value: string,
//   ): Promise<void> {
//     await this.enterDate(
//       this.targetFundingStartDate,
//       value,
//     );
//   }

//   /*
//    * Complete all mandatory Investment Request fields.
//    */
//   async fillInvestmentForm(
//     data: InvestmentData,
//   ): Promise<void> {
//     await this.verifyFormIsDisplayed();

//     await this.enterInitiativeName(
//       data.initiativeName,
//     );

//     await this.selectFundingType(
//       data.fundingType,
//     );

//     await this.enterDescription(
//       data.description,
//     );

//     await this.selectInitiativeType(
//       data.initiativeType,
//     );

//     await this.selectRequestingSegment(
//       data.requestingSegment,
//     );

//     /*
//      * Strategic Priority is required when
//      * Initiative Type is SP.
//      */
//     if (
//       data.initiativeType
//         .trim()
//         .toUpperCase() === 'SP'
//     ) {
//       await this.selectStrategicPriority(
//         data.strategicPriority,
//       );
//     }

//     await this.selectRequestingLob(
//       data.requestingLob,
//     );

//     await this.selectRequestingElt(
//       data.requestingElt,
//     );

//     await this.selectBusinessContact(
//       data.businessContact,
//     );

//     await this.selectFinanceContact(
//       data.financeContact,
//     );

//     await this.selectInternationalRelated(
//       data.internationalRelated,
//     );

//     await this.selectClosedSalesImpact(
//       data.closedSalesImpact,
//     );

//     await this.selectCbaApplicable(
//       data.cbaApplicable,
//     );

//     await this.selectLeaderPriority(
//       data.leaderPriority,
//     );

//     /*
//      * Fill Prelim ROI only if test data contains
//      * a value and the field becomes enabled.
//      */
//     if (data.prelimRoi) {
//       await this.enterPrelimRoi(
//         data.prelimRoi,
//       );
//     }

//     await this.selectTechResourceRequired(
//       data.techResourceRequired,
//     );

//     await this.selectIusEligible(
//       data.iusEligible,
//     );

//     /*
//      * Decision Date is entered first because Target
//      * Funding Start Date is validated against it.
//      */
//     await this.enterDecisionDateRequired(
//       data.decisionDateRequired,
//     );

//     await this.enterTargetFundingStartDate(
//       data.targetFundingStartDate,
//     );
//   }

//   /*
//    * Submit the APEX modal form.
//    */
//   async submitInvestmentRequest(): Promise<void> {
//     await this.waitForDialogProcessingToFinish();

//     await this.createButton.scrollIntoViewIfNeeded();

//     await expect(
//       this.createButton,
//     ).toBeVisible({
//       timeout: 30_000,
//     });

//     await expect(
//       this.createButton,
//     ).toBeEnabled({
//       timeout: 30_000,
//     });

//     await this.createButton.click();
//   }

//   /*
//    * Verify that no visible validation errors are
//    * displayed after submission.
//    */
//   async verifyNoValidationErrors(): Promise<void> {
//     const errorCount =
//       await this.validationErrors.count();

//     if (errorCount > 0) {
//       const errorMessages =
//         await this.validationErrors.allTextContents();

//       throw new Error(
//         `APEX validation error(s): ${errorMessages.join(' | ')}`
//       );
//     }
//   }

//   /*
//    * Successful submission is confirmed when:
//    *
//    * 1. The iframe is removed, or
//    * 2. The iframe becomes hidden, or
//    * 3. The parent page displays a success alert.
//    */
//   async verifySuccessfulCreation(): Promise<void> {
//     await expect
//       .poll(
//         async () => {
//           const frameCount =
//             await this.dialogFrameElement.count();

//           const frameRemoved =
//             frameCount === 0;

//           const frameHidden =
//             frameCount > 0
//               ? await this.dialogFrameElement
//                   .isHidden()
//                   .catch(() => false)
//               : false;

//           const successVisible =
//             await this.successMessage
//               .isVisible()
//               .catch(() => false);

//           return (
//             frameRemoved ||
//             frameHidden ||
//             successVisible
//           );
//         },
//         {
//           message:
//             'Expected the New Investment dialog to close or a success message to appear.',
//           timeout: 30_000,
//           intervals: [
//             250,
//             500,
//             1000,
//           ],
//         },
//       )
//       .toBe(true);

//     await this.waitForParentProcessingToFinish();
//   }
// }