const csvLoaderUtil = require("./fileLoader");
const ObjectsToCsv = require("objects-to-csv");
const csvLoader = new csvLoaderUtil();
const directoryCreatorUtil = require("./directoryCreator");
const directoryCreator = new directoryCreatorUtil();
const fileDownloderUtil = require("./fileDownloder");
const fileDownloder = new fileDownloderUtil();

const fileReadData = async function () {
  const allDownloads = [];
  const breaks = [];
  let fileData = await csvLoader.loadFiles({ filename: "test" });
  let folderCount = 0 ;
  for (let rowCounter = 0; rowCounter < fileData.length; rowCounter++) {
    if (!fileData[rowCounter].name) continue;
    folderCount = folderCount + 1;
    const dirPath = await directoryCreator.createDirectories(
      fileData[rowCounter].name
    );
    const imageURLs = (fileData[rowCounter].productImageUrl || "").split(";");
    if (imageURLs && imageURLs.length > 0) {
      for (
        let imageCounter = 0;
        imageCounter < imageURLs.length;
        imageCounter++
      ) {
        try {
          const imageUrl = `https://imageURL/${imageURLs[imageCounter]}`;
          const filepath = `${__dirname}/downloads/${dirPath}/${imageURLs[imageCounter]}`;
          await fileDownloder.download(imageUrl, filepath);
          allDownloads.push({
            dirPath,
            image: imageURLs[imageCounter],
          });
        } catch (err) {
          breaks.push({
            dirPath,
            image: imageURLs[imageCounter],
          });
        }
      }
    }
    console.log("Running row counter - " + rowCounter + " and downloded folder count is - "  + folderCount + " and total image count is -" + allDownloads.length) ;
  }
  console.log("allDownloads", allDownloads); // print that in csv files
  const csvallDownloads = new ObjectsToCsv(allDownloads);
  await csvallDownloads.toDisk(`${__dirname}/output/allDownloads.csv`);
  console.log("breaks", breaks); // print that in csv files
  const csvbreaks = new ObjectsToCsv(breaks);
  await csvbreaks.toDisk(`${__dirname}/output/breaks.csv`);
};

fileReadData();
