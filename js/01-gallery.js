import { galleryItems } from "./gallery-items.js";

let gallery = document.querySelector(".gallery");

gallery.insertAdjacentHTML(
  "afterbegin",
  galleryItems
    .map(
      (galleryItem) =>
        `<li class="gallery__item">
  <a class="gallery__link" href="${galleryItem.original}">
    <img
      class="gallery__image"
      src="${galleryItem.preview}"
      data-source="${galleryItem.original}"
      alt="${galleryItem.description}"
    />
  </a>
</li>`
    )
    .join("")
);

gallery.addEventListener("click", (e) => {
  e.preventDefault();
  const target = e.target;

  if (target.tagName === "IMG") {
    const largeImageSrc = target.getAttribute("data-source");
    const instance = basicLightbox.create(`
      <img src="${largeImageSrc}" width="800" height="600">
    `);

    const handleKeyPress = (e) => {
      if (e.code === "Escape") {
        instance.close(() =>
          document.removeEventListener("keydown", handleKeyPress)
        );
      }
    };

    instance.show(() => document.addEventListener("keydown", handleKeyPress));
  }
});
