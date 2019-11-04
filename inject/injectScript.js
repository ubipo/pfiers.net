export default function injectScript(src) {
  const script = document.createElement('script');
  script.src = src;
  const head = document.getElementsByTagName("head")[0];
  head.appendChild(script);
}