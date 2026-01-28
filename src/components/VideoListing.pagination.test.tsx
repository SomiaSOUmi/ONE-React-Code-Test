import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VideoListing from "./VideoListing";
import type { Video } from "../types";

function makeVideos(count: number): Video[] {
  return Array.from({ length: count }, (_, i) => {
    const n = i + 1;
    return {
      id: `id-${n}`,
      title: `Video ${n}`,
      description: `Description ${n}`,
      publishedAt: new Date(2024, 0, n).toISOString(),
      thumbnailUrl: "",
      url: `https://www.youtube.com/watch?v=id-${n}`,
    };
  });
}

test("paginates more than 9 videos into 2 pages. First page has9 cards", async () => {
  const user = userEvent.setup();
  const fetcher = async () => makeVideos(18);

  render(<VideoListing fetcher={fetcher as any} pageSize={9} />);

  const list = await screen.findByRole("list", { name: /video cards/i });
  expect(within(list).getAllByRole("listitem")).toHaveLength(9);
  expect(screen.getByRole("button", { name: "1" })).toHaveAttribute("aria-current", "page");

  await user.click(screen.getByRole("button", { name: /next page/i }));

  expect(screen.getByRole("button", { name: "2" })).toHaveAttribute("aria-current", "page");
});
