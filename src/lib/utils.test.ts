import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn()", () => {
  it("joins simple class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("drops falsy values", () => {
    const off = false as boolean;
    expect(cn("foo", off && "hidden", null, undefined, "", "bar")).toBe("foo bar");
  });

  it("resolves conflicting tailwind classes in favor of the last one", () => {
    // tailwind-merge: later wins for same utility.
    expect(cn("p-2", "p-4")).toBe("p-4");
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("merges conditional class maps", () => {
    expect(cn("base", { active: true, disabled: false })).toBe("base active");
  });

  it("flattens arrays", () => {
    expect(cn(["a", "b"], ["c"])).toBe("a b c");
  });
});
