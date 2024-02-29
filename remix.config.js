/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: [
    "**/.*", // Ignore all files with any file extension
    "**/*.test.{js,jsx,ts,tsx}", // Ignore test files
    "**/*.css", // Ignore CSS files
  ],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
  tailwind: true,
  postcss: true,
};
