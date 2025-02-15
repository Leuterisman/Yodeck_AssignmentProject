export const TestData = {
  validUser: {
    email: "leuterismanioudakis@hotmail.com",
    password: "LEFman1996!",
  },
  invalidUser: {
    email: "leuteris@hotmail.com",
    password: "LEFman19",
  },
  unregisteredEmail: "testuser96@hotmail.com",
  invalidFormatEmail: "test@.com",

  validImage: "test-images/valid/valid-image1.jpg",
  validImages: [
    "test-images/valid/valid-image1.jpg",
    "test-images/valid/valid-image2.png",
  ],
  invalidImage: "test-images/invalid/large-image.jpg",
  validUrl: "https://www.mtp.es/wp-content/uploads/2019/03/testing.jpg",
  validUrls: [
    "https://www.mtp.es/wp-content/uploads/2019/03/testing.jpg",
    "https://www.psdstamps.com/wp-content/uploads/2022/04/test-stamp-png-768x512.png",
  ],
  invalidUrl: "https://www.google.com",
  searchKeyword: "Forest",
  validName: "Test Image",
  minDuration: 1,
  maxDuration: 99999,

  filters: {
    provider: "Pixabay",
    orientation: "Landscape",
    assetType: "Photo",
    category: "Nature",
  },
  searchErrorMessages: {
    emptyKeyword: "Type something to search for images",
  },
};
