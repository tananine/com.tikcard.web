const openAppUri = (defaultUri, androidUri, iosUri, data) => {
  const userAgent = navigator.userAgent;

  if (/android/i.test(userAgent)) {
    if (androidUri !== '$') {
      return window.open(androidUri.replace('$', data), '_self');
    }
    const uri =
      androidUri.replace('$', data).includes('https://') ||
      androidUri.replace('$', data).includes('http://')
        ? window.open(androidUri.replace('$', data), '_blank')
        : window.open('https://' + androidUri.replace('$', data), '_blank');

    return uri;
  } else if (/iPad|iPhone|iPod/.test(userAgent)) {
    if (iosUri !== '$') {
      return window.open(iosUri.replace('$', data), '_self');
    }
    const uri =
      iosUri.replace('$', data).includes('https://') ||
      iosUri.replace('$', data).includes('http://') ||
      iosUri !== '$'
        ? window.open(iosUri.replace('$', data), '_blank')
        : window.open('https://' + iosUri.replace('$', data), '_blank');

    return uri;
  }

  if (defaultUri !== '$') {
    return window.open(defaultUri.replace('$', data), '_self');
  }
  const uri =
    defaultUri.replace('$', data).includes('https://') ||
    defaultUri.replace('$', data).includes('http://') ||
    iosUri !== '$'
      ? window.open(defaultUri.replace('$', data), '_blank')
      : window.open('https://' + defaultUri.replace('$', data), '_blank');

  return uri;
};

export default openAppUri;
