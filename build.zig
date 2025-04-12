const std = @import("std");
const zine = @import("zine");

pub fn build(b: *std.Build) !void {
    // Define configuration values directly (no options object needed)
    const host_url = "https://phaedrusflow.github.io";
    const layouts_dir = "layouts";
    const content_dir = "content";
    const output_dir = "public";
    const assets_dir = "assets";
    const site_title = "The Deep Pursuit of Quality AI";

    // Configure Zine website
    try zine.website(b, .{
        // Required core configuration
        .host_url = host_url,
        .layouts_dir_path = layouts_dir,
        .content_dir_path = content_dir,
        .output_dir_path = output_dir,
        .assets_dir_path = assets_dir,

        // Metadata
        .site_title = site_title,
        .site_description = "Quality AI Adoption Solutions as a Service",
        .author = "Matthew A. Porter",
        .language = "en-US",
        .generate_rss = true,
        .rss_title = "Quantum AI Research and Developments",

        // Features
        .features = .{
            .math = true,
            .mermaid = true,
            .code_highlighting = true,
        },

        // Social links
        .social_links = .{
            .youtube = "https://www.youtube.com/@QompassAI",
            .twitter = "https://twitter.com/PhaedrusFlow",
            .github = "https://github.com/phaedrusflow",
        },

        // Optional configurations
        .youtube_integration = .{
            .channel = "@QompassAI",
            .show_latest = 3,
        },
        .tooltips = .{
            .enable = true,
            .tech_version_info = true,
        },
        .theme = .{
            .primary_color = "#76B900",
            .secondary_color = "#0668E1",
            .dark_mode = true,
        },
    });
}
