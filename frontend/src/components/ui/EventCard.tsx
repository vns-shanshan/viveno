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
    <Card className="relative w-full pt-0 overflow-hidden">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src={event.imageUrl}
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover   dark:brightness-40"
      />
      <CardHeader>
        <CardTitle>{event.title}</CardTitle>
        <CardDescription>${event.price}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full bg-secondary font-semibold">
          <ShoppingCart className="mr-1" />
          Add To Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
