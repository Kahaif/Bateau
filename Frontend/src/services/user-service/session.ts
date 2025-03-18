import {AccessTokenResponse} from "../../api/models/access-token-response";

export interface User {
  email: string;
}

export interface StoredSession {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly absoluteExpirationTicks: number;
  readonly user: User;
}

/**
 * Interface for the JWT representing the user session stored in the browser's storage.
 * This also  handles the expiration srategy
 */
export default class Session implements StoredSession {
  readonly user: User;
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly absoluteExpirationTicks: number;

  private constructor(
    user: User,
    accessToken: string,
    refreshToken: string,
    absoluteExpiration: number
    )
  {
    this.user = user;
    this.accessToken = accessToken!;
    this.refreshToken = refreshToken!;
    this.absoluteExpirationTicks = absoluteExpiration;
  }

  get isExpired() {
    return Date.now() > this.absoluteExpirationTicks;
  }

  toJson = () => {
    return JSON.stringify(this);
  }

  static fromJson = (json: string) => {
    const parsedJson: StoredSession = JSON.parse(json);
    // no guards here, assuming the json is correct.
    return new Session(
      parsedJson.user,
      parsedJson.accessToken,
      parsedJson.refreshToken,
      parsedJson.absoluteExpirationTicks
    );
  }

  static fromApiToken = (user: User, apiToken: AccessTokenResponse) => {
    return new Session(
      user,
      apiToken.accessToken!,
      apiToken.refreshToken!,
      Date.now() + apiToken.expiresIn * 1000);
  }
}
