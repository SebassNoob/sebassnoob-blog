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
    const importPromise =
      theme === 'dark'
        ? import('highlight.js/styles/github-dark.css?raw')
        : import('highlight.js/styles/github.css?raw');

    const loadCss = async () => {
      try {
        const module = await importPromise;
        const rawStyle = module.default;
        const elem = document.createElement('style');
        elem.innerHTML = rawStyle;
        document.head.appendChild(elem);

        // Cleanup function
        return () => {
          document.head.removeChild(elem);
        };
      } catch (e) {
        console.error(`Failed to load highlight.js ${theme} theme: ${e}`);
      } finally {
        setLoading(false);
      }
    };

    // load the css and return a cleanup function
    const cleanup = loadCss();

    // remove the style tag when the theme changes
    return () => {
      cleanup.then((removeStyle) => removeStyle && removeStyle());
    };
  }, [theme]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader color="aliceblue" />
      </div>
    );
  }

  return (
    <div className="leading-relaxed flex flex-col gap-4">
      <MarkdownRaw
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1(props) {
            return (
              <Title order={1} {...props}>
                {props.children}
              </Title>
            );
          },
          h2(props) {
            return (
              <Title order={2} {...props}>
                {props.children}
              </Title>
            );
          },
          h3(props) {
            return (
              <Title order={3} {...props}>
                {props.children}
              </Title>
            );
          },
          h4(props) {
            return (
              <Title order={4} {...props}>
                {props.children}
              </Title>
            );
          },
          h5(props) {
            return (
              <Title order={5} {...props}>
                {props.children}
              </Title>
            );
          },
          h6(props) {
            return (
              <Title order={6} {...props}>
                {props.children}
              </Title>
            );
          },
          p(props) {
            return <Text {...props}>{props.children}</Text>;
          },
          pre(props) {
            return (
              <pre
                className={twMerge(
                  'overflow-auto bg-slate-200 dark:bg-slate-700 p-2 rounded-md',
                  props.className
                )}
                {...props}
              >
                {props.children}
              </pre>
            );
          },
          a(props) {
            if (!props.href) return <Text>{props.children}</Text>;
            return <Link href={props.href}>{props.children}</Link>;
          },
          code(props) {
            return <Code {...props}>{props.children}</Code>;
          },
          li(props) {
            return (
              <List.ListItem className={props.className} {...props}>
                {props.children}
              </List.ListItem>
            );
          },
          ul(props) {
            return (
              <List.UnorderedList className={props.className} {...props}>
                {props.children}
              </List.UnorderedList>
            );
          },
          ol(props) {
            return (
              <List.OrderedList className={props.className} {...props}>
                {props.children}
              </List.OrderedList>
            );
          },
          table(props) {
            return (
              <Table.Table className={props.className} {...props}>
                {props.children}
              </Table.Table>
            );
          },
          thead(props) {
            return (
              <Table.TableHead className={props.className} {...props}>
                {props.children}
              </Table.TableHead>
            );
          },
          tbody(props) {
            return (
              <Table.TableBody className={props.className} {...props}>
                {props.children}
              </Table.TableBody>
            );
          },
          tr(props) {
            return (
              <Table.TableRow className={props.className} {...props}>
                {props.children}
              </Table.TableRow>
            );
          },
          th(props) {
            return (
              <Table.TableHeader className={props.className} {...props}>
                {props.children}
              </Table.TableHeader>
            );
          },
          td(props) {
            return (
              <Table.TableCell className={props.className} {...props}>
                {props.children}
              </Table.TableCell>
            );
          },
        }}
      >
        {children}
      </MarkdownRaw>
    </div>
  );
}
