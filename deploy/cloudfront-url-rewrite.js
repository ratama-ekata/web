// CloudFront Function (viewer-request, runtime cloudfront-js-2.0)
// S3 REST origin (used with OAC) does not serve index.html for folder URLs,
// so /en/ and /en are rewritten to /en/index.html.
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  if (uri.endsWith("/")) {
    request.uri = uri + "index.html";
  } else if (!uri.split("/").pop().includes(".")) {
    request.uri = uri + "/index.html";
  }

  return request;
}
