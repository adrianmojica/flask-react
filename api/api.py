import time
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from flask import Flask, request, render_template

app = Flask(__name__, static_folder='../build', static_url_path='/')



@app.route('/')
def index():
    return render_template("index.html")

@app.route('/confirmation')
def show_confirmation():
    return render_template("confirmation.html")


@app.route('/api/email-out')
def get_current_time():
    # message = Mail(
    # from_email='adrian@houseofbeards.me',
    # to_emails='adrian.mojica@gmail.com',
    # subject='Sending with Twilio SendGrid is Fun',
    # html_content='<strong>and easy to do anywhere, even with Python</strong>')

    # try:
    #     sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
    #     response = sg.send(message)
    #     print(response.status_code)
    #     print(response.body)
    #     print(response.headers)
    # except Exception as e:
    #     print(e.body)

    # print(message)        
    return {'message': 'done'}
