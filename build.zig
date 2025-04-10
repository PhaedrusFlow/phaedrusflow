const std = @import("std");
const zine = @import("zine");

pub fn build(b: *std.Build) !void {
       const options = b.addOptions();
    
    // Add all your website options
    options.addOption([]const u8, "title", "The Deep Pursuit of Quality AI");
    options.addOption([]const u8, "host_url", "https://phaedrusflow.github.io");
    options.addOption([]const u8, "layouts_dir_path", "layouts");
    options.addOption([]const u8, "content_dir_path", "content");
    options.addOption([]const u8, "assets_dir_path", "assets");
    options.addOption([]const u8, "author", "Matthew A. Porter");
    options.addOption([]const u8, "description", "Quality AI Adoption Solutions as a Service");
    options.addOption([]const u8, "language", "en-US");
    options.addOption([]const u8, "output_dir_path", "public");
    options.addOption([]const u8, "github_repo", "phaedrusflow");
    options.addOption([]const u8, "github_user", "phaedrusflow");
    options.addOption(bool, "generate_rss", true);
    options.addOption([]const u8, "rss_title", "Quantum AI Research and Developments");
    options.addOption(bool, "math", true);
    options.addOption(bool, "mermaid", true);
    options.addOption(bool, "code_highlighting", true);
    options.addOption([]const u8, "site_keywords", "quantum ai, healthcare, education, medical informatics, veteran, deep tech");
    try zine.website(b, .{
        .title = "The Deep Pursuit of Quality AI",
        .host_url = "https://phaedrusflow.github.io",
        .layouts_dir_path = "layouts",
        .content_dir_path = "content",
        .assets_dir_path = "assets",

        .social_links = .{
            .youtube = "https://www.youtube.com/@QompassAI",
            .twitter = "https://twitter.com/PhaedrusFlow",
            .github = "https://github.com/phaedrusflow",
        },

        .youtube_integration = .{
            .channel = "@QompassAI",
            .show_latest = 3,
        },

        .author = "Matthew Anthony Porter",
        .description = "Service Disabled Veteran DeepTech exploring quantum AI models at the intersection of healthcare and education",
        .language = "en-US",
        .output_dir_path = "public",

        .github_repo = "phaedrusflow",
        .github_user = "phaedrusflow",

        .generate_rss = true,
        .rss_title = "Quantum AI Research and Developments",

        // Tooltips configuration
        .tooltips = .{
            .enable = true,
            .tech_version_info = true, // Shows versions on hover
            .glossary_path = "content/glossary.smd",
        },

        // Technology showcase
        .tech_stack_showcase = .{
            .enable = true,
            .categories = &.{
                "languages",
                "frameworks",
                "tools",
                "databases",
                "cloud",
                "quantum",
            },
            .interactive = true,
        },

         // Add custom styling for tooltips and hover effects
        .custom_styles = .{
            .enable = true,
            .inline_css = true,
            .external_css = &.{"assets/tooltips.css", "assets/hover-effects.css"},
        },
        
        // Add JavaScript for interactive elements
        .custom_scripts = .{
            .enable = true,
            .inline_js = true,
            .external_js = &.{"assets/tooltip-handler.js", "assets/svg-interactions.js"},
        },
        
        // SuperMarkdown specific configurations
        .supermd = .{
            .enable_extensions = true,
            .tech_icons = true,
            .equation_rendering = .katex, // Alternative: .mathjax
            .code_copy_button = true,
            .diagrams = .{
                .mermaid = true,
                .graphviz = true,
                .svg_optimization = true,
            },
        },
        
        // Add theme configuration
        .theme = .{
            .primary_color = "#76B900", // NVIDIA green
            .secondary_color = "#0668E1", // Meta blue
            .dark_mode = true,
            .syntax_highlighting_theme = "github-dark",
        },

        .features = .{
            .math = true,
            .mermaid = true,
            .code_highlighting = true,
        },

        .site_keywords = "quantum ai, healthcare, education, medical informatics, veteran, deep tech",
    });
}
