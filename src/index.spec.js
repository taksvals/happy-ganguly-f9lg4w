const check1 = () => {
  const arr = [
    ["foo", 1],
    ["bar", 3],
    ["blah", 4],
  ];

  // YOUR CODE HERE
  const res = {};

  arr.forEach((item) => {
    res[item[0]] = item[1];
  });

  return res;
};

test("Check1 should pass", () => {
  expect(check1()).toStrictEqual({
    foo: 1,
    bar: 3,
    blah: 4,
  });
});

const check2 = () => {
  const arr = [1, 2, 3, 4, 5, 6];
  // YOUR CODE HERE
  [a, b, ...c] = arr;

  return { a, b, c };
};

test("Check2 should pass", () => {
  const { a, b, c } = check2() || {};
  expect(a).toBe(1);
  expect(b).toBe(2);
  expect(c).toStrictEqual([3, 4, 5, 6]);
});

const requestEmulation = (seconds) => {
  // make emulation of ajax request that takes provided seconds
  // YOUR CODE HERE
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

const check3 = async () => {
  const start = performance.now();
  await requestEmulation(2); // 2 sec
  await requestEmulation(1); // 1 sec
  const end = performance.now();
  return Math.round((end - start) / 1000);
};

test("How long it should take", async () => {
  const time = await check3();
  expect(time).toBe(3);
});

const checkConcurrency = async () => {
  const start = performance.now();
  // OPTIMIZE BETWEEN
  await Promise.all([requestEmulation(2), requestEmulation(1)]);
  // END OPTIMIZE BETWEEN
  const end = performance.now();
  return Math.round((end - start) / 1000);
};

test("Make it works for 2 seconds", async () => {
  const time = await checkConcurrency();
  expect(time).toBe(2);
});

const normalizeTask = () => {
  const inputData = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 4, name: "Item 4" },
    { id: 7, name: "Item 7" },
  ];
  // YOUR CODE HERE

  const res = { entities: {}, byId: [] };

  inputData.forEach((item) => {
    res.entities[item.id] = item;
    res.byId.push(item.id);
  });

  return res;
};

test("Should have correct normalisation", () => {
  expect(normalizeTask()).toStrictEqual({
    entities: {
      1: { id: 1, name: "Item 1" },
      2: { id: 2, name: "Item 2" },
      4: { id: 4, name: "Item 4" },
      7: { id: 7, name: "Item 7" },
    },
    byId: [1, 2, 4, 7],
  });
});

const flattenAndUniqTask = (data) => {
  // YOUR CODE HERE

  return data.reduce((res, current) => {
    if (Array.isArray(current)) {
      const q1 = flattenAndUniqTask(current);

      res = [...new Set([...res, ...q1])];

      return res;
    } else {
      !res.includes(current) && res.push(current);
      return res;
    }
  }, []);
};

test("Should be successfuly flattenAndUniq", () => {
  expect(flattenAndUniqTask([[[1, 2, 3]], 3, [3, 4, 5]])).toStrictEqual([
    1, 2, 3, 4, 5,
  ]);
});
