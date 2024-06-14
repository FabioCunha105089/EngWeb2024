import json

with open('compositores.json', 'r') as file:
    DB = json.load(file)

periodosDB = {}
p_count = 1

for compositor in DB['compositores']:
    periodo = compositor['periodo']

    if periodo not in periodosDB:
        periodosDB[periodo] = {
                "id": f"P{p_count}",
                "nome": periodo,
                "compositores": {compositor['id']: compositor['nome']}
                }
        p_count += 1
    else:
        periodosDB[periodo]["compositores"].update({compositor['id']: compositor['nome']})

DB['periodos'] = list(periodosDB.values())

with open('newDB.json', 'w') as file:
    json.dump(DB, file, indent=2)

