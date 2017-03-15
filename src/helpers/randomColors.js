/**
 * Created by orsahar on 10/30/16.
 */
export function getRandomColor() {
  const listOfColors = [
    '#4C2993',
    '#3669B6',
    '#0DA89B',
    '#FFCD00',
    '#756F6A',
    '#EE9802',
    '#C52633'];
  return listOfColors[Math.floor(Math.random() * listOfColors.length)];
}
