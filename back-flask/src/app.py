from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson import ObjectId
from scraper import *


app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/groupe4'
mongo = PyMongo(app)

# Settings
CORS(app)

# Database
db = mongo.db.product


##############--PRODUIT--################
@app.route('/products/<id_search_word>/', methods = ['GET'])
def getProducts(id_search_word):
    products = []
    for doc in db.find({'id_search_word':id_search_word}):
        products.append({
            '_id': str(ObjectId(doc['_id'])),
            'asin': doc['asin'],
            'titre': doc['titre'],
            'image': doc['image'],
            'prix': doc['prix'],
            'note': doc['note'],
            'nbre_cmt': doc['nbre_cmt'],
            'format': doc['format'],
            'best_seller': doc['best_seller'],
            'liens': doc['liens'],
            'id_search_word': doc['id_search_word'],
            'auteur': doc['auteur']

        })
    return jsonify(products)


@app.route('/product/<asin>', methods=['GET'])
def getProduct(asin):
  product = db.find_one({'asin': asin})
  return jsonify({

        '_id': str(ObjectId(product['_id'])),
        'asin': product['asin'],
        'titre': product['titre'],
        'image': product['image'],
        'prix': product['prix'],
        'note': product['note'],
        'nbre_cmt': product['nbre_cmt'],
        'format': product['format'],
        'best_seller': product['best_seller'],
        'liens': product['liens'],
        'id_search_word': product['id_search_word'],
        'auteur': product['auteur']

  })



@app.route('/search/<search_word>', methods=['GET'])
def getPresearch(search_word):
    print(search_word)
    pre_search(search_word)
    webbrowser.open('http://localhost:3000/all', new= 2)


if __name__ == '__main__':
    app.debug=True
    app.run(host='localhost',port=5005)