import { Title, Text } from '@components';

export function Error404() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Title>404</Title>
      <Text>Page not found</Text>
    </div>
  );
}
