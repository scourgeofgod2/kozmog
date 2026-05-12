import { cn } from "./utils";

describe("cn utility", () => {
  it("should merge class names correctly", () => {
    const result = cn("text-red-500", "text-blue-500");
    expect(result).toBe("text-blue-500");
  });

  it("should handle conditional classes", () => {
    const result = cn("base-class", true && "conditional-class", false && "hidden-class");
    expect(result).toBe("base-class conditional-class");
  });

  it("should merge tailwind classes without conflicts", () => {
    const result = cn("px-2 py-1", "px-4");
    expect(result).toBe("py-1 px-4");
  });
});
