//phaedrusflow/build.zig
//-----------------------
//Copyright (C) 2025 Qompass AI, All rights reserved
const std = @import("std");
const zine = @import("zine");

pub fn build(b: *std.Build) void {
    _ = zine.website(b, .{});
}
