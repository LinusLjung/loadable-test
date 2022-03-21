/// <reference path="../../index.d.ts" />
import React, {StrictMode} from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../App';
import { ChunkExtractor } from '@loadable/server';
import path from 'path';
import { Handler } from 'express';

const render : () => Handler = () => (req, res) => {
  // const extractor = new ChunkExtractor({ statsFile: path.resolve(__dirname, 'loadable-stats.json') });
  res.socket?.on('error', (error) => {
    // Log fatal errors
    console.error('Fatal', error);
  });

  
  const { pipe, abort } = ReactDOMServer.renderToPipeableStream(
    <StrictMode>
        <App />
    </StrictMode>,
    {
      bootstrapScripts: [
        '/main.js'
      ],
      onShellReady() {
        // If something errored before we started streaming, we set the error code appropriately.
        res.status(200);
        res.setHeader('Content-type', 'text/html');
        
        // We will send main shell like html>head+body before react starts to stream
        // to allow adding styles and scripts to the existed dom

        /**
         * onCompleteAll will be used for search bots only in the future
         * They can not execute any JS, so, there is no any reason to send
         * dehydrated data and critical css (which is in a JS wrapper)
         */
        pipe(res)
           

        // stream.once('finish', () => {
        //   if (renderTimeoutId) {
        //     clearTimeout(renderTimeoutId);
        //   }

        //   /**
        //    * Actually, it is not necessary to call res.end manually,
        //    * cause React does this by itself
        //    *
        //    * But, if we have any wrapper on res, we can not be sure,
        //    * that wrapper implements all needed methods (especially _final)
        //    * So, the `end` method will be called manually, if writable has not been ended yet.
        //    */
        //   if (!res.writableEnded) {
        //     res.end();
        //   }
        // });
      },
      onError(e) {
        console.error(e);
      },
    },
  );

  setTimeout(() => {
    abort();
  }, 10000);
}

export default render;
