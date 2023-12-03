# SupportSage

This repository hosts an ML-driven tool designed to offer support ticket suggestions. It utilizes machine learning models and Flask as the backend application.

## Prerequisites

- [docker](https://docs.docker.com/install/)
- [docker-compose](https://docs.docker.com/compose/install/)
- [Live server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

## Getting Started

1. Run the following command to run and build container images.
```
cd support-sage
make build
```

2. Run the following to UP the docker containers.
```
make run
```

3. By default the backend api will run on `7007` port
```
Ex. URL: 0.0.0.0:7000/summarise
```

4. For running the front end, navigate to the support-sage-fe folder and serve the index.html using the live server.
   
   **NOTE** - The `support-sage-fe` folder should be opened in a new VS Code window to perform the above steps.

#### Installing Chrome extension
Chrome exension in not live, so in order to run chrome extension in your local. We need to follow below steps:
1. Go to the Extensions page by entering `chrome://extensions` in a new tab.
2. Alternatively, click on the Extensions menu puzzle button and select Manage Extensions at the bottom of the menu.
Or, click the Chrome menu, hover over More Tools, then select Extensions.
3. Enable Developer Mode by clicking the toggle switch next to Developer mode.
4. Click the Load unpacked button and select the extension directory chrome_ext.
Ta-da! The extension has been successfully installed. For details please visit [official documetation of chrome](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked)


## Resources

• [Flask](https://flask.palletsprojects.com/en/3.0.x/)

• [Kaggle Dataset](https://www.kaggle.com/datasets/suraj520/customer-support-ticket-dataset)

• [Text summariser](https://medium.com/saturdays-ai/building-a-text-summarizer-in-python-using-nltk-and-scikit-learn-class-tfidfvectorizer-2207c4235548)

• [Chrome developer guide](https://developer.chrome.com/docs/extensions/mv3/getstarted)

## Demo video & Presentations

• [Presentation](https://docs.google.com/presentation/d/1yJEe5H1mye1zozV9HiBRMWyUykaWRDoz6TEwH8QGPvk/edit#slide=id.g25f6af9dd6_0_0)


   
