const openAppUri = (defaultUri, androidUri, iosUri, data) => {
  const userAgent = navigator.userAgent;

  if (/android/i.test(userAgent)) {
    const goAndroid = (window.location.href = androidUri.replace('$', data));
    return goAndroid;
  } else if (/iPad|iPhone|iPod/.test(userAgent)) {
    const goIos = (window.location.href = iosUri.replace('$', data));
    return goIos;
  }

  return window.open(defaultUri.replace('$', data));
};

export default openAppUri;
