import os
from email.message import EmailMessage
import smtplib
from emailContent import generate_email_content

def send_email(recipient, subject, body):
    try:
        msg = EmailMessage()
        msg['From'] = os.environ.get('MAIL_USERNAME')
        msg['To'] = recipient
        msg['Subject'] = subject
        msg.set_content(body)

        # connect to SMTP server
        server = smtplib.SMTP(os.environ.get('MAIL_SERVER'), int(os.environ.get('MAIL_PORT', 587)))
        server.starttls()
        server.login(os.environ.get('MAIL_USERNAME'), os.environ.get('MAIL_PASSWORD'))
        
        server.send_message(msg)
        server.quit()
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False
    

def generate_and_send_email(recipient_email, recipient_type, name):
    email_subject = "An Important Message From " + name
    email_body = generate_email_content(recipient_type, name)
    email_body += "\nLove, " + name
    if send_email(recipient_email, email_subject, email_body):
        print(f"Email sent successfully")
        return True
    else:
        print(f"Failed to send email")
        return False

if __name__ == '__main__':
    generate_and_send_email("anne12080901@gmail.com", "mom", "Max")
    