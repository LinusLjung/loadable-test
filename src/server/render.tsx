import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../App';
import { ChunkExtractor } from '@loadable/server';
import path from 'path';

function render() {
  const extractor = new ChunkExtractor({ statsFile: path.resolve(__dirname, 'loadable-stats.json') });

  const markup = ReactDOMServer.renderToString(extractor.collectChunks(<App />));

  console.log('extractor.getScriptTags()', extractor.getScriptTags());

  return markup;
}

export default render;
