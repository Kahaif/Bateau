/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

export interface TwoFactorResponse {
  isMachineRemembered: boolean;
  isTwoFactorEnabled: boolean;
  recoveryCodes?: Array<string> | null;
  recoveryCodesLeft: number;
  sharedKey: string | null;
}
