import { Text } from '@components';

export function Footer() {
  return (
    <Text className="text-center p-6 text-slate-600 dark:text-slate-300">
      Made with ❤️ © SebassNoob 2024 - {new Date().getFullYear()}
    </Text>
  );
}
