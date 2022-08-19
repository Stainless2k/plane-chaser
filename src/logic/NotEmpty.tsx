export function notEmpty<TValue>(value: TValue): value is NonNullable<TValue> {
  return value !== null && value !== undefined;
}
