const BASE_IMAGE_URL = 'http://localhost:8080/imgproxy/insecure';

export function getImageUrl({ rt = 'fill', width = 480, height = 320, src = 'fallback.jpeg' }) {
  return `${BASE_IMAGE_URL}/rs:${rt}:${width}:${height}/plain/local:///images/${src}`;
}