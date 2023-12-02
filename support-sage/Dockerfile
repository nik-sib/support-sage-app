FROM python:3.10
WORKDIR /app

RUN python -m pip install --upgrade pip
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
EXPOSE 7007
COPY . .
CMD [ "python", "app.py" ]
