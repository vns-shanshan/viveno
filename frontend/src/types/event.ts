export type Event = {
  id: string;
  title: string;
  price: number | null;
  description: string;
  imageUrl: string;
  startTime: string;
  locationName: string;
  latitude?: number | null;
  longitude?: number | null;
};
