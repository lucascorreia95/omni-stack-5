import React, { useEffect, useState } from 'react';

import api from './services/api';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

import './global.css';
import './app.css';
import './sidebar.css';
import './main.css';

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  return (
    <div className="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm devs={devs} setDevs={setDevs} />
      </aside>
      <main>
        <ul>
          {devs.map(dev =>(
            <DevItem key={dev.github_username} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
