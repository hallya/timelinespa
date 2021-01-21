export function randomBackground() {
  const colors = ['bg-1', 'bg-2', 'bg-3', 'bg-4'];
  return colors[Math.floor(Math.random() * colors.length)];
}
