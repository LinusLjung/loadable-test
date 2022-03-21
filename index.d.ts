/// <reference path="./node_modules/@types/react-dom/server.d.ts" />

type RenderToPipeableStreamOptions = {
  bootstrapScripts?: string[];
  onShellReady?: () => void;
  onCompleteShell?: () => void;
  onError?: (e: Error) => void;
};

declare namespace ReactDOMServer {
  export function renderToPipeableStream(
    jsx: React.ReactElement,
    options: RenderToPipeableStreamOptions,
  ): NodeJS.ReadableStream;
}
