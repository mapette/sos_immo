CREATE SCHEMA `sos_immo` ;

DROP TABLE sos_immo.emplacements;
DROP TABLE `sos_immo`.`mapping_inc_emp`;
DROP TABLE `sos_immo`.`habilitations`;
DROP TABLE sos_immo.utilisateurs;
DROP TABLE sos_immo.types_inc;
DROP TABLE sos_immo.prest;
DROP TABLE sos_immo.types_emp;

CREATE TABLE `sos_immo`.`types_emp` (
  `temp_id` VARCHAR(5) NOT NULL,
  `temp_nom` VARCHAR(30) NULL,
  PRIMARY KEY (`temp_id`))
COMMENT = 'type d\'emplacements';

CREATE TABLE `sos_immo`.`presta` (
  `presta_id` VARCHAR(5) NOT NULL,
  `presta_nom` VARCHAR(30) NOT NULL,
  `presta_libelle` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`presta_id`))
COMMENT = 'prestataires sous contrat';

CREATE TABLE `sos_immo`.`types_inc` (
  `tinc_id` VARCHAR(5) NOT NULL,
  `tinc_nom` VARCHAR(50) NOT NULL,
  `tinc_presta` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`tinc_id`),
  CONSTRAINT `presta_id`
    FOREIGN KEY (`tinc_presta`)
    REFERENCES `sos_immo`.`presta` (`presta_id`)
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION)
COMMENT = 'Types d\'incidents - prestataire en charge';

CREATE TABLE `sos_immo`.`utilisateurs` (
  `ut_uuid` VARCHAR(32) NOT NULL,
  `ut_nom` VARCHAR(25) NOT NULL,
  `ut_prenom` VARCHAR(25) NOT NULL,
  `ut_presta` VARCHAR(5),
  `ut_tel` BIGINT(10),
  `ut_mail` VARCHAR(50),
  `ut_date_deb` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ut_date_exp` datetime,
  PRIMARY KEY (`ut_uuid`),
    FOREIGN KEY (`ut_presta`)
    REFERENCES `presta` (`presta_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
COMMENT = 'tous les utilisateurs (interne-presta)  ';

CREATE TABLE `sos_immo`.`habilitations` (
  `hab_id_uuid` VARCHAR(32) NOT NULL,
  `hab_id` VARCHAR(10) NOT NULL,
  `hab_ut` VARCHAR(32) NOT NULL,
  `hab_niveau` INT NOT NULL,
  `hab_date_deb` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `hab_date_exp` datetime,
  `hab_mpd` VARCHAR(32) NOT NULL,
  `hab_mpd_prov` BOOLEAN DEFAULT true,
  PRIMARY KEY (`hab_id_uuid`),
  UNIQUE (`hab_id`),
  FOREIGN KEY (`hab_ut`)
    REFERENCES `sos_immo`.`utilisateurs` (`ut_uuid`)
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION)
COMMENT = 'habilitations\n   hab_id : simple car à retenir pour l\'utilisateur\n   hab_ut : uuid de l\'utilisateur\n   hab_niveau : 0-admin, 1-usager, 2-technicien, 3-valideur\n   hab_mpd_prov : mpd a renouveler à la prochaine connexion' ;

CREATE TABLE `sos_immo`.`mapping_inc_emp` (
  `mapping_id` VARCHAR(5) NOT NULL,
  `mapping_inc` VARCHAR(5) NOT NULL,
  `mapping_emp` VARCHAR(5) NOT NULL,
  PRIMARY KEY (`mapping_id`),
FOREIGN KEY (`mapping_inc`)
    REFERENCES `sos_immo`.`types_inc` (`tinc_id`),
FOREIGN KEY (`mapping_emp`)
    REFERENCES `sos_immo`.`types_emp` (`temp_id`)  ) 
COMMENT = 'tous types d\'incidents pouvant survenir dans tous types d\'emplacement';

--------- en chantier

CREATE TABLE `sos_immo`.`emplacements` (
  `emp_id` VARCHAR(5) NOT NULL,
  `emp_etage` INT(2) NOT NULL,
  `emp_temp` VARCHAR(5) NOT NULL,
  `emp_nom` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`emp_id`),
FOREIGN KEY (`emp_temp`)
    REFERENCES `sos_immo`.`types_emp` (`temp_id`) )
COMMENT = 'emplacements, salles, lieux succeptible de faire l\'objet d\'un signalement';
------------------------------------------
------------------------------------------
