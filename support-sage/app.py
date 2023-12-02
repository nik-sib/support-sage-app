from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import csv
import nltk
import os
import re
import random
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from nltk.corpus import stopwords

nltk.download('punkt')
nltk.download('stopwords')

app = Flask(__name__)
CORS(app)
resources = {r"/api/*": {"origins": "*"}}
app.config["CORS_HEADERS"] = "Content-Type"
app.config['JSON_SORT_KEYS'] = False

csv_file = 'train_data.csv'
customer_tickets_csv = 'customer_support_tickets.csv'
new_data_csv = 'new_data.csv'
threads = [
    'https://test.slack.com/archives/CDAFSHNDMR45/p1701505495465299',
    'https://test.slack.com/archives/C0FY340QAIOP/p1701505495345679',
    'https://test.slack.com/archives/DOARFGAOP901/r1ewew015054954659',
]
tickets = [
    'https://test.atlassian.net/browse/ABC-121',
    'https://test.atlassian.net/browse/XYZ-123',
    'https://test.atlassian.net/browse/GCC-322'
]


@app.route('/summarise', methods=['POST'])
def summarise():
    json_data = request.get_json()
    input_text = json_data['input_text']

    num_sentences = 1
    summary_result = summarize_text(input_text, num_sentences)
    # print("Original Text:")
    # print(input_text)
    # print("\nSummary:")
    # print(summary_result)
    return jsonify({'result': summary_result})


@app.route('/add-data', methods=['POST'])
def addData():
    input_data = request.get_json()
    columns = list(input_data.keys())

    existing_columns = []
    if os.path.isfile(csv_file):
        with open(csv_file, 'r', newline='') as csvfile:
            reader = csv.DictReader(csvfile)
            existing_columns = reader.fieldnames

    if existing_columns is None:
        existing_columns = []

    # Add only new columns to the existing columns
    for column in columns:
        if column not in existing_columns:
            existing_columns.append(column)

    with open(csv_file, mode='a', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=existing_columns)
        if file.tell() == 0:  # Check if file is empty (write header only if file is empty)
            writer.writeheader()
        writer.writerow(input_data)

    return 'Data saved successfully'


@app.route('/suggest', methods=['POST'])
def suggest():
    json_data = request.get_json()
    input_text = json_data['input_text']

    # Load the SVM model
    svm_classifier = joblib.load('svm_classifier.joblib')
    # Load the TfidfVectorizer used during training
    tfidf_vectorizer = joblib.load('tfidf_vectorizer.joblib')

    new_predict_tfidf = tfidf_vectorizer.transform([input_text])

    # Use the trained SVM model for prediction
    prediction = svm_classifier.predict(new_predict_tfidf)
    # serialized_data = prediction.tolist()

    oldCols = ['Ticket Description', 'Ticket Type', 'Resolution']
    newDf = {
        'Ticket Description': input_text,
        'Ticket Type': prediction,
        'Resolution': ''
    }

    data = pd.read_csv(customer_tickets_csv)

    oldDf = data[oldCols]
    newDf = pd.DataFrame(newDf)
    combinedDf = pd.concat([oldDf, newDf], ignore_index=True)
    combinedDf.to_csv(new_data_csv, index=False)

    all_tickets = pd.read_csv('new_data.csv')
    all_tickets['Resolution'] = all_tickets['Resolution'].fillna('This is a default text')
    tfidf_data = all_tickets['Ticket Description'];
    tfidf_matrix = tfidf_vectorizer.fit_transform(tfidf_data)

    similarities = cosine_similarity(tfidf_matrix[-1], tfidf_matrix[:-1])

    num_similar_tickets = 5
    most_similar_indices = similarities.argsort()[0][-num_similar_tickets:][::-1]

    responses_list = []
    for idx in most_similar_indices:
        similar_ticket_resolution = all_tickets.iloc[idx]['Resolution']
        similarity_score = similarities[0, idx]
        responses_list.append(
            {
                'resolution': similar_ticket_resolution,
                'score': format(similarity_score * 100, '.1f'),
                'threads': random.choice(threads),
                'tickets': random.choice(tickets)
            }
        )

    return jsonify({"suggestions": responses_list})


def preprocess_text(text):
    # Remove special characters and digits using regular expressions
    text = re.sub(r'\s+', ' ', text)
    text = re.sub('[^a-zA-Z]', ' ', text)

    return text


def remove_duplicate_sentences(text):
    sentences = nltk.sent_tokenize(text)
    unique_sentences = list(set(sentences))

    return ' '.join(unique_sentences)


def summarize_text(text, num_sentences=3):
    # Remove duplicate sentences from the original text
    text = remove_duplicate_sentences(text)
    # Tokenize the text into sentences using nltk.sent_tokenize
    sentences = nltk.sent_tokenize(text)
    # Preprocess each sentence
    preprocessed_sentences = [preprocess_text(sentence) for sentence in sentences]
    # Create a TF-IDF vectorizer
    vectorizer = TfidfVectorizer(stop_words=stopwords.words('english'))
    # Transform the sentences into a TF-IDF matrix
    tfidf_matrix = vectorizer.fit_transform(preprocessed_sentences)
    # Calculate sentence scores based on the TF-IDF matrix
    sentence_scores = tfidf_matrix.sum(axis=1).A1  # Convert sparse matrix to dense array
    # Get the indices of the top-ranked sentences
    top_sentences_indices = sentence_scores.argsort()[-num_sentences:][::-1]
    top_sentences_indices.sort()
    summary = ' '.join([sentences[i] for i in top_sentences_indices])

    return summary


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=7007)
