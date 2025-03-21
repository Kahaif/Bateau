/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { AccessTokenResponse } from '../models/access-token-response';
import { forgotPasswordPost } from '../fn/identity/forgot-password-post';
import { ForgotPasswordPost$Params } from '../fn/identity/forgot-password-post';
import { InfoResponse } from '../models/info-response';
import { loginPost } from '../fn/identity/login-post';
import { LoginPost$Params } from '../fn/identity/login-post';
import { manage2FaPost } from '../fn/identity/manage-2-fa-post';
import { Manage2FaPost$Params } from '../fn/identity/manage-2-fa-post';
import { manageInfoGet } from '../fn/identity/manage-info-get';
import { ManageInfoGet$Params } from '../fn/identity/manage-info-get';
import { manageInfoPost } from '../fn/identity/manage-info-post';
import { ManageInfoPost$Params } from '../fn/identity/manage-info-post';
import { mapIdentityApiConfirmEmail } from '../fn/identity/map-identity-api-confirm-email';
import { MapIdentityApiConfirmEmail$Params } from '../fn/identity/map-identity-api-confirm-email';
import { refreshPost } from '../fn/identity/refresh-post';
import { RefreshPost$Params } from '../fn/identity/refresh-post';
import { registerPost } from '../fn/identity/register-post';
import { RegisterPost$Params } from '../fn/identity/register-post';
import { resendConfirmationEmailPost } from '../fn/identity/resend-confirmation-email-post';
import { ResendConfirmationEmailPost$Params } from '../fn/identity/resend-confirmation-email-post';
import { resetPasswordPost } from '../fn/identity/reset-password-post';
import { ResetPasswordPost$Params } from '../fn/identity/reset-password-post';
import { TwoFactorResponse } from '../models/two-factor-response';

@Injectable({ providedIn: 'root' })
export class IdentityService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `registerPost()` */
  static readonly RegisterPostPath = '/register';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registerPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerPost$Response(params?: RegisterPost$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return registerPost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `registerPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerPost(params?: RegisterPost$Params, context?: HttpContext): Observable<void> {
    return this.registerPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `loginPost()` */
  static readonly LoginPostPath = '/login';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loginPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  loginPost$Response(params?: LoginPost$Params, context?: HttpContext): Observable<StrictHttpResponse<AccessTokenResponse>> {
    return loginPost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `loginPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  loginPost(params?: LoginPost$Params, context?: HttpContext): Observable<AccessTokenResponse> {
    return this.loginPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<AccessTokenResponse>): AccessTokenResponse => r.body)
    );
  }

  /** Path part for operation `refreshPost()` */
  static readonly RefreshPostPath = '/refresh';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `refreshPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  refreshPost$Response(params?: RefreshPost$Params, context?: HttpContext): Observable<StrictHttpResponse<AccessTokenResponse>> {
    return refreshPost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `refreshPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  refreshPost(params?: RefreshPost$Params, context?: HttpContext): Observable<AccessTokenResponse> {
    return this.refreshPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<AccessTokenResponse>): AccessTokenResponse => r.body)
    );
  }

  /** Path part for operation `mapIdentityApiConfirmEmail()` */
  static readonly MapIdentityApiConfirmEmailPath = '/confirmEmail';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `mapIdentityApiConfirmEmail()` instead.
   *
   * This method doesn't expect any request body.
   */
  mapIdentityApiConfirmEmail$Response(params?: MapIdentityApiConfirmEmail$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return mapIdentityApiConfirmEmail(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `mapIdentityApiConfirmEmail$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  mapIdentityApiConfirmEmail(params?: MapIdentityApiConfirmEmail$Params, context?: HttpContext): Observable<void> {
    return this.mapIdentityApiConfirmEmail$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `resendConfirmationEmailPost()` */
  static readonly ResendConfirmationEmailPostPath = '/resendConfirmationEmail';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `resendConfirmationEmailPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  resendConfirmationEmailPost$Response(params?: ResendConfirmationEmailPost$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return resendConfirmationEmailPost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `resendConfirmationEmailPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  resendConfirmationEmailPost(params?: ResendConfirmationEmailPost$Params, context?: HttpContext): Observable<void> {
    return this.resendConfirmationEmailPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `forgotPasswordPost()` */
  static readonly ForgotPasswordPostPath = '/forgotPassword';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `forgotPasswordPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  forgotPasswordPost$Response(params?: ForgotPasswordPost$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return forgotPasswordPost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `forgotPasswordPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  forgotPasswordPost(params?: ForgotPasswordPost$Params, context?: HttpContext): Observable<void> {
    return this.forgotPasswordPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `resetPasswordPost()` */
  static readonly ResetPasswordPostPath = '/resetPassword';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `resetPasswordPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  resetPasswordPost$Response(params?: ResetPasswordPost$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return resetPasswordPost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `resetPasswordPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  resetPasswordPost(params?: ResetPasswordPost$Params, context?: HttpContext): Observable<void> {
    return this.resetPasswordPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `manage2FaPost()` */
  static readonly Manage2FaPostPath = '/manage/2fa';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `manage2FaPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  manage2FaPost$Response(params?: Manage2FaPost$Params, context?: HttpContext): Observable<StrictHttpResponse<TwoFactorResponse>> {
    return manage2FaPost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `manage2FaPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  manage2FaPost(params?: Manage2FaPost$Params, context?: HttpContext): Observable<TwoFactorResponse> {
    return this.manage2FaPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<TwoFactorResponse>): TwoFactorResponse => r.body)
    );
  }

  /** Path part for operation `manageInfoGet()` */
  static readonly ManageInfoGetPath = '/manage/info';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `manageInfoGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  manageInfoGet$Response(params?: ManageInfoGet$Params, context?: HttpContext): Observable<StrictHttpResponse<InfoResponse>> {
    return manageInfoGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `manageInfoGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  manageInfoGet(params?: ManageInfoGet$Params, context?: HttpContext): Observable<InfoResponse> {
    return this.manageInfoGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<InfoResponse>): InfoResponse => r.body)
    );
  }

  /** Path part for operation `manageInfoPost()` */
  static readonly ManageInfoPostPath = '/manage/info';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `manageInfoPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  manageInfoPost$Response(params?: ManageInfoPost$Params, context?: HttpContext): Observable<StrictHttpResponse<InfoResponse>> {
    return manageInfoPost(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `manageInfoPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  manageInfoPost(params?: ManageInfoPost$Params, context?: HttpContext): Observable<InfoResponse> {
    return this.manageInfoPost$Response(params, context).pipe(
      map((r: StrictHttpResponse<InfoResponse>): InfoResponse => r.body)
    );
  }

}
