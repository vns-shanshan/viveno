import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

import type { Event } from "@/types/event";

type EventCardProps = {
  event: Event;
};

export default function EventCard({ event }: EventCardProps) {
  return (
    <Card className="relative w-full p-0 gap-4 overflow-hidden">
      {/* Image section */}
      <img
        src={event.imageUrl}
        alt="Event cover"
        className="z-20 w-full object-cover h-40"
      />

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 gap-1">
        <CardHeader className="pb-1 px-5">
          <CardTitle>{event.title}</CardTitle>
          <CardDescription>${event.price}</CardDescription>
        </CardHeader>
        <CardFooter className="px-4 pb-4">
          <Button className="w-full bg-secondary font-semibold hover:bg-secondary/80">
            <ShoppingCart className="mr-1" />
            Add To Cart
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
