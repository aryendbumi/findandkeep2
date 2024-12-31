import { useMemo } from "react";

type BookedSlot = {
  start: string;
  end: string;
};

export function useAvailableSlots(date?: Date, bookedSlots: BookedSlot[] = []) {
  return useMemo(() => {
    if (!date) return [];

    // Create time slots from 07:00 to 21:00
    const slots: { start: string; end: string; duration: string }[] = [];
    let currentHour = 7;

    while (currentHour < 21) {
      const start = `${currentHour.toString().padStart(2, '0')}:00`;
      const end = `${(currentHour + 1).toString().padStart(2, '0')}:00`;
      
      // Check if the slot overlaps with any booked slots
      const isAvailable = !bookedSlots.some(bookedSlot => {
        return (
          (bookedSlot.start <= start && bookedSlot.end > start) ||
          (bookedSlot.start < end && bookedSlot.end >= end) ||
          (start <= bookedSlot.start && end >= bookedSlot.end)
        );
      });

      if (isAvailable) {
        slots.push({
          start,
          end,
          duration: "1 hour"
        });
      }

      currentHour++;
    }

    return slots;
  }, [date, bookedSlots]);
}