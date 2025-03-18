import {TestBed} from '@angular/core/testing';

import { UserService } from './user.service';
import {IdentityService} from '../api/services/identity.service';
import {AccessTokenResponse} from '../api/models/access-token-response';
import createSpyObj = jasmine.createSpyObj;
import {first, firstValueFrom, Observable} from 'rxjs';

describe('UserService', () => {
  let userService: UserService;
  let identityApiService: jasmine.SpyObj<IdentityService>;
  const successTokenResponse: AccessTokenResponse = {
    tokenType: "",
    accessToken: "original access token",
    refreshToken: "refresh token",
    expiresIn: 50
  }

  const refreshTokenRes: AccessTokenResponse = {
    refreshToken: "refresh-token",
    accessToken: "new access token, not the other one",
    expiresIn: 1000
  };

  const makeTokenObservable = (token: AccessTokenResponse) => {
    return new Observable<AccessTokenResponse>(s => {
      s.next(token);
      s.unsubscribe()
    })
  }

  const successObservable = makeTokenObservable(successTokenResponse)

  beforeEach(() => {
    const spy = createSpyObj('IdentityService', [
      "registerPost",
      "loginPost",
      "refreshPost"
    ])

    TestBed.configureTestingModule({
      providers: [
        UserService,
        {
          provide: IdentityService,
          useValue: spy
        }
      ]
    });

    identityApiService = TestBed.inject(IdentityService) as jasmine.SpyObj<IdentityService>;
    userService = TestBed.inject(UserService);
  });


  describe('session retrieval', () => {
    it("should be succesful when the token has not expired", () => {

    })

  })

  describe('succesful login', () => {
    const subjectEmail = "email"
    it('should emit a logged in signal on success', async () => {
      // arrange
      identityApiService.loginPost.and.returnValues(successObservable);

      // act
      await firstValueFrom(userService.login(subjectEmail, ""))

      // assert
      expect(userService.loggedIn()).toBeTrue();
      expect(userService.session().user.email).toBe(subjectEmail)
    })

    it('should provide an access token', async () => {
      // arrange
      identityApiService.loginPost.and.returnValues(successObservable);

      // act
      await firstValueFrom(userService.login(subjectEmail, ""))

      // assert
      expect(userService.session().accessToken).toBe(successTokenResponse.accessToken!);
    })

    it('should start the refresh timeout', async () => {
      // arrange
      const clock = jasmine.clock().install()
      identityApiService.loginPost.and.returnValues(successObservable);
      identityApiService.refreshPost
        .and
        .returnValues(makeTokenObservable(refreshTokenRes));

      // act
      await firstValueFrom(userService.login(subjectEmail, ""))

      // act : wait for the access token expiration
      clock.tick(successTokenResponse.expiresIn + 1)

      // assert
      expect(userService.session().accessToken).toBe(refreshTokenRes.accessToken!)
    })
  })
});
