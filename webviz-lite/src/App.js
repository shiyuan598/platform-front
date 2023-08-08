import React, { useState } from 'react'

import Info from './Views/Info';
import Eagle from './Views/Eagle';
import EagleBmap from './Views/EagleBmap';
import RouteSwitch from './Views/Route';
import { RouteContext } from './context/RouteContext';

import { View3D } from './View3D/View3D';

export default function App() {

  const [route, setRoute] = useState(null);
  return (
    <>
      <View3D />
      <Info/>
      <RouteContext.Provider value={{ route, setRoute }}>
        {/* <Eagle /> */}
        <EagleBmap />
        <RouteSwitch />
      </RouteContext.Provider>
    </>
  )
}


