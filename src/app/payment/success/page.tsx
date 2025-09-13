import { Suspense } from 'react';
import PaymentResultClient from './PaymentResultClient';

export default function PaymentSuccess() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentResultClient />
    </Suspense>
  );
}
