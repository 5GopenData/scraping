#!/usr/bin/env python
# coding: utf-8

# <span style="font-weight:bold;color:#2d3C86;border: 1px solid black; padding: 5px;margin-left:25%"> SCRAPING AMAZON GROUPR 4: COURS SCRAPING </span>

# <img src="./amazon.jpeg" width=140px height=140px style="margin-left:37%" />

# # Importation des librairie

# In[1]:


import re
import time
import uuid
import requests
from bs4 import BeautifulSoup as bs4
from urllib.parse import urljoin
from concurrent.futures import ThreadPoolExecutor
import webbrowser

#librairie mongo db
from pymongo import MongoClient


from bson.objectid import ObjectId


# # Connexion à la BD

# In[2]:


#connexion à MongoDB
    
server = '127.0.0.1'

port = 27017

dbName = 'groupe4'

client = MongoClient(server,port)

db = client[dbName]

product_BD = db["product"]

details_BD = db["details"]

pages_BD = db["pages"]

product_BD.drop()

# # Inialisations

# In[3]:


""" #search_word = "Livre de scraping en python"
search_word = "Livre de cuisine"

"""


base_url = "https://www.amazon.fr" 

headers = {
    
    'Connection': 'keep-alive',
    'sec-ch-ua': '"Google Chrome";v="95", "Chromium";v="95", ";Not A Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
    'sec-ch-ua-platform': '"macOS"',
    'Content-Type': 'text/plain;charset=UTF-8',
    'Accept': '*/*',
    'Origin': 'https://www.amazon.fr',
    'Sec-Fetch-Site': 'same-site',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    'Referer': 'https://www.amazon.fr/',
    'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
    
}


product_obj_list = []
    
page_list = []


#Variables intermediaire
page_list_ = []

page_count_ = 0

global total_produit

total_produit = 0


# # Produit & Details Recherche

# > CODE ASIN AMAZON : Amazon Standard Identification Number

# In[4]:


product = { 
    
    "_id":None,
    "asin" : None,  
    "titre" : None, 
    "image" : None, 
    "auteur" : None , 
    "prix" : None , 
    "note" : None  , 
    "nbre_cmt" : None , 
    "format" : None,
    "best_seller":None,
    "liens":None,
    "id_search_word":None
    
}


# > Session Request

# In[5]:


session = requests.Session()


# # Obtention des infos

# ## Pages à feuilleter

# > Prepare URL

# In[6]:



def prepare_url(base_url,search_word):
    
    url = urljoin(base_url, ("/s?k=%s" % (search_word.replace(' ', '+'))))
    
    return url


# > Contenue de la page recherche

# In[7]:


def get_page_content(search_url,url):
        
    try:
        response = session.get(base_url, headers=headers)
        
        if response.status_code != 200:
            
            raise requests.HTTPError("Erreur code:" + str(response.status_code))
        
        html = requests.get(url, headers=headers)
    
    except (requests.exceptions.ConnectionError, requests.HTTPError) as e:
        
        print(e + "Pendant la connexion à l'url: " + url)
        
        return None
    
    return html


# > Obtenir nombre de pages

# In[8]:


def get_page_count(page_content):
        
        soup = bs4(page_content.content , "lxml")
        
        try:
            
            pagination = soup.find_all('li', attrs={'class': ['a-normal', 'a-disabled', 'a-last']})
            
            return int(pagination[-2].text)
        
        except IndexError:
            
            return 1


# In[9]:


def page_count(search_word):
    
    search_url = prepare_url(base_url,search_word)
        
    page_content = get_page_content(search_url,prepare_url(base_url,search_word))
        
    if (not page_content):
        
        return

    return get_page_count(page_content)


# > Obtenir les urls des pages

# In[10]:


def prepare_page_list(search_url,page_count):
        
    for i in range(1, page_count + 1):
        
        page_list.append(search_url + '&page=' + str(i))
        
    return page_list


# ## Obtentions des informations

# ### Obtentions des details

# > Details concernant la page
# - Nombre de produits par pages

# In[11]:


def get_details(url, headers,search_word):
    
    try:
        response = session.get(base_url, headers=headers)
        
        if response.status_code != 200:
            
            raise requests.HTTPError("Erreur - code status: "+ str(response.status_code))
        
        #Recuperation des details
        html = requests.get(url, headers=headers)
        
        soup = bs4(html.content , "lxml")
        
        all_asin = soup.find_all('div', {'class': 'sg-col-4-of-12 s-result-item s-asin sg-col-4-of-16 sg-col s-widget-spacing-small sg-col-4-of-20'})
        
        print("Nombre Produit: "+ str(len(all_asin)))
        
        
        for i in range(len(all_asin)):
            
            product = all_asin[i].find('div', {'class': 'a-section a-spacing-medium'})
            
            #Appel de la fontion obtention des informations
            
            get_product_info(product, all_asin[i]['data-asin'],base_url,search_word)

    except (requests.exceptions.ConnectionError, requests.HTTPError) as e:
        
        print(e + "Erreur pendant la connexion à :" + url)
        
        return None
        
    return response


# In[12]:


def get_product_info(div_product,asin_code, base_url,search_word):
    
    id_word = ''
    
    product["_id"] = ObjectId() 

    div_other_format = []
    
    print("Code ASIN: " + asin_code)
    
    #Insertion dans le dictionnaire des produits
    product["asin"] = asin_code
    
    if(div_product.find('img')):
        
        image = div_product.find('img')['src']
        
        print("Image : " + image)
        
        #Insertion dans le dictionnaire des produits
        product["image"] = image
        
    if(div_product.find('span', {'class': 'a-size-base-plus a-color-base a-text-normal'})):
        
        title = div_product.find('span', {'class': 'a-size-base-plus a-color-base a-text-normal'}).getText()
        
        print("Titre : "+title)
        
        #Insertion dans le dictionnaire des produits
        product["titre"] =  title
    
    if(div_product.find('a', {'class': 'a-link-normal s-no-outline'})):
        
        liens = div_product.find('a', {'class': 'a-link-normal s-no-outline'}).get('href')
        
        liens_ = base_url + liens
        
        print("Liens : "+liens_)
        
        #Insertion dans le dictionnaire des produits
        product["liens"] = liens_ 
        
        
    if(div_product.find('div', {'class': 'a-row a-size-base a-color-secondary'})):
        
        authors = []
        
        div_authors = div_product.find('div', {'class': 'a-row a-size-base a-color-secondary'}).find_all('a', {'class': 'a-size-base a-link-normal'})
        
        for i in range (len(div_authors)):
            
            authors.append(div_authors[i].getText())
            
        print("---------Auteur(s)-------")
            
        print(authors)
        
        #Insertion dans le dictionnaire des produits
        product["auteur"] = authors
            
    if(div_product.find('span', {'class': 'a-offscreen'})):
        
        price = div_product.find('span', {'class': 'a-offscreen'}).getText()
        
        print("Prix : " + price)
        
        #Insertion dans le dictionnaire des produits
        product["prix"] =  price
        
    if(div_product.find('div', {'class': 'a-row a-size-small'})):
        
        note = div_product.find('div', {'class': 'a-row a-size-small'}).find('span', {'class': 'a-icon-alt'}).getText()
        
        print("Note :" + note)
        
        #Insertion dans le dictionnaire des produits
        product["note"] = note
        
        nb_com = div_product.find('div', {'class': 'a-row a-size-small'}).find('span', {'class': 'a-size-base'}).getText()
        
        print("Nombre de commentaires : " + nb_com)
        
        #Insertion dans le dictionnaire des produits
        product["nbre_cmt"] = nb_com
        
    if(div_product.find('div', {'class': 'a-row a-size-small a-color-base'})):
        
        other_format = []
        
        if(div_product.find('div', {'class': 'a-row a-size-small a-color-base'}).find_all('a', {'class': 'a-size-base a-link-normal'})):  
            
            div_other_format = div_product.find('div', {'class': 'a-row a-size-small a-color-base'}).find_all('a', {'class': 'a-size-base a-link-normal'})
            
            for i in range (len(div_other_format)):

                other_format.append(div_other_format[i].getText())

            print("----------Format disponible ---------")

            print(other_format)
    
            #Insertion dans le dictionnaire des produits
            product["format"] = other_format
        
    if(div_product.find('span', {'class': 'a-badge-text'})):
        
        is_best_seller = True
        
        print("Oui, c'est un best seller")
        
    else :
        
        is_best_seller = False
        
        print("Non, ce n'est pas un best-seller")

   #Insertion dans le dictionnaire des produits
    product["best_seller"] =  is_best_seller
    
    id_word = search_word.replace(' ', '+')
    
    product["id_search_word"] = id_word
    
    
    
    
    
    
    
    #INSERTION DANS LA BD MONGO
    InsertedResultObj = product_BD.insert_one(product) 
    
    
    
        


# > Execution des fonctions
# - Le nombre de pages
# - Les liens recuillirs pour le produit

# In[13]:


def pre_search(search_word):

    #url = prepare_url(base_url, search_word)
    
    #initialisation
    list_pages_produits = []
    
    nbre_page = 0
    
    search_url = prepare_url(base_url,search_word)

    page_content = get_page_content(search_url,prepare_url(base_url,search_word))

    if (not page_content):
        
        return
    
    #nombre de pages
    page_count_ = get_page_count(page_content)

    print("----------Nombre de page -------- ")
    print(page_count_)
                        
    #liste des pages pour le produit
    page_list_ = prepare_page_list(search_url,page_count_)
    
    print("----------Liste des pages ------- ")
    print(page_list_)
    
    
    for i in range(len(page_list_)):
        
        print("------Page "+ str(i+1) +" ------- ")
        get_details(page_list_[i], headers,search_word) 


# ### Obtentions des infos produits

# In[14]:





# In[ ]:




