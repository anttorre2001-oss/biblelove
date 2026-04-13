import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import {
  scriptureCacheKey,
  readCachedScripture,
  writeCachedScripture,
  clearScriptureCache,
} from "./scriptureCache";

interface FakeScripture {
  reference: string;
  text: string;
  verses: Array<{ verse: number; text: string }>;
}

const sample: FakeScripture = {
  reference: "John 3:16",
  text: "For God so loved the world...",
  verses: [{ verse: 16, text: "For God so loved the world..." }],
};

describe("scriptureCache", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("builds a stable cache key from reference + translation", () => {
    expect(scriptureCacheKey("John 3:16", "web")).toBe("John 3:16|web");
  });

  it("round-trips scripture data through localStorage", () => {
    const key = scriptureCacheKey("John 3:16", "web");
    writeCachedScripture(key, sample);
    const got = readCachedScripture<FakeScripture>(key);
    expect(got).toEqual(sample);
  });

  it("returns null for missing keys", () => {
    expect(readCachedScripture("nothing|here")).toBeNull();
  });

  it("returns null for corrupted JSON", () => {
    localStorage.setItem("scripture-cache:garbage|web", "{not json");
    expect(readCachedScripture("garbage|web")).toBeNull();
  });

  it("returns null for payloads missing the data field", () => {
    localStorage.setItem(
      "scripture-cache:weird|web",
      JSON.stringify({ fetchedAt: 1 })
    );
    expect(readCachedScripture("weird|web")).toBeNull();
  });

  it("swallows QuotaExceededError on write", () => {
    const spy = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("QuotaExceededError");
    });
    expect(() =>
      writeCachedScripture("x|y", { big: "data" })
    ).not.toThrow();
    expect(spy).toHaveBeenCalled();
  });

  it("clearScriptureCache removes only scripture-cache entries", () => {
    writeCachedScripture("a|web", sample);
    writeCachedScripture("b|web", sample);
    localStorage.setItem("other-key", "keep me");

    clearScriptureCache();

    expect(readCachedScripture("a|web")).toBeNull();
    expect(readCachedScripture("b|web")).toBeNull();
    expect(localStorage.getItem("other-key")).toBe("keep me");
  });
});
