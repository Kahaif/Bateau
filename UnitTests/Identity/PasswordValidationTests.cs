namespace UnitTests.Identity;

public class PasswordValidationTests
{

    [Theory]
    [InlineData("$abDfeg1")] // length requirements
    [InlineData("$abdfeg1dd")] // upper case
    [InlineData("$XADWQFQWF1LD")] // lower case
    [InlineData("xADWQFQWF1LD")] // special characters
    public void ValidatingPassword_WithNonComplexPwd_Fails(string pwd)
    {
        // arrange
        var manager = new PasswordValidator();

        // act

        // assert 
    }
}