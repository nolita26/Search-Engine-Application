import * as fs from "fs";
import { MessageSearch } from "../MessageSearch";
import { Messages } from "../types";

const DATA_PATH = "./app/reviews.json"

const loadTestData = (path: string): Messages => {
  const rawData: Record<string, { message: string }> = JSON.parse(
    fs.readFileSync(path, "utf8")
  );

  const records: Messages = {};
  Object.keys(rawData).forEach((key) => {
    records[key] = {
      message: rawData[key].message
    }
  });
  return records;
};

test("Load the JSON sample data", () => {
  const data = loadTestData(DATA_PATH);
  expect(data).not.toBeNull();
  expect(Object.keys(data).length).toBeGreaterThan(900);
});

test("find standard substrings inside of the messages", () => {
  const data = loadTestData(DATA_PATH);
  const search = MessageSearch.getInstance();
  search.load(data);
  search.prepare();

  expect(search.query("Zortech").sort()).toEqual(["278406"].sort());
  expect(search.query("").length).toEqual(Object.keys(data).length);
  expect(search.query("command").sort()).toEqual(["259639", "263215", "266734"].sort());
  expect(search.query("incredible").sort()).toEqual(["251084", "251811", "255289", "258773", "263054", "271136", "271876", "272136", "278157", "278603"].sort());
  expect(search.query("ux").sort()).toEqual(["274722"].sort());
  expect(search.query("UX").sort()).toEqual(["258229", "267930", "271942"].sort());
  expect(search.query("CODE").sort()).toEqual(["272018", "272153"].sort());
});

test("benchmark time", () => {
  const data = loadTestData(DATA_PATH);
  const search = MessageSearch.getInstance();
  search.load(data);
  search.prepare();

  const start = Date.now();
  for (let i = 0; i < 10000; i++) {
    const languages = ["python", "java", "javascript", "go", "ruby"];
    for (const lang of languages) {
      search.query(lang);
    }
  }
  const end = Date.now();
  console.log("Time elapsed: " + (end - start) + "ms");
});