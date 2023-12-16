import requests
import time
import random

accessToken = "2cb934c12cb934c12cb934c1802faf54c622cb92cb934c149e58147847220518da99af9"
startId = 210073651
count = 100
maxDepth = 6
numberOfUsers = 3

def sleep(ms=1000):
    time.sleep(ms / 1000)

def getUserFriends(id):
    response = requests.get(f"https://api.vk.com/method/friends.get?user_id={id}&count={count}&access_token={accessToken}&v=5.154")
    data = response.json()
    return data.get("response", {}).get("items", None)

def getUserById(id):
    response = requests.get(f"https://api.vk.com/method/users.get?user_ids={id}&access_token={accessToken}&v=5.154")
    data = response.json()
    user = data.get("response", [{}])[0]
    userId = user.get("id")
    fullName = f"{user.get('last_name', '')} {user.get('first_name', '')}"
    return {"userId": userId, "fullName": fullName}

def main():
    id = startId
    for i in range(maxDepth):
        userIds = getUserFriends(id)
        if not userIds:
            print(f"Данный аккаунт id{id} приватный, невозможно узнать список друзей")
            continue
        sleep()
        for j in range(numberOfUsers):
            randomId = random.randint(0, 99)
            id = userIds[randomId]
            user = getUserById(id)
            userId = user["userId"]
            fullName = user["fullName"]
            print(f"#{j + 1} - Количество рукопожатий: {i + 1} - Полное имя: {fullName}; vkId: {userId};")
            sleep()
        print("\n")

main()

