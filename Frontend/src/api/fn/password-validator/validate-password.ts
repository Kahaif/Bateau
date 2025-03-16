/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { IdentityResult } from '../../models/identity-result';
import { Request } from '../../models/request';

export interface ValidatePassword$Params {
      body: Request
}

export function validatePassword(http: HttpClient, rootUrl: string, params: ValidatePassword$Params, context?: HttpContext): Observable<StrictHttpResponse<IdentityResult>> {
  const rb = new RequestBuilder(rootUrl, validatePassword.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<IdentityResult>;
    })
  );
}

validatePassword.PATH = '/validatePassword';
