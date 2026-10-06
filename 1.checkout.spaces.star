"""
Get the tools
"""

load("//@star/packages/star/node.star", "node_add")
load("//@star/packages/star/spaces-cli.star", "spaces_add_devutils", "spaces_add_star_formatter")
load("//@star/packages/star/starship.star", "starship_add_bash")
load("//@star/prelude/rules/checkout.star", "checkout_add_repo")

node_add("node25", version = "v25.2.1")

checkout_add_repo(
    "reveal.js",
    url = "https://github.com/hakimel/reveal.js.git",
    rev = "6.0.2",
)

spaces_add_devutils(
    "spaces0",
    "v0.22.2",
    devutils_version = "devutils-v0.1.15",
    system_paths = ["/usr/bin", "/bin"],
)

spaces_add_star_formatter(
    "star_formatter0",
    configure_zed = True,
)

starship_add_bash(
    "starship0",
    shortcuts = {},
    install_binary = False,
    deps = [":spaces0"],
)
