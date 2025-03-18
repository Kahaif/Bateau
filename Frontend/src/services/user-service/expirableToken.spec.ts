import Session, {User} from './session';
import {AccessTokenResponse} from '../../api/models/access-token-response';

const user : User = {
  email: ""
}
describe('Expirable tokens',() => {

  it('with non expired time should not be flagged as expired ', () => {
    // arrange
    const tokenRes: AccessTokenResponse =  {
      tokenType: "",
      accessToken: "",
      expiresIn: 1000,
      refreshToken: ""
    }

    // act
    const token = Session.fromApiToken(user, tokenRes)

    // assert
    expect(token.isExpired).not.toBeTrue()
  })

  it('with expired date should be flagged as expired', () => {
    // arrange
    const tokenRes: AccessTokenResponse =  {
      tokenType: "",
      accessToken: "",
      expiresIn: -100, // not really a valid, real-world case, but sufficient enough here
      refreshToken: ""
    }

    // act
    const token = Session.fromApiToken(user, tokenRes)

    // assert
    expect(token.isExpired).toBeTrue()
  })
})




