import NProgress from "nprogress";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
  minimum: 0.2,
});

export default NProgress;
