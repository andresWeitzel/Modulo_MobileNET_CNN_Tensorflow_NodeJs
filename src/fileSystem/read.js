//Imports
const tf = require('@tensorflow/tfjs');
const tfnode = require('@tensorflow/tfjs-node');
const fs = require('fs');



module.exports.exec = (path) => {
  
    const imageBuffer = fs.readFileSync(path);
    const tfimage = tfnode.node.decodeImage(imageBuffer);
    
    return tfimage;
}