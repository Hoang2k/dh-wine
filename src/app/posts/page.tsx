import TeammatesClient from './TeammatesClient';

// Enable ISR - revalidate every 300 seconds (5 minutes)
export const revalidate = 300;

export default function TeammatesPage() {
  return <TeammatesClient />;
}
