const openAppUri = (defaultUri, androidUri, iosUri, data) => {
  const userAgent = navigator.userAgent;

  if (/android/i.test(userAgent)) {
    const uri =
      iosUri.replace('$', data).includes('https://') ||
      iosUri.replace('$', data).includes('http://') ||
      iosUri !== '$'
        ? window.open(iosUri.replace('$', data), '_blank')
        : window.open('https://' + iosUri.replace('$', data), '_blank');

    return uri;
  } else if (/iPad|iPhone|iPod/.test(userAgent)) {
    const uri =
      iosUri.replace('$', data).includes('https://') ||
      iosUri.replace('$', data).includes('http://') ||
      iosUri !== '$'
        ? window.open(iosUri.replace('$', data), '_blank')
        : window.open('https://' + iosUri.replace('$', data), '_blank');

    return uri;
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
