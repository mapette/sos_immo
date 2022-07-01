import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Bandeau from './tools/Bandeau';
import Accueil from './pages/Accueil'
import Menu from './pages/Menu'
import GestionUtilisateurs from './pages/tables/GestionUtilisateurs'
import NewInc from './pages/signalements/NewInc'

import './tools/App.css';
import Test from './Test'

function App() {

  let [varGlob, setVarGlob] = useState({
    ecran: 'accueil',
    nom: '',
    profil: '',
  })

  if (varGlob.ecran === 'test') {
    return (
      <Test />

    )
  }

  if (varGlob.ecran !== 'tests') {
    return (
      <div className="centrer">

        <Bandeau
          varGlob={varGlob}
        />
        <div>
          {varGlob.ecran === 'accueil' &&
            <Accueil
              varGlob={varGlob}
              setVarGlob={setVarGlob}
            />
          }
          {varGlob.ecran === 'menu' &&
            <Menu
              varGlob={varGlob}
              setVarGlob={setVarGlob}
            />
          }
          {varGlob.ecran === 'gestionUtilisateurs' &&
            <GestionUtilisateurs
              varGlob={varGlob}
              setVarGlob={setVarGlob}
            />
          }
          {varGlob.ecran === 'newInc' &&
            <NewInc
              varGlob={varGlob}
              setVarGlob={setVarGlob}
            />
          }
        </div>
      </div>
    );
  }
}

export default App;
