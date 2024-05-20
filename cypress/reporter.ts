import Convert from 'ansi-to-html';
import { readFileSync, readdirSync, writeFileSync } from 'fs';

const convert = new Convert({ fg: '#000', newline: true });

// get all logs in results folder
const files = readdirSync('results');

const parsed = files
  .map((file) => {
    if (!file.endsWith('.log')) return '';
    const input = readFileSync(`results/${file}`, 'utf8');
    const res = convert.toHtml(input);
    return `<h1>${file}</h1><br>${res}`;
  })
  .join('<br>');

writeFileSync('results/index.html', parsed, { flag: 'w+' });
