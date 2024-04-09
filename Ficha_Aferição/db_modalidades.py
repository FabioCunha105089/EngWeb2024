import json

with open('dataset.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

desportos_dict = {}

for obj in data:
    nome = obj['nome']
    desportos = obj['desportos']
    
    for desporto in desportos:
        if desporto not in desportos_dict:
            desportos_dict[desporto] = [nome]
        else:
            if nome not in desportos_dict[desporto]:
                desportos_dict[desporto].append(nome)

output_json = []
for desporto, pessoas in desportos_dict.items():
    output_json.append({
        "desporto": desporto,
        "pessoas": pessoas
    })

with open('modalidades.json', 'w', encoding='utf-8') as file:
    json.dump(output_json, file, indent=4, ensure_ascii=False)