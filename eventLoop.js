console.log(12);
setTimeout(() => {
  console.log(6);
}, 0);

console.log(1);

const fn = async () => {
  f().then(() => {
    console.log(4);
  });
};

fn().then(() => {
  console.log(88);
});

Promise.resolve()
  .then(() => {
    console.log(54);
  })
  .then(() => {
    console.log(99);
  });

async function f() {
  return new Promise((resolve) => {
    console.log(9);
    resolve();
  });
}

console.log(28);
