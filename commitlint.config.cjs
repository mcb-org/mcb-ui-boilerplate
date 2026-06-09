module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "refactor",
        "docs",
        "chore",
        "test",
        "perf",
        "style",
        "build",
        "ci",
        "revert",
      ],
    ],
    "header-max-length": [2, "always", 100],
    "type-case": [2, "always", "lower-case"],
    "subject-empty": [2, "never"],
  },
};
