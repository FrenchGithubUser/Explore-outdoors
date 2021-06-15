import json


with open("overpassRequest.geojson", 'r') as data:
    spots = json.load(data)
    i=0
    while i < len(spots["features"]):
        #checks if the spot is a point or a polygon, only accepting points as polygons are annoying to handle
        try:
            if spots["features"][i]["properties"]["leisure"] != "swimming_pool":
                pass
            elif spots["features"][i]["geometry"]["type"] != "LineString":
                pass
        except:
            with open("spotCoordinates.json", "a") as newData:
                json.dump(spots["features"][i]["geometry"]["coordinates"][0], newData)
        i+=1
