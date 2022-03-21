import React from 'react';

const Acomponent = React.lazy(() =>import('./ComponentA'));
const Bcomponent = React.lazy(() =>import('./ComponentB'));

function Brands() {
  return (<>
  <h2>Brands</h2>
  <Acomponent/>
  <Bcomponent/>
  </>);
}

export default Brands;