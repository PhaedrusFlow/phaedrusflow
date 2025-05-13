//phaedrusflow/build.zig
const std = @import("std");
const zine = @import("zine");

pub fn build(b: *std.Build) void {
    _ = zine.website(b, .{});
}
