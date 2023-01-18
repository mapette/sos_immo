import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Ribbon from './tools/Ribbon';
import Login from './pages/Login'
import OubliMdp from './pages/OubliMdp'
import ChangeMdp from './pages/ChangeMdp'
import Menu from './pages/Menu'
import GestionUtilisateurs from './pages/tables/utilisateurs/GestionUtilisateurs'
import GestionPresta from './pages/tables/presta/GestionPresta'
import GestionEmp from './pages/tables/emplacements/GestionEmp'
import GestionTemp from './pages/tables/temp/GestionTemp'
import GestionTinc from './pages/tables/tinc/GestionTinc'
import NewInc from './pages/incidents/NewInc'
import MyInc from './pages/incidents/MyInc'
import FicheInc from './pages/incidents/FicheInc'
import Pilotage from './pages/kpi/Pilotage'
import Archivage from './pages/kpi/Archivage'

import './tools/App.css';

function App() {

  let [varGlob, setVarGlob] = useState({
    ecran: 'login',
    smenu: '',
    nom: '',
    profil: '',
    profilEcran: '',  // depuis 'mes demandes' => 'usager', depuis 'suivi inc' => 'techno
    expMdp: false,    // true si mdp à renouveler
    focus: '',        // élement pour lequel on veut le détail (utilisateur, incident, emplacement...)
  })

  {
    return (
      <div className="centrer">
        <Ribbon
          varGlob={varGlob}
          setVarGlob={setVarGlob}
        />
        <div>
          {varGlob.ecran === 'login' &&
            <Login
              varGlob={varGlob}
              setVarGlob={setVarGlob}
            />
          }
          {varGlob.ecran === 'oubliMdp' &&
            <OubliMdp
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
          {varGlob.ecran === 'gestionPresta' &&
            <GestionPresta
              varGlob={varGlob}
              setVarGlob={setVarGlob}
            />
          }
          {varGlob.ecran === 'gestionEmp' &&
            <GestionEmp
              varGlob={varGlob}
              setVarGlob={setVarGlob}
            />
          }          
          {varGlob.ecran === 'gestionTemp' &&
            <GestionTemp
              varGlob={varGlob}
              setVarGlob={setVarGlob}
            />
          }
          {varGlob.ecran === 'gestionTinc' &&
            <GestionTinc
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
            <MyInc
              varGlob={varGlob}
              setVarGlob={setVarGlob}
            />
          }
          {varGlob.ecran === 'detailsInc' &&
            <FicheInc
              varGlob={varGlob}
              setVarGlob={setVarGlob}
            />
          }
          {varGlob.ecran === 'pilot' &&
            <Pilotage
              varGlob={varGlob}
              setVarGlob={setVarGlob}
            />
          }
          {varGlob.ecran === 'archivage' &&
            <Archivage
              varGlob={varGlob}
              setVarGlob={setVarGlob}
            />
          }
        </div>
        <br />
      </div>
    );
  }
}
export default App;
