from fastapi import FastAPI
from database import Database
from fastapi.encoders import jsonable_encoder
import datetime as dt

import lib_api

app = FastAPI()

# ************************** GET Client **************************

@app.get("/clients/")
async def list_clients():
    """
    Liste les clients de la banque.
    """
    db = Database()
    db_clients = db.get_clients()
    api_response = []
    [api_response.append({
            'id': client_id,
            'name': client_dict['name'],
            'first_name': client_dict['first_name'],
        }) for client_id, client_dict in db_clients.items()]
    return api_response

@app.get("/client/{client_id}")
async def get_client(client_id: str):   #str => par habitude puisque str par défaut
    """
    Récupère un client de la banque
    en fonction de son identifiant.
    """
    db = Database()
    db_client = db.get_client(client_id)
    return {
        'id': client_id,
        'name': db_client['name'],
        'first_name': db_client['first_name'],
        'password': db_client['password']
    }

@app.get("/client/{client_id}/id{clt_pw}")
async def get_client(client_id: str, clt_pw: str): 
    """
    Contrôle le mot de passe du client.
    """
    db = Database()
    db_client = db.get_client(client_id)
    if db_client['password'] == clt_pw:
        return True
    return False

# ************************** CREATE/UPDATE/DELETE Client **************************

@app.post("/client/")
async def create_client(client: lib_api.Client):
    """
    Créer un nouveau client.
    """
    db = Database()
    db_clients = db.get_clients()
    client_id = lib_api.generate_clt_id()
    db_clients[client_id] = {
        'name': client.name,
        'first_name': client.first_name,
        'password': client.password,
        'accounts': {}
    }
    db.save()
    return client_id

@app.put("/client/{client_id}")
async def update_client(client_id: str, client:lib_api.Client):
    """
    Met à jour un client.
    """
    # Récupère le client de la base
    db = Database()
    db_client = db.get_client(client_id)  
    db_client.update(client)           
    db.save()

@app.delete("/client/{client_id}")
async def delete_client(client_id: str):
    """
    Supprime un client s'il n'a plus de cpte.
    """
    db = Database()
    db.get_client(client_id)    
    db_clients = db.get_clients()
    if len(db_clients[client_id]['accounts']) == 0:
        del db_clients[client_id]
        db.save()
    else: 
        return {'message':'suppression comptes nécessaire, suppression client impossible'}


# ************************** GET/CREATE/UPDATE/DELETE Client accounts **************************

@app.get("/client/{client_id}/accounts")
async def get_client_accounts(client_id: str):
    """
    Liste les comptes d'un client avec leurs soldes.
    """
    db = Database()
    return db.get_balances(client_id)

@app.post("/client/{client_id}/account/")
async def create_accounts(client_id: str):
    """
    Créer un nouveau compte pour un client.
    Par défaut il se nommera 'compte courant'
    """
    # Récupère le client de la base
    db = Database()
    db_client = db.get_client(client_id)
    # Trouve un nouvel identifiant
    acc_id = lib_api.generate_acc_id()
    # Ajoute un cpte au client
    db_client['accounts'][acc_id] = {
        'label': 'compte courant',
        'balance': 0,
        'transactions': []
    }
    db.save()
    return  {
        'account_id' : acc_id,
        'label': 'compte courant',
        'balance': 0,
    }

@app.put("/client/{client_id}/account/{acc_id}")
async def update_account(client_id: str, acc_id: str, label_acc):
    """
    Met à jour le label d'un compte.
    """
    db = Database()
    db_acc = db.get_account(client_id, acc_id)
    db_acc['label'] = label_acc 
    db.save()
    return  {
        'account_id' : acc_id,
        'label': label_acc,
        'balance': db_acc['balance'],
    }

@app.delete("/client/{client_id}/account/{acc_id}/delete")
async def delete_account(client_id: str, acc_id: str):
    """
    Supprimer un compte dont le solde est à zéro.
    """
    db = Database()
    db.get_account(client_id, acc_id)   #uniquemt contrôle cpte existe
    db_client = db.get_client(client_id)
    # Supprime le cpte si solde nul
    if db_client['accounts'][acc_id]['balance'] == 0:
        del db_client['accounts'][acc_id]
        db.save()
        return {'message':f'compte {acc_id} soldé'}
    else:
        return {'message':'solde non nul, suppression impossible'}

# ************************** GET/CREATE transactions **************************

@app.post("/clients/{client_id}/{acc_id}/transaction")
async def create_transaction(client_id: str, acc_id: str, transaction: lib_api.Transaction):
    """
    Créer une nouvelle transaction sur le compte d'un client.
    """
    # Récupère le compte du client de la base
    db = Database()
    db_account = db.get_account(client_id, acc_id)  
    # conversion transaction en serialisable
    transaction = jsonable_encoder(transaction)
    # implémentation transaction dans le cpte
    if transaction['type'] == lib_api.Type_trans.deposit:
        db_account['balance'] += transaction['value']
    else:
        db_account['balance'] -= transaction['value']
    db_account['transactions'].append(transaction)
    db.save()
    return transaction

@app.get("/client/{client_id}/{acc_id}")
async def get_account_details(client_id: str, acc_id: str):
    """
    Relevé de compte :
    Retourner toutes les transactions et le solde d'un cpte
    """
    db = Database()
    return db.get_account(client_id,acc_id)

@app.post("/client/{client_id}/{acc_id}/adj")
async def create_adj_transaction(client_id: str, acc_id: str, new_amount:float):
    """
    Créer une nouvelle transaction qui ajuste le solde à un montant donné.
    """
    # Récupère le compte du client de la base
    db = Database()
    db_account = db.get_account(client_id, acc_id)  
    # calcul montant et sens nécessaire à l'ajustement
    transaction = {}
    if db_account['balance'] == new_amount:
        return {'message':'pas d\'opération necessaire'}
    else:
        transaction['label'] = 'ajustement solde'
        transaction['date'] = dt.datetime.now().strftime('%Y/%m/%d')
        adj_amount = db_account['balance'] - new_amount
        if adj_amount > 0:
            transaction['value'] = adj_amount
            transaction['type'] = lib_api.Type_trans.withdrawal
        else:
            transaction['value'] = - adj_amount
            transaction['type'] = lib_api.Type_trans.deposit
        #implémentation transaction dans le cpte
        if transaction['type'] == lib_api.Type_trans.deposit:
            db_account['balance'] += transaction['value']
        else:
            db_account['balance'] -= transaction['value']
        db_account['transactions'].append(transaction)
        db.save()
        return transaction



# ************************** warnings **************************

@app.get("/debit_balances")
async def det_debit_balances():
    """
    Retourner les cptes débiteurs
    """
    db = Database()
    db_clients = db.get_clients()
    warning_list = []
    for client_id in db_clients:
        db_acc = db.get_balances(client_id)
        for acc in db_acc:
            if acc['balance'] < 0:
                warning_list.append({
                    'client_id' : client_id,
                    'label': acc['label'],
                    'account_id' : acc['account_id'],
                    'balance' : acc['balance'],
                })
    return warning_list


    

