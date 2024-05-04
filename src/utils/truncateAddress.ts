
export default function truncateAddress(
  address: string,
  numCharsKept = 4
): string {
  if (address.length <= 2 * numCharsKept) {
    return address; // Address is too short, return it as is
  }
  return `${address.slice(0, numCharsKept)}...${address.slice(-numCharsKept)}`;
}
