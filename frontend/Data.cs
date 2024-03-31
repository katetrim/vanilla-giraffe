namespace frontend.Api;

public record MealAddRequest(string UserId, string AccessKey, string MealName, MealDuration MealDuration);
public record MealRemoveRequest(string UserId, string AccessKey, string MealName);
public record MealsGetRequest(string UserId, string AccessKey);
public record LoginRequest(string UserId, string Password);
public record RegisterRequest(string UserId, string Password);
public record LogoutRequest(string UserId, string AccessKey);

public record MealAddResponse();
public record MealRemoveResponse();
public record MealsGetResponse(List<(string, MealDuration)> AllMeals);
public record LoginResponse(string AccessKey);

public record RegisterResponse();
public record LogoutResponse();

public enum MealDuration
{
    VERY_SHORT = 0,
    SHORT = 1,
    AVERAGE = 2,
    LONG = 3,
    VERY_LONG = 4
}