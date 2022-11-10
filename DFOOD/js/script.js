console.log("helloww!");

// const h1 = document.querySelector(".heading-primary");
// h1.addEventListener("click" ,function () {
//   h1.style.backgroundColor = "red";
//   h1.style.padding = "10rem";
// });

///////////////////////////////////////////////////////////
// set current year
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

///////////////////////////////////////////////////////////
// make mobile navigation work
const navBtn = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector("header");
navBtn.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

///////////////////////////////////////////////////////////
// sticky navigation
const heroEl = document.querySelector(".section-hero");
const observer = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (!ent.isIntersecting){
      // adding sticky to the parent of header ie. body to 
      // solve the margin problem(header jumps out of the page so the
      // page goes up a little bit when header is sticky)
      document.body.classList.add("sticky");}

      if (ent.isIntersecting){
        document.body.classList.remove("sticky");}
  },
  {
    // in the viewport
    root: null,
    threshold: 0,
    rootMargin: "-70px",
  }
);
observer.observe(heroEl);

///////////////////////////////////////////////////////////
// smooth scrolling animation
// (because scroll-behavior: smooth; not working in safari )
const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    headerEl.classList.toggle("nav-open");
    // scroll back to top
    if (href === "#") window.scrollTo({ top: 0, behavior: "smooth" });

    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }
  });
});

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

