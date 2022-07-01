import psycopg2

def connection(host, port, dbname, username, pwd):
    return psycopg2.connect("host='{}' port={} dbname='{}' user={} password={}".format(host, port, dbname, username, pwd))

def deconnection(con, BD):
    con.commit()
    con.close()
    print('déconnection de la base', BD)

def select_table(table):
    params = None
    req = "SELECT * FROM " + table + ';'
    return req, params

def show_table(cur, req, params):
    execute_req(cur, req, params)
    fetch_req(cur)

def execute_req(cur, req, params):
    cur.execute(req, params)
    
def fetch_req(cur,txt=''):
    print('req : ',  txt)
    for i in cur.fetchall():
        print(i)
    
def creation_immeuble(nom, adresse, nb_etage, annee, gerant):
    params = (nom, adresse, nb_etage, annee, gerant)
    req = """INSERT INTO immeuble(nom_imm, adresse,nb_etage, annee_const, nom_gerant)
            VALUES (%s, %s, %s, %s, %s);"""
    return req, params

def delete_immeuble(id):
    params = (id,)
    req = f'DELETE FROM immeuble where nom_imm = %s ;'
    return req, params

def creation_personne(nom, age, profession):
    params = (nom, age, profession)
    req = """INSERT INTO personne(nom, age, profession)
            VALUES (%s, %s, %s);"""
    return req, params

def delete_personne(id):
    params = (id,)
    req = f'DELETE FROM personne where nom = %s ;'
    return req, params

def update_personne(nom, age, profession):
    params = (age, profession, nom)
    req = """UPDATE personne SET
            age = %s, profession = %s where nom = %s;"""
    return req, params   

def req_occupants(imm):
    params = (imm,)
    req = "SELECT * FROM occupant WHERE nom_imm = %s;"
    return req, params, imm

def show_occupant(cur, req_occup):
    execute_req(cur, req_occup[0], req_occup[1])
    fetch_req(cur, req_occup[2])


BD = 'immeubles'    
con = connection('localhost', '5432', BD, 'postgres', 'pepette')
cur = con.cursor()

req_select_imm, params = select_table('immeuble')
req_select_personne, params = select_table('personne')

show_table(cur, req_select_imm, params)

show_occupant(cur, req_occupants('koudalou'))

deconnection(con, BD)


#show_table(cur, req_select_personne, params)


#req, params = creation_personne('nini',19,'apprentie')
#req, params = update_personne('nini', 20, 'serveuse')
#execute_req(cur, req, params)

# execute_req(cur, req_select_imm, params)
# fetch_req(cur)

# req, params = creation_immeuble('central parc','nanterre',19,1981,'william')
# req, params = delete_immeuble('immeuble', 'central parc')
# execute_req(cur, req, params)

#req, params = creation_personne('nini',19,'serveuse')
#req, params = delete_personne('nini')
#execute_req(cur, req, params)
