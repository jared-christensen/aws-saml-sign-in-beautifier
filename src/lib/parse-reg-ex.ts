export function parseRegEx(regexString) {
  if (!regexString) {
    return new RegExp("")
  }
  const match = regexString.match(/\/(.*)\/([gimuy]*)/)
  return new RegExp(match[1], match[2])
}
