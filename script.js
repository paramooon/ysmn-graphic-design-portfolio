const cursor = document.querySelector(".cursor");
if (matchMedia("(pointer:fine)").matches) {
  addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });
  document.querySelectorAll("a,button,.project").forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("active"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("active"));
  });
}
const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    }),
  { threshold: 0.14 },
);
const revealElements = document.querySelectorAll(".reveal");
if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
  revealElements.forEach((el) => el.classList.add("visible"));
} else {
  revealElements.forEach((el) => observer.observe(el));
}
const heroVideo = document.querySelector(".showreel-video");
if (heroVideo && matchMedia("(prefers-reduced-motion: reduce)").matches) heroVideo.pause();
const nav = document.querySelector(".nav"),
  menu = document.querySelector(".menu-btn");
menu.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", open);
  menu.textContent = open ? "Закрыть" : "Меню";
});
document.querySelectorAll(".nav nav a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
    menu.textContent = "Меню";
  }),
);
const magnetic = document.querySelectorAll(".magnetic");
magnetic.forEach((el) => {
  el.addEventListener("mousemove", (e) => {
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.16}px,${(e.clientY - r.top - r.height / 2) * 0.16}px)`;
  });
  el.addEventListener("mouseleave", () => (el.style.transform = ""));
});
