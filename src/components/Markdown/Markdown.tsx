import { default as MarkdownRaw } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import type { MarkdownProps } from './types';
import { Title, Text, Link, Code, List, Table, Loader } from '@components';
import { twMerge } from 'tailwind-merge';
import { useContext, useState, useEffect } from 'react';
import { ClientContext } from '@providers';

export function Markdown({ children }: MarkdownProps) {
  const { theme } = useContext(ClientContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (theme === 'dark') {
      import('highlight.js/styles/github-dark.css')
        .then(() => setLoading(false))
        .catch(() => {
          setLoading(false);
          console.error('Failed to load highlight.js dark theme');
        });
    } else {
      import('highlight.js/styles/github.css')
        .then(() => setLoading(false))
        .catch(() => {
          setLoading(false);
          console.error('Failed to load highlight.js light theme');
        });
    }
  }, [theme]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader color="aliceblue" />
      </div>
    );
  }

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
        pre(props) {
          return (
            <pre
              className={twMerge(
                'overflow-auto bg-slate-200 dark:bg-slate-700 p-2 rounded-md',
                props.className
              )}
            >
              {props.children}
            </pre>
          );
        },
        a(props) {
          return <Link href={props.href as string}>{props.children}</Link>;
        },
        code(props) {
          return (
            <Code className={twMerge(props.className, '!bg-transparent')}>
              {props.children}
            </Code>
          );
        },
        li(props) {
          return (
            <List.ListItem className={props.className}>
              {props.children}
            </List.ListItem>
          );
        },
        ul(props) {
          return (
            <List.UnorderedList className={props.className}>
              {props.children}
            </List.UnorderedList>
          );
        },
        ol(props) {
          return (
            <List.OrderedList className={props.className}>
              {props.children}
            </List.OrderedList>
          );
        },
        table(props) {
          return (
            <Table.Table className={props.className}>
              {props.children}
            </Table.Table>
          );
        },
        thead(props) {
          return (
            <Table.TableHead className={props.className}>
              {props.children}
            </Table.TableHead>
          );
        },
        tbody(props) {
          return (
            <Table.TableBody className={props.className}>
              {props.children}
            </Table.TableBody>
          );
        },
        tr(props) {
          return (
            <Table.TableRow className={props.className}>
              {props.children}
            </Table.TableRow>
          );
        },
        th(props) {
          return (
            <Table.TableHeader className={props.className}>
              {props.children}
            </Table.TableHeader>
          );
        },
        td(props) {
          return (
            <Table.TableCell className={props.className}>
              {props.children}
            </Table.TableCell>
          );
        },
      }}
    >
      {children}
    </MarkdownRaw>
  );
}
