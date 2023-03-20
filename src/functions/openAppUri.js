exports.openAppUri = (defaultUri, androidUri, iosUri, url) => {
  const userAgent = navigator.userAgent;

  if (/android/i.test(userAgent)) {
    const goAndroid = (window.location.href = androidUri.replace('$', url));
    return goAndroid;
  } else if (/iPad|iPhone|iPod/.test(userAgent)) {
    const goIos = (window.location.href = iosUri.replace('$', url));
    return goIos;
  }

  return window.open(defaultUri.replace('$', url));
};
