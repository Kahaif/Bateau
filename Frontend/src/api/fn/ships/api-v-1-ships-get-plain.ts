/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ShipDto } from '../../models/ship-dto';

export interface ApiV1ShipsGet$Plain$Params {
}

export function apiV1ShipsGet$Plain(http: HttpClient, rootUrl: string, params?: ApiV1ShipsGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ShipDto>>> {
  const rb = new RequestBuilder(rootUrl, apiV1ShipsGet$Plain.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<ShipDto>>;
    })
  );
}

apiV1ShipsGet$Plain.PATH = '/api/v1/Ships';
