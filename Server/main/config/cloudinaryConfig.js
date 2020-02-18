// Cloudinary is a cloud service that offers a solution to a web application's entire image management pipeline. 
// Automatically perform smart image resizing, cropping and conversion
// The sample me app hosts images on cloudinary 

const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: 'doanqz7r8',
  api_key: '618513172984447',
  api_secret: "-V1kTFVbnE-EtD82e7UMf7-Ah6I"
});

exports.uploads = (file) => {
  return new Promise(resolve => {
    cloudinary.uploader.upload(file, (result) => {
      resolve({ url: result.url, id: result.public_id })
    }, { resource_type: "auto" })
  })
}