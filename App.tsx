import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Narthex } from './screens/Narthex';
import { LiveWord } from './screens/LiveWord';
import { RosterGrid } from './screens/RosterGrid';
import { ChoirLoft } from './screens/ChoirLoft';
import { DeepRead } from './screens/DeepRead';
import { Intercession } from './screens/Intercession';
import { Scriptorium } from './screens/Scriptorium';
import { Liturgy } from './screens/Liturgy';
import { ScreenName } from './types';

function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('narthex');

  // Define sidebar state based on screen (LiveWord usually benefits from collapsed sidebar, others full)
  const isSidebarCollapsed = currentScreen === 'live-word';

  const renderScreen = () => {
    switch (currentScreen) {
      case 'narthex':
        return <Narthex onNavigate={setCurrentScreen} />;
      case 'live-word':
        return <LiveWord />;
      case 'intercession':
        return <Intercession />;
      case 'scriptorium':
        return <Scriptorium />;
      case 'liturgy':
        return <Liturgy />;
      case 'roster':
        return <RosterGrid />;
      case 'choir':
        return <ChoirLoft />;
      case 'deep-read':
        return <DeepRead />;
      default:
        return <Narthex onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-paper-main">
      <Sidebar 
        currentScreen={currentScreen} 
        onNavigate={setCurrentScreen} 
        collapsed={isSidebarCollapsed}
      />
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {renderScreen()}
      </div>
    </div>
  );
}

export default App;