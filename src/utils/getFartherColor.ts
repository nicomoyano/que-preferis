export function getFartherColor({
  originalColor,
  color1,
  color2,
}: {
  originalColor: string;
  color1: string;
  color2: string;
}) {
  function getColorDistance(colorA: string, colorB: string) {
    const r1 = parseInt(colorA.substring(1, 3), 16);
    const g1 = parseInt(colorA.substring(3, 5), 16);
    const b1 = parseInt(colorA.substring(5, 7), 16);
    const r2 = parseInt(colorB.substring(1, 3), 16);
    const g2 = parseInt(colorB.substring(3, 5), 16);
    const b2 = parseInt(colorB.substring(5, 7), 16);

    const distance = Math.sqrt(
      Math.pow(r2 - r1, 2) + Math.pow(g2 - g1, 2) + Math.pow(b2 - b1, 2)
    );

    return distance;
  }

  const originalDistance1 = getColorDistance(originalColor, color1);
  const originalDistance2 = getColorDistance(originalColor, color2);

  if (originalDistance1 > originalDistance2) {
    return color1;
  } else {
    return color2;
  }
}
