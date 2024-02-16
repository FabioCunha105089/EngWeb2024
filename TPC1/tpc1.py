import os

streets = list()

with os.scandir("./MapaRuas-materialBase/texto") as files:
    for street in files:
        street_name = street.name[7:-4]
        streets.append(street_name)

