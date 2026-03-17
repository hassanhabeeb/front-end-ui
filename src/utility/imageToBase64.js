export default function imageToBase64(urlOrImage, param) {
  if (!('fetch' in window && 'Promise' in window)) {
    return Promise.reject('[*] image-to-base64 is not compatible with your browser.');
  }

  return fetch(urlOrImage, param || {})
    .then(res => res.arrayBuffer())
    .then(buffer =>
      window.btoa(
        [].slice
          .call(new Uint8Array(buffer))
          .map(bin => String.fromCharCode(bin))
          .join('')
      )
    );
}
