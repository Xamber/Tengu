from bs4 import BeautifulSoup
import json
import glob

HTMLFile = "english_words.html"
JSONFile = "english_words.json"
Books = glob.glob("*.txt")
print("Books: ", Books)

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

for f in Books:
    with open(f, "r", encoding='utf-8') as f:
        for line in f.readlines():
            line = line.strip()
            if not line or line[0] != line[0].title() or line.count(".") < 1 or line[-1] not in [".", '"', "?"] or len(line) < 10 or len(line) > 100:
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
