import EventCard from "@/components/ui/EventCard";
import { useEventStore } from "@/stores/useEventStore";
import { useEffect } from "react";

function HomePage() {
  const { events, loading, getAllEvents } = useEventStore();

  useEffect(() => {
    getAllEvents();
  }, [getAllEvents]);

  return (
    <div className="flex-1 w-full overflow-y-auto p-6 md:mx-12 no-scrollbar ">
      <h1 className="mb-10 text-primary font-semibold text-2xl md:text-3xl md:mt-10 px-6 md:px-1">
        Explore Activities
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        events.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:gap-10 items-stretch md:px-1">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )
      )}
    </div>
  );
}

export default HomePage;
