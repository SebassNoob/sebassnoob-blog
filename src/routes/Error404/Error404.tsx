import { Title, Text } from '@components';
import { useNavigate } from 'react-router-dom';
import { useKeybinds } from '@hooks';

export function Error404() {
  const navigate = useNavigate();
  useKeybinds({
    Escape: () => navigate('/'),
  });
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <Title>404 Not Found</Title>
      <Text>
        This page could not be located. Perhaps it got lost? Regardless,
        nothing's here now.
      </Text>
    </div>
  );
}
