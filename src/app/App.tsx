import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';

import { ToastProvider } from '@features/ToastContext';
import { queryClient } from '@shared/api';
import { WidthProvider } from '@shared/helpers';

import { router } from './router';

function App() {
  return (
    <WidthProvider>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </QueryClientProvider>
    </WidthProvider>
  );
}

export default App;
