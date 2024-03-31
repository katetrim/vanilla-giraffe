using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using frontend.Pages;
using Newtonsoft.Json;

namespace frontend.Api;

public class Api
{
    private readonly HttpClient _httpClient;
    private string _baseUrl = "localhost:5000";

    public Api()
    {
        _httpClient = new HttpClient();
    }

    public async Task<(HttpStatusCode, T?)> MakeGetRequestAsync<T>(string url, params (string, string)[] queryParams)
    {
        try
        {
            if (queryParams.Length > 0)
            {
                url += "?";
                foreach ((string, string) param in queryParams)
                    url += $"&{param.Item1}={param.Item2}";
            }
            var response = await _httpClient.GetAsync(url);
            return (response.StatusCode, JsonConvert.DeserializeObject<T?>(await response.Content.ReadAsStringAsync()));
        }
        catch (Exception ex)
        {
            // Handle any exceptions here
            Console.WriteLine($"An error occurred: {ex.Message}");
            return (HttpStatusCode.InternalServerError, default(T));
        }
    }

    public async Task<(HttpStatusCode, Rsp?)> MakePostRequestAsync<Req, Rsp>(string url, Req request)
    {
        try
        {
            var requestContent = new StringContent(JsonConvert.SerializeObject(request));
            var response = await _httpClient.PostAsync(url, requestContent);
            return (response.StatusCode, JsonConvert.DeserializeObject<Rsp?>(await response.Content.ReadAsStringAsync())); 
        }
        catch (Exception ex)
        {
            // Handle any exceptions here
            Console.WriteLine($"An error occurred: {ex.Message}");
            return (HttpStatusCode.InternalServerError, default(Rsp));
        }
    }

    public async Task<bool> AddMeal(string meal, string username, string accessKey, MealDuration duration)
    {
        var resp = await MakePostRequestAsync<MealAddRequest, MealAddResponse>(_baseUrl, new MealAddRequest(
            UserId: username,
            AccessKey: accessKey,
            MealName: meal,
            MealDuration: duration
        ));

        // Meal added successfully when Status code OK
        return resp.Item1 is HttpStatusCode.OK;
    } 

    public async Task<bool> RemoveMeal(string meal, string username, string accessKey)
    {
        var resp = await MakePostRequestAsync<MealRemoveRequest, MealRemoveResponse>(_baseUrl, new MealRemoveRequest(
            UserId: username,
            AccessKey: accessKey,
            MealName: meal
        ));

        // Meal added successfully when Status code OK
        return resp.Item1 is HttpStatusCode.OK;
    } 

    public async Task<(bool, List<Meal>?)> GetMeals(string username, string accessKey)
    {
        var resp = await MakeGetRequestAsync<MealsGetResponse>(_baseUrl, ("Username", username), ("AccessKey", accessKey));

        // Meal added successfully when Status code OK
        return (resp.Item1 is HttpStatusCode.OK, resp.Item2?.AllMeals.Select(meal => new Meal(meal.Item1, meal.Item2)).ToList());
    } 
}