export interface InvestmentData {
  initiativeName: string;
  fundingType: string;
  description: string;
  initiativeType: string;
  requestingSegment: string;
  strategicPriority: string;
  requestingLob: string;
  requestingElt: string;
  businessContact: string;
  financeContact: string;
  internationalRelated: string;
  closedSalesImpact: string;
  cbaApplicable: string;
  leaderPriority: string;
  prelimRoi: string;
  techResourceRequired: string;
  iusEligible: string;
  decisionDateRequired: string;
  targetFundingStartDate: string;
}

export function createInvestmentData(): InvestmentData {

  return {

    initiativeName: `INV_AD`,

    fundingType: 'Incremental',

    description:
      'Investment request created through Playwright automation',

    initiativeType: 'STRATEGIC PRIORITY',

    requestingSegment: 'GTO',

    strategicPriority: 'AI EVOLUTION',

    requestingLob: 'Legal',

    requestingElt: 'TYPE A',

    businessContact: 'PersonA@gmail.com',

    financeContact: 'PersonA@gmail.com',

    internationalRelated: 'No',

    closedSalesImpact: 'No',

    cbaApplicable: 'Yes',

    leaderPriority: 'No',

    prelimRoi: '15',

    techResourceRequired: 'Yes',

    iusEligible: 'No',

    /*
     * Selected via APEX calendar.
     */
    decisionDateRequired: '01/08/2029',

    targetFundingStartDate: '01/08/2029'

  };
}