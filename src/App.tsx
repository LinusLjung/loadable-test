import React from 'react';

const Brands = React.lazy(() => import('./pages/Brands'));

function App() {
  return (<>
            <html lang="en" dir="ltr">
            <head>
              <meta charSet="utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <link rel="shortcut icon" href="https://www.na-kd.com/favicons/na-kd/favicon.ico" />
              <script src="/main.js" defer />  
            </head>
            <body>
      <h1>App</h1>
      <Brands />
    </body>
    </html>
    </>);
}

export default App;
