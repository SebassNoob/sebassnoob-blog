import { Title, Button, Text, Card } from '@components';
import { useContext } from 'react';
import { ClientContext } from '@providers';

export function App() {
  const { theme, setTheme, breakpoint, isMobile } = useContext(ClientContext);

  return (
    <div className={`App ${theme} ${breakpoint}`}>
      <Title>App</Title>
      <Text>Theme: {theme}</Text>
      <Text>Breakpoint: {breakpoint}</Text>
      <Text>isMobile: {isMobile.toString()}</Text>
      <Button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        loading={false}
        color="success"
      >
        Toggle Theme
      </Button>
      <Card
        title="Card Title"
        description="Card Description"
        imgSrc="/assets/vite.svg"
      ></Card>
    </div>
  );
}
