import React, { useState, useEffect } from 'react';

import api from '../../services/api';

function DevForm({ devs, setDevs }) {
  const [githubUsername, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    );
  }, []);

  async function handleAddDev(event) {
    event.preventDefault();

    const response = await api.post('/devs', {
      github_username: githubUsername,
      techs,
      latitude,
      longitude
    });

    setGithubUsername('');
    setTechs('');

    setDevs([...devs, response.data]);
  }

  return (
    <form onSubmit={handleAddDev}>
      <div className="input-block">
        <label htmlFor="github_username">Usuário do Github</label>
        <input name="github_username" id="github_username" required value={githubUsername} onChange={event => setGithubUsername(event.target.value)} />
      </div>

      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input name="techs" id="techs" required value={techs} onChange={event => setTechs(event.target.value)}/>
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input type="number" name="latitude" id="latitude" required value={latitude} onChange={event => setLatitude(event.target.value)} />
        </div>

        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input type="number" name="longitude" id="longitude" required value={longitude} onChange={event => setLongitude(event.target.value)} />
        </div>
      </div>

      <button type="submit">Salvar</button>
    </form>
  )
};

export default DevForm;