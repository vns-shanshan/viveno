import { Book } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full justify-center items-center m-12 gap-8">
      <div className="flex flex-col gap-2 justify-center items-center md:gap-4">
        <Book className="size-8 text-secondary" />
        <h1 className="text-4xl font-semibold  md:text-5xl">About</h1>
        <p className="text-sm text-muted-foreground md:text-base">
          Discover, register, and attend events with ease
        </p>
      </div>
      <hr className="w-full border-secondary" />
      <div className="flex flex-col gap-2 text-base text-center md:text-lg">
        <p>
          Viveno is an event app that helps you discover events you care about
          and attend them with ease.
        </p>
        <p>
          Browse available events, choose your favorites, and complete your
          registration through a smooth and secure checkout experience.
        </p>
      </div>
    </div>
  );
}
