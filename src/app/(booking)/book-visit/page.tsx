import BookVisitClient from "@/components/Book-visit/BookVisitClient";

// Enable ISR - revalidate every 1800 seconds (30 minutes)
export const revalidate = 1800;

export default function BookVisit() {
  return <BookVisitClient />;
}
