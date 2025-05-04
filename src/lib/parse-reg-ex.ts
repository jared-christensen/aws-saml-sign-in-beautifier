// Parses a string representation of a regular expression and returns a RegExp object.
export function parseRegEx(regexString?: string) {
  if (!regexString) {
    return undefined;
  }

  const match = regexString.match(/\/(.*)\/([gimuy]*)/);
  if (match && match[1] !== undefined && match[2] !== undefined) {
    return new RegExp(match[1], match[2]);
  }

  return undefined;
}
