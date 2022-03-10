import React from 'react';
import loadable from '@loadable/component';

const Brands = loadable(() => import('./pages/Brands'));

function App() {
  return (
    <>
      <h1>App</h1>
      <Brands />
    </>
  );
}

export default App;
