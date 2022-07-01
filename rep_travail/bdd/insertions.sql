-- entreprises presta
INSERT INTO `sos_immo`.`presta` ( `presta_id`,  `presta_nom`,  `presta_libelle`)
 VALUES
	('E1','Eclair','électricité'),
	('E2',"Soul'eau",'plomberie'),
	('E3','touver','jardinage'),
	('E4','Toupropre','ménage et entretien'),
	('E5','Vertigo','ascenceurs');

-- utilisateurs internes
INSERT INTO `sos_immo`.`utilisateurs` ( `ut_uuid`,  `ut_nom`,  `ut_prenom`,  `ut_tel`,  `ut_mail`)
 VALUES
	('uuid-vdumont','Dumont','Valérie', 0123456789, 'dv@sg.com'),
	('uuid-sjoffre','Joffre','Sophie', 0123456789, 'sj@sg.com');
	
-- utilisateurs presta
INSERT INTO `sos_immo`.`utilisateurs` ( `ut_uuid`,  `ut_nom`,  `ut_prenom`,  `ut_presta`, `ut_tel`)
 VALUES
	('uuid-blaurent','Laurent','Bod', 'E1', 0123456789);

-- habilitations
INSERT INTO `sos_immo`.`habilitations` ( `hab_id_uuid`,  `hab_id`,  `hab_ut`,  `hab_niveau`,  `hab_mpd`)
 VALUES
	('uuid-u-vdumont','vdumontu','uuid-vdumont', 1, 'aaa'),
	('uuid-u-sjoffre','sjoffreu','uuid-sjoffre', 1, 'aaa'),
	('uuid-a-sjoffre','sjoffrea','uuid-sjoffre', 0, 'aaa'),
    ('uuid-t-blaurent','blaurentt','uuid-blaurent', 2, 'aaa');

-- type d'incident
INSERT INTO `sos_immo`.`types_inc` ( `tinc_id`,  `tinc_nom`,  `tinc_presta`)
 VALUES
	('N1','remplacement éclairage','E1'),
	('N2','fuite de robinet','E2'),
	('N3','WC bouchés','E2'),
	('N4','distributeur de savon/bouché','E4'),
	('N5','papier toilette à réapprivisionnr','E4'),
	('N6','poubelle à vider','E4'),
	('N7','sol à nettoyer','E4'),
	('N8','store bloqué','E1'),
	('N9','vitres à nettoyer','E4'),
	('N10','autres (espaces verts)','E3'),
	('N11','autres','E4'),
	('N12','porte ascenceur bloquée','E5'),
	('N13','porte bloquée','E4');

-- type d'emplacements
INSERT INTO `sos_immo`.`types_emp` ( `temp_id`,  `temp_nom`)
 VALUES
	('TE1','open space'),
	('TE2','dégagements'),
	('TE3','ascenceurs'),
	('TE4','toilettes'),
	('TE5','salle de réunions'),
	('TE6','escaliers'),
	('TE7','espaces verts'),
	('TE8','parking'),
	('TE9','local technique'),
	('TE10','vestiaire');	

-- mapping types d'incidents/types d'emplacements
INSERT INTO `sos_immo`.`mapping_inc_emp` ( `mapping_id`, `mapping_emp`,  `mapping_inc`)
 VALUES
	('M1','TE1','N1'),
	('M8','TE2','N1'),
	('M13','TE3','N1'),
	('M15','TE4','N1'),
	('M24','TE5','N1'),
	('M32','TE6','N1'),
	('M37','TE8','N1'),
	('M42','TE9','N1'),
	('M36','TE7','N10'),
	('M6','TE1','N11'),	
	('M10','TE2','N11'),	
    ('M14','TE3','N11'),	
	('M22','TE4','N11'),	
	('M29','TE5','N11'),	
	('M33','TE6','N11'),	
	('M40','TE8','N11'),	
	('M45','TE9','N11'),
	('M7','TE1','N12'),	
   	('M30','TE5','N12'),	
	('M11','TE2','N12'),	
	('M12','TE3','N12'),	
	('M31','TE6','N12'),	
	('M23','TE4','N13'),	
	('M39','TE8','N13'),
   	('M46','TE9','N13'),
	('M16','TE4','N2'),
	('M43','TE9','N2'),
	('M17','TE4','N3'),
  	('M18','TE4','N4'),
	('M19','TE4','N5'),
	('M2','TE1','N6'),
	('M20','TE4','N6'),
	('M25','TE5','N6'),
	('M41','TE8','N6'),
	('M3','TE1','N7'),
	('M9','TE2','N7'),
	('M35','TE3','N7'),
	('M21','TE4','N7'),
	('M26','TE5','N7'),
	('M34','TE6','N7'),
	('M38','TE8','N7'),
	('M44','TE9','N7'),
	('M4','TE1','N8'),
	('M27','TE5','N8'),
	('M5','TE1','N9'),
	('M28','TE5','N9'),
	('M47','TE10','N13'),    
	('M48','TE10','N1'),    
	('M49','TE10','N2'),    
	('M50','TE10','N3'),    
	('M51','TE10','N4'),    
	('M52','TE10','N5'),    
	('M53','TE10','N6'),    
	('M54','TE10','N7'),    
	('M55','TE10','N11');	

---------- chantiers

-- emplacements, salles, lieux succeptible de faire l'objet d'un signalement 

INSERT INTO `sos_immo`.`emplacements` ( `emp_id`, `emp_etage`,  `emp_nom`, `emp_temp`)
 VALUES ('E1', -1, 'parking', 'TE8'),
  ('E3', 0, 'grand massif central', 'TE7'),
  ('E5', 0, 'open space 0001', 'TE1'),
  ('E7', 0, 'toilettes', 'TE4'),
  ('E8', 0, 'hall d\'accueil', 'TE2'),
  ('E16', 1, 'salle de réunions 0101', 'TE1'),
  ('E28', 2, 'local technique 0201', 'TE8'),
  ('E33', -1, 'vestaires usagers', 'TE10'),
  ('E35', -0, 'vestaires presta', 'TE10');