import requests
import jwt

SECRET_KEY = 'django-insecure-z=fzuyb&*q!itxsz@$&mpb=b3t!_#qjtq^p&=9l5@lv*r@6%h-'

def decode_jwt(token):
    try:
        # Giải mã mà không xác minh chữ ký để tránh cần SECRET_KEY
        payload = jwt.decode(token, options={"verify_signature": False})
        return payload
    except jwt.InvalidTokenError:
        raise Exception('Invalid token')

# URL của API backend để đăng nhập và nhận token
login_url = "http://127.0.0.1:8888/api/manager/login/"

# Thông tin đăng nhập
login_data = {"email": "nguyenvanphuoc09112004@gmail.com", "password": "1234"}
    # {"email": "quang@gmail.com", "password": "1234"}
    # {"email": "quang1@gmail.com", "password": "1234"}

# Gửi yêu cầu POST để đăng nhập và lấy token
response = requests.post(login_url, json=login_data)

if response.status_code == 200:
    tokens = response.json()
    access_token = tokens.get("access_token")
    refresh_token = tokens.get("refresh_token")
    print("Access Token:", access_token)
    print("Refresh Token:", refresh_token)
else:
    print("Error:", response.status_code)
    print(response.json())
    exit()



import requests




session = requests.Session()  # Sử dụng session để duy trì cookie




# URL để thêm sản phẩm vào giỏ hàng
post_url = "http://127.0.0.1:8888/api/create_appointments/"

# Headers với CSRF token và Access Token

# access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMyMzAwMzYyLCJpYXQiOjE3MzIzMDAzMDIsImp0aSI6ImViNjE1NDc4ZDU4NDQ2OWQ4M2JjMjc1ZjAxYmRjOTdjIiwidXNlcl9pZCI6MX0.J68Wq1-DmjaDUKRnX0ALVc0tHNc5_xo_2vFXcMdTqcQ"

headers = {
    # "Authorization": f"Bearer {access_token}",
    "Content-Type": "application/json",

}

# # Dữ liệu gửi đến API
# body = {
#     "good_id": 10,
#     "quantity": 2
# }

body = {
    "patient": "phuoc siu cap",
    "doctor": 'phuoc',
    "appointment_date": "2024-11-21",
    "status": "Pending",
    "notes": "Khám tổng quát"
}


# Gửi yêu cầu POST
response = session.post(post_url, headers=headers, json= body)

# Kiểm tra kết quả
if response.status_code == 200:
    print("Thành công:", response.json())
else:
    print("Lỗi:", response.status_code)
    print(response.json())

print("------------------------------------")
print("------------------------------------")

# Logout
logout_url = "http://127.0.0.1:8888/api/manager/logout/"
# logout_url = "http://127.0.0.1:8888/api/manager/token/refresh/"

# Dữ liệu gửi đi, lưu ý rằng đây là refresh_token trong phần thân yêu cầu

# test refresh token trong blacklist
# refresh_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTczMjkwNjM5MSwiaWF0IjoxNzMyMzAxNTkxLCJqdGkiOiI2ODVlYzQxMGQ4M2Q0ZDYwOGMwMGExYWQyZjkzYmU4YSIsInVzZXJfaWQiOjF9.P6PVL0WEJrwvAIcgdI_NOOWPiEzMMsEUy0Ea9-tQIMI"

logout_data = {
    "refresh_token": refresh_token
    # "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTczMjkwMzQ2MSwiaWF0IjoxNzMyMjk4NjYxLCJqdGkiOiJmYzI1YzUxZmU3ZDM0MzJlYjZmYTE5OWI0YjEzNGM1NCIsInVzZXJfaWQiOjF9.C8LzaNBdCzhkLcDJqTML8CAmDhQGbxsVRYA7Y_kY-nk"
}



headers = {
    "Authorization": f"Bearer {access_token}",
    "Content-Type": "application/json",
}

# Sử dụng tham số json thay vì data
logout_response = requests.post(logout_url, json=logout_data, headers=headers)

# Kiểm tra kết quả logout
if logout_response.status_code == 200:
    print("Logout thành công:", logout_response.json())
else:
    print("Logout thất bại:", logout_response.status_code)
    print(logout_response.json())



print("------------------------------------")
print("------------------------------------")


