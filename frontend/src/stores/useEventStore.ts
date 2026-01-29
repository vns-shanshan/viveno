import { create } from "zustand";

import { authedAxios } from "@/lib/axios/axios.authed";
import type { Event } from "@/types/event";

type EventState = {
  events: Event[];
  loading: boolean;

  getAllEvents: () => Promise<void>;
};

export const useEventStore = create<EventState>((set) => ({
  events: [],
  loading: false,

  getAllEvents: async () => {
    set({ loading: true });

    try {
      const res = await authedAxios.get("/events");

      set({ events: res.data.events, loading: false });
    } catch {
      set({ loading: false });
    }
  },
}));
