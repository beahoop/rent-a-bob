# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client


# Your Account Sid and Auth Token from twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = 'AC27b9a6ee86f6fa43c487b52871ecadf6'
auth_token = 'd485cd6a417d742402c8057ad7a3f05c'
# account_sid = os.environ['TWILIO_ACCOUNT_SID']
# auth_token = os.environ['TWILIO_AUTH_TOKEN']
client = Client(account_sid, auth_token)

message = client.messages \
                .create(
                     body="Hey Sarah",
                     from_='+18643623181',
                     to='+18438227793'
                 )

print(message.sid)
