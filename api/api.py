import time
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from flask import Flask, request, render_template, redirect

app = Flask(__name__, static_folder='../build', static_url_path='/')



@app.route('/')
def index():
    return render_template("index.html")

@app.route('/confirmation', methods =['POST'])
def show_confirmation():
    """Creates and returns the email with all the info and template"""
    data = request.get_json()
    name = data['name']
    discount = data['discount']
    code = data['code']
    email = data['email']
    
    if data['template'] == 'fall':
        return render_template("fall.html",
                           name=name,
                           discount=discount,
                           code=code,
                           email=email)
    if data['template'] == 'summer':
        return render_template("summer.html",
                           name=name,
                           discount=discount,
                           code=code,
                           email=email)
    if data['template'] == 'holiday':
        return render_template("holiday.html",
                           name=name,
                           discount=discount,
                           code=code,
                           email=email)
    

@app.route('/api/email-out',methods = ['POST'])
def send_email():
    """sends email to final destination"""
    data = request.get_json()
    print(data)
    message = Mail(
    from_email='adrian@houseofbeards.me',
    to_emails=data['email'],
    subject=f'{data["name"]}! save {data["discount"]} with this Coupon',
    html_content=f'<strong>Hi, {data["name"]}. <br> Get {data["discount"]}% off, when you enter the code {data["code"]} at checkout.</strong>')
    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
    except Exception as e:
        print(e.body)
    print(message)        
    return {'message': 'done'}
