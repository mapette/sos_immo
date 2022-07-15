import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Bandeau from './tools/Bandeau';
import Accueil from './pages/Accueil'
import ChangeMdp from './pages/ChangeMdp'
import Menu from './pages/Menu'
import GestionUtilisateurs from './pages/tables/GestionUtilisateurs'
import NewInc from './pages/signalements/NewInc'
import Demandes from './pages/signalements/Demandes'
import './tools/App.css';
import Test from './Test'

function App() {

  let [varGlob, setVarGlob] = useState({
    ecran: 'accueil',
    nom: '',
    profil: '',
    profil_ecran: '',  //'Demandes : depuis 'mes demandes' => 'usager', depuis 'suivi inc' => 'techno
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
          setVarGlob={setVarGlob}
        />
        <div>
          {varGlob.ecran === 'accueil' &&
            <Accueil
              varGlob={varGlob}
              setVarGlob={setVarGlob}
            />
          }
          {varGlob.ecran === 'changemdp' &&
            <ChangeMdp
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
          {varGlob.ecran === 'demandes' &&
            <Demandes
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
