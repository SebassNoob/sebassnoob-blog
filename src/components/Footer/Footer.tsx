import { Text } from '@components';

export function Footer() {
  return (
    <footer>
      <div className="flex justify-center items-center p-6">
        <Text className="text-slate-600 dark:text-slate-300">
          Made with ❤️ © SebassNoob {new Date().getFullYear()}
        </Text>
      </div>
    </footer>
  );
}
