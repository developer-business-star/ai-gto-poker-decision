import { Redirect } from 'expo-router';

export default function AppIndex() {
  // For demo purposes, always start with auth
  // In a real app, you'd check authentication status here
  const isAuthenticated = false;
  
  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }
  
  return <Redirect href="/(auth)" />;
} 