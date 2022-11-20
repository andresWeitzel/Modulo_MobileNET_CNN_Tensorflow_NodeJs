//Imports
const read = require('../fileSystem/read');
const mobileNet = require('@tensorflow-models/mobilenet');


const classificator = async(path) =>{
    try {
        const img = read(path);
        const model = await mobileNet.load();
        const predictions = await model.classify(img);
        console.log('Classification Results : ', predictions);
    } catch (error) {
        console.log(error);
    }
}

if (process.argv.length !== 3) throw new Error('Incorrect arguments: node classify.js <IMAGE_FILE>');

classificator(process.argv[2]);