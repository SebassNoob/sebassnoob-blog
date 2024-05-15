import { default as MarkdownRaw } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import type { MarkdownProps } from './types';
import { Title, Text, Link } from '@components';

export function Markdown({ children }: MarkdownProps) {
  return (
    <MarkdownRaw
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={{
        h1(props) {
          return <Title order={1}>{props.children}</Title>;
        },
        h2(props) {
          return <Title order={2}>{props.children}</Title>;
        },
        h3(props) {
          return <Title order={3}>{props.children}</Title>;
        },
        h4(props) {
          return <Title order={4}>{props.children}</Title>;
        },
        h5(props) {
          return <Title order={5}>{props.children}</Title>;
        },
        h6(props) {
          return <Title order={6}>{props.children}</Title>;
        },
        p(props) {
          return <Text>{props.children}</Text>;
        },
        a(props) {
          return <Link href={props.href as string}>{props.children}</Link>;
        },
      }}
    >
      {children}
    </MarkdownRaw>
  );
}
