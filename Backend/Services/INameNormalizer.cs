namespace Backend.Services;

public interface INameNormalizer
{
    string Normalize(string name);
}


internal class NameNormalizer : INameNormalizer
{
    public string Normalize(string name)
    {
        return name.Trim().ToLowerInvariant();
    }
}