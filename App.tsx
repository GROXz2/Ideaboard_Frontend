import React from 'react';
import { ThemeProvider } from './src/theme/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RootNavigator from './src/navigation/RootNavigator';

const queryClient = new QueryClient();

export default function App() {
  return (
    <ThemeProvider mode="light" palette="indigo">
      <QueryClientProvider client={queryClient}>
        <RootNavigator />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
