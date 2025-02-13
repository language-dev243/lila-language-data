import fs from "fs/promises";
import {jest} from "@jest/globals";
import {readingSourceFile} from "@utils/readingSourceFile";

describe("readingSourceFile", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return an array of words when given a valid JSON file", async () => {
    const mockWords = ["rojo", "grande", "armadillo"];

    const readFileSpy = jest
      .spyOn(fs, "readFile")
      .mockImplementation(() => Promise.resolve(JSON.stringify(mockWords)));

    const result = await readingSourceFile();
    expect(result).toEqual(mockWords);

    readFileSpy.mockRestore();
  });
});
