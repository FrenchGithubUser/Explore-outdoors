import json
import os

with open("spotCoordinates.json", "w") as newData:
    newData.write("[")

with open("overpassRequest.geojson", 'r') as data:
    spots = json.load(data)
    i=0
    while i < len(spots["features"]):
        #checks if the spot is a point or a polygon, only accepting points as polygons are annoying to handle
        if spots["features"][i]["geometry"]["type"] == "Point":
            with open("spotCoordinates.json", "a") as newData:
                newData.write('\n\t{')
                try:
                    newData.write('\n\t\t"n":"' + str(spots["features"][i]["properties"]["name"].replace('"', '').replace("'", " ")) + '",') #.replace in case there is a quotation mark in the name of the spot
                except: #if no name has been set
                    newData.write('\n\t\t"n":"u",')#u stands for undefined
                newData.write('\n\t\t"o":' + str(spots["features"][i]["geometry"]["coordinates"][0]) + ',')#longitude
                newData.write('\n\t\t"a":' + str(spots["features"][i]["geometry"]["coordinates"][1]))#latitude
                newData.write('\n\t},')
        i+=1

#removing the last line of the file and replacing it bc otherwise there is a coma at the end of the object
file_path = "spotCoordinates.json"
os.system('sed -i "$ d" {0}'.format(file_path))

with open("spotCoordinates.json", "a") as newData:
    newData.write('\t}')
    newData.write("\n]")
