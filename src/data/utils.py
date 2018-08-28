from bs4 import BeautifulSoup
import json

HTMLFile = "english_words.html"
JSONFile = "english_words.json"
GOTBook = "Harry Potter and the Sorcerer's Stone.txt"


def create_dictonary(soup):
    data = {}
    for word in soup.find_all('tr')[1:3001]:
        word = word.find_all('td')

        eng = word[3].find_all('a')[-1].text
        _id = int(word[1].text)
        rus = word[5].text.replace(' ', '').split(',')

        data[eng] = {"eng": eng, "id": _id, "rus": rus, "usage": []}
    return data


with open(HTMLFile, "r", encoding='utf-8') as f:
    soup = BeautifulSoup(f, 'html.parser')

dictonary = create_dictonary(soup)

with open(GOTBook, "r", encoding='utf-8') as f:
    for line in f.readlines():
        if line.count(".") != 1 or len(line) < 10 or len(line) > 150:
            continue
        words = line.split(" ")
        for w in words:
            if dictonary.get(w, None) and len(dictonary[w]["usage"]) < 3:
                dictonary[w]["usage"].append(line)
                print(len(line), w, " = ", line)

counter = 0
for k, v in dictonary.items():
    if len(v["usage"]) != 0:
        counter += 1

print(counter, "/ 3000 is now have a usage examples")

with open(JSONFile, "w") as f:
    f.write(json.dumps(dictonary))
