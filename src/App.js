import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Ribbon from './tools/Ribbon';
import Login from './pages/authentification/Login'
import OubliMdp from './pages/authentification/OubliMdp'
import ChangeMdp from './pages/authentification/ChangeMdp'
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
import Err503 from './pages/Err503'
import ErrExpiration from './pages/ErrExpiration';
import './tools/App.css';

function App() {

  let [varGlob, setVarGlob] = useState({
    screen: 'login',
    smenu: '',
    userName: '',
    profil: '',
    profilScreen: '',  // depuis 'mes demandes' => 'usager', depuis 'suivi inc' => 'techno
    isPwExp: false,    // true si mdp à renouveler
    focus: '',        // élement pour lequel on veut le détail (utilisateur, incident, emplacement...)
  })

  return (
    <div className="centrer">
      <Ribbon
        varGlob={varGlob}
        setVarGlob={setVarGlob}
      />
      <>
        {varGlob.screen === 'login' &&
          <Login
            varGlob={varGlob}
            setVarGlob={setVarGlob}
          />
        }
        {varGlob.screen === 'oubliMdp' &&
          <OubliMdp
            varGlob={varGlob}
            setVarGlob={setVarGlob}
          />
        }
        {varGlob.screen === 'changemdp' &&
          <ChangeMdp
            varGlob={varGlob}
            setVarGlob={setVarGlob}
          />
        }
        {varGlob.screen === 'menu' &&
          <Menu
            varGlob={varGlob}
            setVarGlob={setVarGlob}
          />
        }
        {varGlob.screen === 'gestionUtilisateurs' &&
          <GestionUtilisateurs
            varGlob={varGlob}
            setVarGlob={setVarGlob}
          />
        }
        {varGlob.screen === 'gestionPresta' &&
          <GestionPresta
            varGlob={varGlob}
            setVarGlob={setVarGlob}
          />
        }
        {varGlob.screen === 'gestionEmp' &&
          <GestionEmp
            varGlob={varGlob}
            setVarGlob={setVarGlob}
          />
        }
        {varGlob.screen === 'gestionTemp' &&
          <GestionTemp
            varGlob={varGlob}
            setVarGlob={setVarGlob}
          />
        }
        {varGlob.screen === 'gestionTinc' &&
          <GestionTinc
            varGlob={varGlob}
            setVarGlob={setVarGlob}
          />
        }
        {varGlob.screen === 'newInc' &&
          <NewInc
            varGlob={varGlob}
            setVarGlob={setVarGlob}
          />
        }
        {varGlob.screen === 'myReport' &&
          <MyInc
            varGlob={varGlob}
            setVarGlob={setVarGlob}
          />
        }
        {varGlob.screen === 'detailsInc' &&
          <FicheInc
            varGlob={varGlob}
            setVarGlob={setVarGlob}
          />
        }
        {varGlob.screen === 'pilot' &&
          <Pilotage
            varGlob={varGlob}
            setVarGlob={setVarGlob}
          />
        }
        {varGlob.screen === 'archivage' &&
          <Archivage
            varGlob={varGlob}
            setVarGlob={setVarGlob}
          />
        }
        {varGlob.screen === 'err503' &&
          <Err503
            varGlob={varGlob}
            setVarGlob={setVarGlob}
          />
        }
        {varGlob.screen === 'errExp' &&
          <ErrExpiration
            varGlob={varGlob}
            setVarGlob={setVarGlob}
          />
        }
      </>
      <br />
    </div>
  );
}

export default App;
