// https://github.com/streamich/git-cz
// It needs to be in CommonJS
module.exports = {
  disableEmoji: true,
  format: "{type}: {emoji}{subject}",
  list: [
    "add",
    "update",
    "publish",
    "unpublish",
    "delete",
    "fix",
    "chore",
    "docs",
  ],
  maxMessageLength: 64,
  minMessageLength: 3,
  questions: [
    "type",
    "scope",
    "subject",
    "body",
    "breaking",
    "issues",
    "lerna",
  ],
  // scopes: ["GitHub Actions", "Git hooks", "config", ""],
  types: {
    add: {
      description: "新規記事の追加",
      value: "add",
    },
    update: {
      description: "記事の追記や更新",
      value: "update",
    },
    publish: {
      description: "記事の公開",
      value: "publish",
    },
    unpublish: {
      description: "記事の非公開",
      value: "unpublish",
    },
    delete: {
      description: "記事の削除",
      value: "delete",
    },
    fix: {
      description: "記事の誤字・脱字の修正",
      value: "fix",
    },
    chore: {
      description: "CI/CDの変更やパッケージのアップデートなど",
      value: "chore",
    },
    fix: {
      description: "不具合の修正",
      value: "fix",
    },
    docs: {
      description: "ドキュメントの更新",
      value: "docs",
    },
  },
  messages: {
    type: "Select the type of change that you're committing:",
    subject: "Write a short, imperative mood description of the change:\n",
    body: "Provide a longer description of the change:\n ",
    breaking: "List any breaking changes:\n",
    issues: "Issues this commit closes, e.g #123:",
  },
};
