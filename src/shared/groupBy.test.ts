import groupBy from "./groupBy";

describe("shared/groupBy", () => {
  test("groups by string", () => {
    const items = [
      {
        id: "wat",
        timestamp: "2022-12-22T08:00:00Z",
      },
      {
        id: "wat",
        timestamp: "2022-12-22T04:00:00Z",
      },
      {
        id: "lol",
        timestamp: "2022-12-21T00:00:00Z",
      },
    ];
    const results = groupBy(items, (i) => i.timestamp.substring(0, 10));
    expect(Array.from(results.keys())).toEqual(["2022-12-22", "2022-12-21"]);

    // Also keeps order of items in grouped items.
    expect(results.get("2022-12-22")?.map((x) => x.timestamp)).toEqual([
      "2022-12-22T08:00:00Z",
      "2022-12-22T04:00:00Z",
    ]);
  });
});
