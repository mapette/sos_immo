-- nom du presta en charge d'un type d'incident
select tinc_id, tinc_nom, presta_nom 
from sos_immo.presta p, sos_immo.types_inc tinc
where tinc_presta = presta_id
order by tinc_idb;

-- utilisateur presta et nom du presta
select ut_uuid, ut_nom, ut_prenom, presta_nom
from sos_immo.presta p, sos_immo.utilisateurs
where ut_presta = presta_id
;

-- nom des incidents potentiels dans les emplacements possible
select mapping_id, temp_nom, tinc_nom
from sos_immo.mapping_inc_emp, sos_immo.types_emp,  sos_immo.types_inc
where mapping_emp = temp_id
and mapping_inc = tinc_id;

-- incidents potentiels des emplacements de la table avec le nom du presta en charge
SELECT emp_id, emp_etage, emp_nom, temp_nom, tinc_nom, presta_nom
FROM   `sos_immo`.`emplacements`,  `sos_immo`.`types_inc`, `sos_immo`.`types_emp`, `sos_immo`.`mapping_inc_emp`, `sos_immo`.`presta`
WHERE emp_temp = temp_id
and temp_id = mapping_emp
and mapping_inc = tinc_id
and tinc_presta = presta_id
order by emp_etage;

