using frontend.Api;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace frontend.Pages;

public class IndexModel : PageModel
{
    private readonly ILogger<IndexModel> _logger;

    public List<string> PreparedItems { get; set; } = [];
    
    [BindProperty]
    public int Count { get; set; }

    public IndexModel(ILogger<IndexModel> logger)
    {
        _logger = logger;
    }

    public async Task OnGet()
    {
        PreparedItems = new()
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

    public async Task<IActionResult> OnPost()
    {
        
        return Page();
    }
}

public class Meal(string name, MealDuration duration)
{
    public string Name = name;
    public MealDuration Duration = duration;
}