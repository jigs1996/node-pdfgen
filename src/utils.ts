/**
 * Checks if a string is a valid URL.
 *
 * @param url The URL to validate.
 * @returns True if the URL is valid; false otherwise.
 */
export function isValidURL(url: string): boolean {
  // Handle localhost and IP addresses without protocol
  if (
    url === 'localhost' ||
    /^127\.0\.0\.1$/.test(url) ||
    /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      url,
    )
  ) {
    url = 'http://' + url
  }

  try {
    const checkUrl: URL = new URL(url)
    return ['http:', 'https:', 'file:'].includes(checkUrl.protocol)
  } catch {
    return false
  }
}
