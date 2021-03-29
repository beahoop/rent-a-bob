from django.test import TestCase, Client

    # client = Client()
from django.test import Client
c = Client()
response = c.post('/login/', {'username': 'bob', 'password': 'safepass1'})
response.status_code

# def test_create(self):
#     """Test the url for "create"
#     """
#
#     response = self.client.get('match/')
#     self.assertEqual(response.status_code, 200)
