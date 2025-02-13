import fs from "fs/promises";
import {jest} from "@jest/globals";
import {readingSourceFile} from "@utils/readingSourceFile";

describe("readingSourceFile", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return an array of words when given a valid json file", async () => {
    const mockWords = ["rojo", "grande", "armadillo"];

    const readFileSpy = jest
      .spyOn(fs, "readFile")
      .mockImplementation(() => Promise.resolve(JSON.stringify(mockWords)));

    const result = await readingSourceFile();
    expect(result).toEqual(mockWords);

    readFileSpy.mockRestore();
  });

  it("should return an empty array when json file is empty", async () => {
    jest.spyOn(fs, "readFile").mockResolvedValue("[]");

    const result = await readingSourceFile();
    expect(result).toEqual([]);
  });

  it("should throw an error if the file does not exist", async () => {
    jest.spyOn(fs, "readFile").mockRejectedValue(new Error("file not found"));

    await expect(readingSourceFile()).rejects.toThrow("file not found");
  });

  it("should throw an error if the json file is invalid", async () => {
    jest.spyOn(fs, "readFile").mockResolvedValue("invalid json");

    await expect(readingSourceFile()).rejects.toThrow();
  });
});
