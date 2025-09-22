import NewsClient from './NewsClient';

// Enable ISR - revalidate every 300 seconds (5 minutes)
export const revalidate = 300;

export default function News() {
  return <NewsClient />;
}
