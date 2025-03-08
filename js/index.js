let rise = document.querySelectorAll("#lift");
let after_lift = document.querySelectorAll("#after_lift");

rise.forEach((lifted, i) => {
  setTimeout(() => {
    lifted.style.display = "block";
    lifted.classList.add("animate-rise");
  }, i * 800);
});

setTimeout(() => {
  after_lift.forEach((lifted, i) => {
    setTimeout(() => {
      lifted.style.display = "flex";
      lifted.classList.add("animate-bounce");
    }, i * 200);
  });
}, 3000);
