using Markdig;
using Microsoft.AspNetCore.Mvc;
using Markdig.Syntax;
using System.Text.RegularExpressions;

public class WikiController : Controller
{
    private readonly string wikiPath;

    private static readonly Regex DiagramBlockRegex = new Regex(
        @"```diagram\s*\r?\n(.*?)\r?\n```",
        RegexOptions.Singleline | RegexOptions.Compiled
    );

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

        markdown = DiagramBlockRegex.Replace(markdown, match =>
        {
            var base64 = match.Groups[1].Value.Trim();
            return $"<div class=\"wiki-diagram-wrapper\"><img src=\"data:image/svg+xml;base64,{base64}\" alt=\"Диаграмма\" class=\"wiki-diagram\" /></div>";
        });

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