import iconv from "iconv-lite";

function assert(b: boolean): asserts b {
  if (!b) {
    throw new Error("assertion failed");
  }
}

function createGenreIni(
  name: string,
  backgroundColor: string,
  foregroundColor: string,
): string {
  return [
    "[Genre]",
    `GenreName=${name}`,
    `GenreColor=${backgroundColor}`,
    `FontColor=${foregroundColor}`,
  ].join("\r\n");
}

function stringToDownloadableUri(s: string): string {
  const encoded = iconv.encode(s, "SHIFT-JIS");
  let uri = "data:text/plain;charset=shift-jis,";
  for (const byte of encoded) {
    uri += `%${byte.toString(16).padStart(2, "0")}`;
  }
  return uri;
}

function main() {
  const genreNameInput = document.getElementById("genre-name");
  const backgroundColorInput = document.getElementById("background-color");
  const foregroundColorInput = document.getElementById("foreground-color");
  const downloadButton = document.getElementById("download");

  assert(
    genreNameInput instanceof HTMLInputElement &&
      backgroundColorInput instanceof HTMLInputElement &&
      foregroundColorInput instanceof HTMLInputElement &&
      downloadButton instanceof HTMLButtonElement,
  );

  downloadButton.addEventListener("click", () => {
    const genreIni = createGenreIni(
      genreNameInput.value,
      backgroundColorInput.value,
      foregroundColorInput.value,
    );
    const a = document.createElement("a");
    a.href = stringToDownloadableUri(genreIni);
    a.download = "genre.ini";
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    a.remove();
  });
}

main();
