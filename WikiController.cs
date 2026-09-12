using Markdig;
using Microsoft.AspNetCore.Mvc;
using Markdig.Syntax;

public class WikiController : Controller
{
    private readonly string wikiPath;

    public WikiController(IWebHostEnvironment env)
    {
        wikiPath = env.WebRootPath;
    }

    public async Task<IActionResult> Page(string? page = "index")
    {
        var filePath = Path.Combine(wikiPath, page + ".md");

        if (!System.IO.File.Exists(filePath))
            return NotFound();

        var markdown = await System.IO.File.ReadAllTextAsync(
            filePath,
            System.Text.Encoding.UTF8
        );

        var pipeline = new MarkdownPipelineBuilder()
            .UseAdvancedExtensions()
            .UseEmojiAndSmiley()
            .Build();
            

        var html = Markdown.ToHtml(markdown, pipeline);

        ViewBag.Content = html;
        ViewBag.Title = page;

        Response.ContentType = "text/html; charset=utf-8";

        return View();
    }
}