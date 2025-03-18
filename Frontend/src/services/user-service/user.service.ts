import {computed, Injectable, signal} from '@angular/core';
import {IdentityService} from '../../api/services/identity.service';
import {LoginPost$Params} from '../../api/fn/identity/login-post';
import {RegisterPost$Params} from '../../api/fn/identity/register-post';
import {firstValueFrom, tap} from 'rxjs';
import {RefreshPost$Params} from '../../api/fn/identity/refresh-post';
import {map} from 'rxjs/operators';
import Session, {User} from './session';
import {AccessTokenResponse} from '../../api/models/access-token-response';

@Injectable({
  providedIn: 'root'
})
/**
 * Service handling the login state and hiding auth details to the components.
 */
export class UserService {
  private readonly _storage = localStorage;
  private readonly sessionKey = "jwt";
  constructor(private _identityService: IdentityService) {}

  private _session = signal<Session | undefined>(undefined);
  session = computed(() => {
    if (this._session() === undefined) {
      throw new Error("Trying to access a non-existing session. This probably is a dev-time issue.");
    }
    return this._session()!;
  }, {
    equal: (x, y) => x === y
  })
  loggedIn = computed(() => this._session() !== undefined)


  private makeRefreshRequest = (refreshToken: string) => {
    const req: RefreshPost$Params = {
      body: {
        refreshToken
      }
    }

    // HttpClient is automatically unsubscribed
    return this._identityService.refreshPost(req)
  }

  // Refresh the access token using the refresh token and set another refresh timeout.
  // The refresh token is retrieved from the underlying _storage as to avoid handing issues.
  private startRefreshCycle = () => {
    const storedSession = this.storedUser!;
      return firstValueFrom(this.makeRefreshRequest(storedSession.refreshToken))
        .then((token) => this.saveSession(storedSession.user, token))
        .catch(this.logout)
  }

  // saves the given token into the storage and schedule another refresh
  private saveSession = (user: User, tokenResponse: AccessTokenResponse) => {
    const session = Session.fromApiToken(user, tokenResponse);
    this._storage.setItem(this.sessionKey, session.toJson())
    setTimeout(this.startRefreshCycle, tokenResponse.expiresIn)
    this._session.set(session)
  }

  signUp = (mail: string, password: string) => {
    const req: RegisterPost$Params = {
      body: {
        email: mail,
        password: password
      }
    }
    return this._identityService.registerPost(req)
  }

  logout = () => {
    // Remark : no further backend calls are made.
    this._storage.removeItem(this.sessionKey)
    this._session.set(undefined)
  }

  tryRestoreSessionFromStorage = async () =>  {
    const storedSession = this.storedUser;
    if (storedSession === null) {
      return false
    }

    if (storedSession.isExpired) {
      return this.startRefreshCycle()
        .then(() => true);
    }

    this._session.set(storedSession)
    setTimeout(this.startRefreshCycle, storedSession.absoluteExpirationTicks -  Date.now())
    return true;
  }

  /**
   * Sends a login request to the API. If successful, a new session is created.
   * The refresh token is automatically handled.
   */
  login = (email: string, password: string) => {
    const req: LoginPost$Params = {
      body: {
        email,
        password: password
      }
    }

    const user: User = {
      email
    }

    return this._identityService.loginPost(req)
      .pipe(
        // set a new session  and signals the consumers about the new state
        // another alternative could have been to create a "/me" endpoint,
        // produce an identity token, and use it as the true identity value.
        // I didn't do it here for simplicity reasons.
        tap((tokenRes) => this.saveSession(user, tokenRes)),
        map(x => {}) // returns a void response so the consumer is not tempted to handle the token state
      )
  }


  private get storedUser(): Session | null {
    const jsonStoredInfo = this._storage.getItem(this.sessionKey)
    if (!jsonStoredInfo) {
      return null;
    }

    return Session.fromJson(jsonStoredInfo);
  }
}


