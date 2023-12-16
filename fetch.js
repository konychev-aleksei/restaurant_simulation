const accessToken =
  "2cb934c12cb934c12cb934c1802faf54c622cb92cb934c149e58147847220518da99af9";
const startId = 210073651;
const finalId = 53083705;

const count = 100;
const maxDepth = 6;
const numberOfUsers = 10;

const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

const getUserFriends = async (id) => {
  const response = await fetch(
    `https://api.vk.com/method/friends.get?user_id=${id}&count=${count}&access_token=${accessToken}&v=5.154`
  );

  const data = await response.json();

  return data.response?.items ?? null;
};

const getUserById = async (id) => {
  const response = await fetch(
    `https://api.vk.com/method/users.get?user_ids=${id}&access_token=${accessToken}&v=5.154&fields=photo_200`
  );

  const data = await response.json();

  console.log(data);

  const {
    id: userId,
    first_name,
    last_name,
    photo_200: photo,
  } = data.response[0];
  return { photo, userId, fullName: `${last_name} ${first_name}` };
};

/*
(async () => {
  let id = startId;

  for (let i = 0; i < maxDepth; ++i) {
    const userIds = await getUserFriends(id);

    if (!userIds) {
      console.log(
        `Данный аккаунт id${id} приватный, невозможно узнать список друзей`
      );
      continue;
    }

    await sleep();

    for (let j = 0; j < numberOfUsers; ++j) {
      const randomId = Math.floor(Math.random() * 100);
      id = userIds[randomId];

      const { userId, fullName } = await getUserById(id);
      console.log(
        `Количество рукопожатий: ${
          i + 1
        } - Полное имя: ${fullName}; vkId: ${userId};`
      );

      await sleep();
    }
    console.log("\n");
  }
})();
*/

(async () => {
  const runSearch = async () => {
    const startIds = await getUserFriends(startId);
    const finalIds = await getUserFriends(finalId);

    console.log({ finalIds, startIds });
  };

  runSearch();
})();
