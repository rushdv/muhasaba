self.__BUILD_MANIFEST = {
  "/": [
    "static/chunks/pages/index.js"
  ],
  "/day/[id]": [
    "static/chunks/pages/day/[id].js"
  ],
  "__rewrites": {
    "afterFiles": [],
    "beforeFiles": [],
    "fallback": []
  },
  "sortedPages": [
    "/",
    "/_app",
    "/_error",
    "/api/hello",
    "/day/[id]"
  ]
};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()