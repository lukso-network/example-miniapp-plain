import { render } from "@testing-library/react";
import Hangman from "../Hangman";

test("renders no body parts when numGuesses is 0", () => {
  const { container } = render(<Hangman numGuesses={0} />);
  const bodyParts = container.querySelectorAll(".w-12, .w-1");
  expect(bodyParts).toHaveLength(0);
});

test("renders only the head when numGuesses is 1", () => {
  const { container } = render(<Hangman numGuesses={1} />);
  const head = container.querySelectorAll(".w-12");
  expect(head).toHaveLength(1);
});

test("renders head, body, and arms when numGuesses is 4", () => {
  const { container } = render(<Hangman numGuesses={4} />);
  const bodyParts = container.querySelectorAll(".w-12, .w-1");
  expect(bodyParts).toHaveLength(4);
});

test("renders all body parts when numGuesses is 6", () => {
  const { container } = render(<Hangman numGuesses={6} />);
  const bodyParts = container.querySelectorAll(".w-12, .w-1");
  expect(bodyParts).toHaveLength(6);
});
