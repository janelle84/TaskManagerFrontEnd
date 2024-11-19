import React from 'react';
import { TaskProvider } from './context/TaskContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import './index.css';

const App = () => (
  <TaskProvider>
    <div>
      <Header />
      <Sidebar />
      <MainContent />
    </div>
  </TaskProvider>
);

export default App;
