function groupBy<T, TProp extends string | number | symbol>(
  items: T[],
  selector: (item: T) => TProp
): Map<TProp, T[]> {
  const results: Map<TProp, T[]> = new Map<TProp, T[]>();

  for (const item of items) {
    const key = selector(item);

    if (results.has(key)) {
      results.get(key)!.push(item);
    } else {
      results.set(key, [item]);
    }
  }

  return results;
}

export default groupBy;
