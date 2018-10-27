# pylint:disable=E0001

from bs4 import BeautifulSoup
import requests
from .firebase import firebase


class Scrape:
    def __init__(self, search):
        self.search = search

    def start_scrape(self):
        message = ""

        firebasefetch = firebase.FirebaseApplication(
            'https://react-da13f.firebaseio.com/', None)
        searchTerm = firebasefetch.get('/messages', None)
        for t in searchTerm:
            a = t
        searchText = searchTerm[a]['message']

        page_url = 'https://timesofindia.indiatimes.com/topic/' + \
            str(searchText)
        page_response = requests.get(page_url)
        print(page_response)
        page_content = BeautifulSoup(page_response.content, "html.parser")

        fh = open("save.txt", "w")
        firebaseObject = firebase.FirebaseApplication(
            'https://react-da13f.firebaseio.com/', None)
        for x in range(0, 10):
            b = page_content.find_all('div', attrs={"class": "content"})[
                x].find('p')

            if (b == None) or (b.text == ""):
                continue
            fh.write(b.text + "\n")
            message = b.text
            result = firebaseObject.post('/scraper', {'scraped': message})

        fh.close()
