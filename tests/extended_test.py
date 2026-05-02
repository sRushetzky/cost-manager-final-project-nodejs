import requests
import sys
import time


filename = input("filename=")

# Logs service
a = "https://cost-manager-logs-service-zaj4.onrender.com"

# Users service
b = "https://cost-manager-users-service-gnz4.onrender.com"

# Costs service
c = "https://cost-manager-costs-service-mju2.onrender.com"

# Admin service
d = "https://cost-manager-admin-service-ceoz.onrender.com"


output = open(filename, "w", encoding="utf-8")
sys.stdout = output


def print_section(title):
    print()
    print(title)
    print("-" * len(title))


def print_response(response):
    print("status_code=" + str(response.status_code))
    print("content=" + str(response.content))
    print("text=" + response.text)

    try:
        print("json=" + str(response.json()))
    except Exception as e:
        print("json parse problem")
        print(e)


# Create a unique user id for this test run
test_user_id = int(str(int(time.time()))[-6:])

print("a=" + a)
print("b=" + b)
print("c=" + c)
print("d=" + d)
print("test_user_id=" + str(test_user_id))


# 1. Test about endpoint
print_section("testing admin-service: GET /api/about")

try:
    url = d + "/api/about"
    response = requests.get(url)

    print("url=" + url)
    print_response(response)
except Exception as e:
    print("problem")
    print(e)


# 2. Test adding a new user
print_section("testing users-service: POST /api/add")

try:
    url = b + "/api/add"

    payload = {
        "id": test_user_id,
        "first_name": "test",
        "last_name": "user",
        "birthday": "2000-01-01"
    }

    response = requests.post(url, json=payload)

    print("url=" + url)
    print("payload=" + str(payload))
    print_response(response)
except Exception as e:
    print("problem")
    print(e)


# 3. Test list users
print_section("testing users-service: GET /api/users")

try:
    url = b + "/api/users"
    response = requests.get(url)

    print("url=" + url)
    print_response(response)
except Exception as e:
    print("problem")
    print(e)


# 4. Test specific user details before adding costs
print_section("testing users-service: GET /api/users/:id before costs")

try:
    url = b + "/api/users/" + str(test_user_id)
    response = requests.get(url)

    print("url=" + url)
    print_response(response)
except Exception as e:
    print("problem")
    print(e)


# 5. Test duplicate user error
print_section("testing users-service: duplicate user validation")

try:
    url = b + "/api/add"

    payload = {
        "id": test_user_id,
        "first_name": "duplicate",
        "last_name": "user",
        "birthday": "2000-01-01"
    }

    response = requests.post(url, json=payload)

    print("url=" + url)
    print("payload=" + str(payload))
    print_response(response)
except Exception as e:
    print("problem")
    print(e)


# 6. Test invalid user input
print_section("testing users-service: invalid user input")

try:
    url = b + "/api/add"

    payload = {
        "id": -5,
        "first_name": "bad",
        "last_name": "user",
        "birthday": "2000-01-01"
    }

    response = requests.post(url, json=payload)

    print("url=" + url)
    print("payload=" + str(payload))
    print_response(response)
except Exception as e:
    print("problem")
    print(e)


# 7. Test adding first cost item
print_section("testing costs-service: POST /api/add cost item 1")

try:
    url = c + "/api/add"

    payload = {
        "userid": test_user_id,
        "description": "milk",
        "category": "food",
        "sum": 10
    }

    response = requests.post(url, json=payload)

    print("url=" + url)
    print("payload=" + str(payload))
    print_response(response)
except Exception as e:
    print("problem")
    print(e)


# 8. Test adding second cost item
print_section("testing costs-service: POST /api/add cost item 2")

try:
    url = c + "/api/add"

    payload = {
        "userid": test_user_id,
        "description": "gym",
        "category": "sports",
        "sum": 50
    }

    response = requests.post(url, json=payload)

    print("url=" + url)
    print("payload=" + str(payload))
    print_response(response)
except Exception as e:
    print("problem")
    print(e)


# 9. Test adding cost for non-existing user
print_section("testing costs-service: cost for non-existing user")

try:
    url = c + "/api/add"

    payload = {
        "userid": 999999999,
        "description": "should fail",
        "category": "food",
        "sum": 10
    }

    response = requests.post(url, json=payload)

    print("url=" + url)
    print("payload=" + str(payload))
    print_response(response)
except Exception as e:
    print("problem")
    print(e)


# 10. Test invalid category
print_section("testing costs-service: invalid category")

try:
    url = c + "/api/add"

    payload = {
        "userid": test_user_id,
        "description": "car",
        "category": "cars",
        "sum": 10
    }

    response = requests.post(url, json=payload)

    print("url=" + url)
    print("payload=" + str(payload))
    print_response(response)
except Exception as e:
    print("problem")
    print(e)


# 11. Test invalid sum
print_section("testing costs-service: invalid sum")

try:
    url = c + "/api/add"

    payload = {
        "userid": test_user_id,
        "description": "bad sum",
        "category": "food",
        "sum": -5
    }

    response = requests.post(url, json=payload)

    print("url=" + url)
    print("payload=" + str(payload))
    print_response(response)
except Exception as e:
    print("problem")
    print(e)


# 12. Test monthly report for current month
print_section("testing costs-service: GET /api/report current month")

try:
    current_year = time.localtime().tm_year
    current_month = time.localtime().tm_mon

    url = c + f"/api/report?id={test_user_id}&year={current_year}&month={current_month}"
    response = requests.get(url)

    print("url=" + url)
    print_response(response)
except Exception as e:
    print("problem")
    print(e)


# 13. Test report for non-existing user
print_section("testing costs-service: report for non-existing user")

try:
    current_year = time.localtime().tm_year
    current_month = time.localtime().tm_mon

    url = c + f"/api/report?id=999999999&year={current_year}&month={current_month}"
    response = requests.get(url)

    print("url=" + url)
    print_response(response)
except Exception as e:
    print("problem")
    print(e)


# 14. Test invalid report month
print_section("testing costs-service: invalid report month")

try:
    current_year = time.localtime().tm_year

    url = c + f"/api/report?id={test_user_id}&year={current_year}&month=13"
    response = requests.get(url)

    print("url=" + url)
    print_response(response)
except Exception as e:
    print("problem")
    print(e)


# 15. Test missing report parameter
print_section("testing costs-service: missing report parameter")

try:
    current_year = time.localtime().tm_year

    url = c + f"/api/report?id={test_user_id}&year={current_year}"
    response = requests.get(url)

    print("url=" + url)
    print_response(response)
except Exception as e:
    print("problem")
    print(e)


# 16. Test user total after adding costs
print_section("testing users-service: GET /api/users/:id after costs")

try:
    url = b + "/api/users/" + str(test_user_id)
    response = requests.get(url)

    print("url=" + url)
    print_response(response)
except Exception as e:
    print("problem")
    print(e)


# 17. Test logs endpoint
print_section("testing logs-service: GET /api/logs")

try:
    url = a + "/api/logs"
    response = requests.get(url)

    print("url=" + url)
    print_response(response)
except Exception as e:
    print("problem")
    print(e)


output.close()