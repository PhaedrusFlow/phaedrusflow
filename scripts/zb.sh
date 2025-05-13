#!/bin/sh
# scripts/zb.sh
# Copyright (C) 2025 Qompass AI, All rights reserved

rm -rf zig-cache/ zig-out/
zig build -freference-trace --fetch
zig build -Doptimize=Safe
