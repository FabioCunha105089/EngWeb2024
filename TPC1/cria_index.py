import os
import re

streets = []
path = "./MapaRuas-materialBase/texto"
with os.scandir(path) as files:
    for street in files:
        street_name = street.name[7:-4]
        html_path = street.name[:-4] + '.html'
        street_name_spaced = ' '.join(re.findall(r'[A-Z][a-z]*', street_name))
        streets.append((street_name_spaced, html_path))

html_index = '''
<!DOCTYPE html>
<html>
    <head>
        <title>Lista de Ruas</title>
    </head>
    <body>
        <h1>Ruas da cidade de Braga</h1>
        <ul>
'''

html_index += '\n'.join(f'          <li><a href="{street[1]}" target="_blank">{street[0]}</a></li>' for street in streets)

html_index += '''
        </ul>
    </body>
</html>
'''

with open('index.html', 'w') as file:
    file.write(html_index)
