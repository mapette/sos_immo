
############ db manager ############
import psycopg2
BD = 'sos_immo'   

def connection(host, port, dbname, username, pwd):
    print('connection de la base', BD)
    return psycopg2.connect("host='{}' port={} dbname='{}' user={} password={}".format(host, port, dbname, username, pwd))

def deconnection(con, BD):
    con.commit()
    con.close()
    print('déconnection de la base', BD)

### select sans paramètre
def select_entire_table(table):
    print('requète sur table ' + table)
    params = None
    req = "SELECT * FROM " + table + ';'
    return req, params

### select avec paramètres
def req_ut(id, mdp):
    params = (id, mdp,)
    req = "SELECT ut_nom, ut_prenom, hab_profil "\
        "FROM habilitations, utilisateurs "\
        " WHERE hab_id = %s"\
        "and hab_mdp = %s"\
        "and hab_ut = ut_uuid"
    return req, params

### exécution select -> résultat dans cur
def execute_req(cur, req, params):
    cur.execute(req, params)

### résultat sur terminal
def show_table(cur, req, params):
    execute_req(cur, req, params)
    fetch_req(cur)

def fetch_req(cur,txt=''):
    print('req : ',  txt)
    for i in cur.fetchall():
        print(i)

# def show_ut(cur, req_occup):
#     execute_req(cur, req_occup[0], req_occup[1])
#     txt =  req_occup[0], ' et aussi ', req_occup[1]
#     fetch_req(cur,txt)


def test_select():     
    con = connection('localhost', '5432', BD, 'postgres', 'pepette')
    cur = con.cursor()

    #show_ut(cur, req_ut('sjoffrea','aaa'))

    # req_select_ut, params = select_table('utilisateurs')
    # show_table(cur, req_select_ut, params)

    req_cont_id, params = req_ut('sjoffrea','aaa')
    show_table(cur, req_cont_id, params)

    cur.close
    deconnection(con, BD)

test_select()


def creation_personne(nom, age, profession):
    params = (nom, age, profession)
    req = """INSERT INTO personne(nom, age, profession)
            VALUES (%s, %s, %s);"""
    return req, params
