module.exports = {
  branches: "master",
  repositoryUrl: "https://github.com/yudbox/ga-react-static",
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/npm",
    "@semantic-release/github",
  ],
};