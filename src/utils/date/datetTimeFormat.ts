export function dateTime(options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat('fr', options);
}

export function extractParts(
  dateTimeParts: Intl.DateTimeFormatPart[],
  requiredParts: Intl.DateTimeFormatPart['type'][]
): Intl.DateTimeFormatPart['value'][] {
  const defaultParts: Intl.DateTimeFormatPart['value'][] = [];
  return requiredParts.reduce((parts, partType) => {
    const partValue = dateTimeParts.find((part) => part.type === partType)?.value;
    return partValue ? [
      ...parts,
      partValue,
    ] : parts;
  }, defaultParts);
}
