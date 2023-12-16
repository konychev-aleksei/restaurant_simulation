/*

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

fn();

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

/* 

f1();

Promise.resolve().then(() => {
  console.log(2);
});

async function f1() {
  f2().then(() => {
    console.log(1);
  });
}

async function f2() {
  return new Promise((resolve) => {
    resolve();
  });
}

/*  */
/*
f1();

Promise.resolve().then(() => {
  console.log(2);
});

async function f1() {
  f2().then(() => {
    Promise.resolve().then(() => {
      console.log(1);
    });
  });
}

async function f2() {}





f1();

Promise.resolve().then(() => {
  console.log(2);
});

async function f1() {
  await f2();
  console.log(1);
}

async function f2() {
  return new Promise((resolve) => {
    resolve();
  });
}
*/

f1();

Promise.resolve().then(() => {
  console.log(2);
});

async function f1() {
  f2().then(() => {
    console.log(1);
  });
}

async function f2() {
  return new Promise((resolve) => {
    resolve();
  });
}

///

f1();

Promise.resolve().then(() => {
  console.log(2);
});

async function f1() {
  f2()
    .then(() => {
      return new Promise((resolve) => {
        resolve();
      });
    })
    .then(() => {
      console.log(1);
    });
}

async function f2() {}

/// 


