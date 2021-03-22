# TFBS

This application is a tool to identify most likely transcription factor binding sites in a DNA sequence with data from Jaspar. The frontend and backend of this application is hosted on Heroku.

http://tfbs-backend.herokuapp.com/ 

http://tfbs-frontend.herokuapp.com/ 

# How to run on your local machine

## Backend

First, clone this repository to your local machine.

Open the directory in your terminal, and create a virtual environment:

```bash
python3 -m venv venv
```

Activate the virtual environment:

```bash
source venv/bin/activate
```

Install the requirements:

```bash
pip install -r requirements.txt
```

To run the server:

```
python manage.py runserver
```

The API should now be running on http://127.0.0.1:8000/ 

## Frontend

Open the frontend directory in your terminal, and install the necessary packages

```bash
cd frontend && npm install
```

To start the server:

```bash
npm run start
```

The application should now be available at http://localhost:3000/ for use.