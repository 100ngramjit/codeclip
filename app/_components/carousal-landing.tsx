"use client";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselMainContainer,
  SliderMainItem,
} from "@/components/ui/card-carousal";
import AutoScroll from "embla-carousel-auto-scroll";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";

const clips = [
  {
    code: "def fibonacci(n):\n    a, b = 0, 1\n    for _ in range(n):\n        yield a\n        a, b = b, a + b\n\nprint(list(fibonacci(10)))",
    fileName: "fibonacci_generator",
    lang: "python",
    userEmail: "example@email.com",
  },
  {
    code: "const quickSort = (arr) => {\n  if (arr.length <= 1) return arr;\n  const p = arr[arr.length - 1];\n  const left = arr.filter((x, i) => x <= p && i < arr.length - 1);\n  const right = arr.filter(x => x > p);\n  return [...quickSort(left), p, ...quickSort(right)];\n};",
    fileName: "quick_sort",
    lang: "javascript",
    userEmail: "example@email.com",
  },
  {
    code: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}',
    fileName: "hello_world",
    lang: "cpp",
    userEmail: "example@email.com",
  },
  {
    code: "SELECT e.employee_name, d.department_name\nFROM employees e\nJOIN departments d ON e.department_id = d.id\nWHERE e.salary > (\n    SELECT AVG(salary) FROM employees\n);",
    fileName: "employee_query",
    lang: "sql",
    userEmail: "example@email.com",
  },
  {
    code: "public class BinarySearch {\n    public static int binarySearch(int[] arr, int target) {\n        int left = 0, right = arr.length - 1;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            if (arr[mid] == target) return mid;\n            if (arr[mid] < target) left = mid + 1;\n            else right = mid - 1;\n        }\n        return -1;\n    }\n}",
    fileName: "binary_search",
    lang: "java",
    userEmail: "example@email.com",
  },
];
const CarousalLanding = () => {
  return (
    <Carousel
      plugins={[
        AutoScroll({
          speed: 3,
        }),
      ]}
      carouselOptions={{
        loop: true,
      }}
    >
      <CarouselMainContainer className="h-80 w-2/3">
        {clips.map((clip, index) => (
          <SliderMainItem key={index} className="bg-transparent">
            <Card className="p-4 sm:p-4 my-2 min-h-50 rounded-lg w-full">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 overflow-auto">
                <div className="flex justify-start align-top gap-2">
                  <p className="text-sm sm:text-base mb-1 sm:mb-0 break-all">
                    {clip.fileName}
                  </p>
                </div>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  by {clip?.userEmail}
                </p>
              </div>
              <div className="hidden md:flex w-full">
                <SyntaxHighlighter
                  style={nightOwl}
                  showLineNumbers
                  wrapLines
                  customStyle={{
                    fontSize: "0.8rem",
                    width: "100%",
                  }}
                >
                  {clip.code}
                </SyntaxHighlighter>
              </div>
              <div className="md:hidden w-full">
                <SyntaxHighlighter
                  style={nightOwl}
                  showLineNumbers
                  wrapLines
                  customStyle={{
                    fontSize: "0.6rem",
                    width: "100%",
                  }}
                >
                  {clip.code}
                </SyntaxHighlighter>
              </div>
            </Card>
          </SliderMainItem>
        ))}
      </CarouselMainContainer>
    </Carousel>
  );
};

export default CarousalLanding;
