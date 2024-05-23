document.getElementById("upload").addEventListener("change", loadImage);
document.getElementById("brightness").addEventListener("input", updateImage);
document.getElementById("contrast").addEventListener("input", updateImage);
document.getElementById("grayscale").addEventListener("input", updateImage);
document.getElementById("reset").addEventListener("click", resetImage);
document.getElementById("download").addEventListener("click", downloadImage);

document
  .getElementById("rotate-left")
  .addEventListener("click", () => rotateImage(-90));
document
  .getElementById("rotate-right")
  .addEventListener("click", () => rotateImage(90));
document
  .getElementById("rotate-up")
  .addEventListener("click", () => rotateImage(0));
document
  .getElementById("rotate-down")
  .addEventListener("click", () => rotateImage(180));

let image = document.getElementById("image");
let currentRotation = 0;

function loadImage(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      image.src = e.target.result;
      resetFilters();
      currentRotation = 0;
      image.style.transform = `rotate(${currentRotation}deg)`;
    };
    reader.readAsDataURL(file);
  }
}

function updateImage() {
  const brightness = document.getElementById("brightness").value;
  const contrast = document.getElementById("contrast").value;
  const grayscale = document.getElementById("grayscale").value;
  image.style.filter = `brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%)`;
}

function rotateImage(degrees) {
  if (degrees === 0) {
    currentRotation = 0;
  } else {
    currentRotation = (currentRotation + degrees) % 360;
  }
  image.style.transform = `rotate(${currentRotation}deg)`;
}

function resetImage() {
  resetFilters();
  document.getElementById("brightness").value = 100;
  document.getElementById("contrast").value = 100;
  document.getElementById("grayscale").value = 0;
  currentRotation = 0;
  image.style.transform = `rotate(${currentRotation}deg)`;
}

function resetFilters() {
  image.style.filter = "brightness(100%) contrast(100%) grayscale(0%)";
}

function downloadImage() {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const img = document.getElementById("image");
  const width = img.naturalWidth;
  const height = img.naturalHeight;

  canvas.width = width;
  canvas.height = height;

  context.filter = img.style.filter;
  context.translate(width / 2, height / 2);
  context.rotate((currentRotation * Math.PI) / 180);
  context.drawImage(img, -width / 2, -height / 2);

  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/jpeg");
  link.download = "edited-image.jpg";
  link.click();
}
