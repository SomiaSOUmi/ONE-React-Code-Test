import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VideoListing from "./VideoListing";
import type { Video } from "../types";

const makeVideos = (): Video[] => [
  {
    id: "a",
    title: "React Testing Basics",
    description: "Intro to RTL",
    publishedAt: new Date("2024-01-01").toISOString(),
    thumbnailUrl: "",
    url: "https://www.youtube.com/watch?v=a",
  },
  {
    id: "b",
    title: "TypeScript Tips",
    description: "Utility types",
    publishedAt: new Date("2024-01-02").toISOString(),
    thumbnailUrl: "",
    url: "https://www.youtube.com/watch?v=b",
  },
  {
    id: "c",
    title: "React Hooks Deep Dive",
    description: "useEffect and more",
    publishedAt: new Date("2024-01-03").toISOString(),
    thumbnailUrl: "",
    url: "https://www.youtube.com/watch?v=c",
  },
];

test("filters videos by keyword (title/description)", async () => {
  const user = userEvent.setup();
  const fetcher = async () => makeVideos();

  render(<VideoListing fetcher={fetcher as any} pageSize={9} />);

  const list = await screen.findByRole("list", { name: /video cards/i });
  expect(within(list).getAllByRole("listitem")).toHaveLength(3);

  const input = screen.getByRole("textbox", { name: /filter videos by keyword/i });
  await user.type(input, "TypeScript");

  const listAfter = screen.getByRole("list", { name: /video cards/i });
  expect(within(listAfter).getAllByRole("listitem")).toHaveLength(1);

  const videoLink = within(listAfter).getByRole("listitem", {
    name: /open video: typescript tips/i,
  });
  expect(videoLink).toHaveAttribute("href", "https://www.youtube.com/watch?v=b");
});
