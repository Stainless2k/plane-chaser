import '../styles/globals.css';
import type { AppType } from 'next/dist/shared/lib/utils';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const MyApp: AppType = ({ Component, pageProps }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
};

export default MyApp;
