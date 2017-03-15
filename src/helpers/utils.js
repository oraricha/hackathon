export function stripHtmlTags(html) {
  const str = html || '';
  return str.replace(/(<([^>]+)>)/ig, '');
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
