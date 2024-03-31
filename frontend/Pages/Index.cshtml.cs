using frontend.Api;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace frontend.Pages;

public class IndexModel : PageModel
{
    private readonly ILogger<IndexModel> _logger;

    public List<string> Items { get; set; } = [];

    public IndexModel(ILogger<IndexModel> logger)
    {
        _logger = logger;
    }

    public async Task OnGet()
    {
        Items = new List<string>()
        {
            "Bolognese",
            "Lasagne",
            "Pizza",
            "Spaghetti Carbonara",
            "Tiramisu",
            "Panna Cotta",
            "Gelato"
        };
    }
}

public class Meal(string name, MealDuration duration)
{
    public string Name = name;
    public MealDuration Duration = duration;
}