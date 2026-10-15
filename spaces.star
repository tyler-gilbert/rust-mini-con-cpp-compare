"""

"""

load("//@star/prelude/rules/deps.star", "deps_new")
load("//@star/prelude/rules/run.star", "run_add_exec", "run_expect_any")

run_add_exec(
    "create_presentation_content_dir",
    command = "mkdir",
    args = ["-p", "public/content"],
    working_directory = "//reveal.js",
)

run_add_exec(
    "hardlink_presentation_content",
    command = "ln",
    args = [
        "-f",
        "../rust-mini-con-cpp-compare/content/00-introduction.md",
        "../rust-mini-con-cpp-compare/content/01-variables.md",
        "../rust-mini-con-cpp-compare/content/02-procedural-programming.md",
        "../rust-mini-con-cpp-compare/content/03-object-orient-programming.md",
        "../rust-mini-con-cpp-compare/content/04-overriding-and-overloading.md",
        "../rust-mini-con-cpp-compare/content/05-meta-programming.md",
        "../rust-mini-con-cpp-compare/content/06-async-and-coroutines.md",
        "../rust-mini-con-cpp-compare/content/07-the-end.md",
        "../rust-mini-con-cpp-compare/presentation.css",
        "public/content",
    ],
    working_directory = "//reveal.js",
    deps = deps_new(rules = [":create_presentation_content_dir"]),
)

run_add_exec(
    "install_reveal",
    command = "npm",
    args = ["install"],
    working_directory = "//reveal.js",
    deps = deps_new(files = ["//reveal.js/package.json", "//reveal.js/package-lock.json"]),
)

run_add_exec(
    "start",
    command = "npm",
    args = ["start"],
    working_directory = "//reveal.js",
    deps = deps_new(rules = [":install_reveal", ":hardlink_presentation_content"]),
    expect = run_expect_any(),
)

run_add_exec(
    "build",
    command = "npm",
    args = [
        "exec",
        "--",
        "vite",
        "build",
        "--config",
        "../rust-mini-con-cpp-compare/presentation.vite.config.mjs",
    ],
    working_directory = "//reveal.js",
    deps = deps_new(rules = [":install_reveal", ":hardlink_presentation_content"]),
    log_level = "Passthrough",
)
