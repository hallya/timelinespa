export function dateTime(options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat('fr', options);
}

export function extractParts(
  dateTimeParts: Intl.DateTimeFormatPart[],
  requiredParts: Intl.DateTimeFormatPart['type'][]
): Intl.DateTimeFormatPart['value'][] {
  return requiredParts.reduce((parts, partType) => {
    return [
      ...parts,
      dateTimeParts.find((part) => part.type === partType)?.value,
    ];
  }, [] as Intl.DateTimeFormatPart['value'][]);
}
