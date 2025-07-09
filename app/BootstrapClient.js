// BootstrapClient.js
'use client';
import { useEffect, useState } from 'react';

export default function BootstrapClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return null;
}