![Index app](https://github.com/andresWeitzel/Modulo_MobileNET_CNN_Tensorflow_NodeJs/blob/master/doc/cnn-sample.png)

# Módulo_MobileNET_CNN_Tensorflow_NodeJs

* Módulo para la implementación del Modelo MobileNET de Red Neuronal Convolucional para la Clasificación de Imágenes

## Requisitos
* [Microsoft Visual Studio](https://bobbyhadz.com/blog/npm-err-gyp-err-find-vs-you-need-to-install-the-latest-version)
* [Python](https://www.python.org/downloads/)

## Ejecución del Proyecto
* Crear un entorno de trabajo a través de algún IDE
* Clonar el Proyecto (`git clone https://github.com/andresWeitzel/Modulo_MobileNET_CNN_Tensorflow_NodeJs`)
* `IMPORTANTE` : Para el uso de tensorflow en w10 es necesario tener instalado el complemento Desktop development with C++ de visual studio. Para instalarlo [seguir estos pasos](https://bobbyhadz.com/blog/npm-err-gyp-err-find-vs-you-need-to-install-the-latest-version). Además de tener instalado y configurado [Python](https://www.python.org/downloads/)
* Dentro del directorio instalar todos los plugins implementados
  * `npm install -g npm@latest` (Última version compatible de npm)
  * `npm install -S @tensorflow/tfjs`([TensorFlow.js Core](https://github.com/tensorflow/tfjs#tensorflowjs))
  * `npm install -S @tensorflow/tfjs-node` ([TensorFlow.js Node.js extension](https://www.npmjs.com/package/@tensorflow/tfjs-node))
  * `npm install -S @tensorflow-models/mobilenet` ([MobileNet Model](https://www.npmjs.com/package/@tensorflow-models/mobilenet))

</br>

### Doc Oficial
* [TensorFlow Core](https://github.com/tensorflow/tfjs#tensorflowjs)
* [TensorFlow Api NodeJs](https://js.tensorflow.org/api_node/4.0.0/)
* [MobileNET v1](https://github.com/tensorflow/models/blob/master/research/slim/nets/mobilenet_v1.md)

### Doc No Oficial
* [Referencia Base](https://becominghuman.ai/image-classification-machine-learning-in-node-js-with-tensorflow-js-dd8e20ba5024)
* [Repositorio Base](https://github.com/tejas77/node-image-classification)

</br>

## Modelo de Capa de Lectura y Decodificación de Imagen 

</br>

  ``` js
   //Imports
   const tf = require('@tensorflow/tfjs');
   const tfnode = require('@tensorflow/tfjs-node');
   const fs = require('fs');

   module.exports.exec = (path) => {

       const imageBuffer = fs.readFileSync(path);
       const tfimage = tfnode.node.decodeImage(imageBuffer);

       return tfimage;
   }

  ```
  
  </br>

## Modelo de Capa de Clasificación de Imagen 

</br>

  ``` js
    //Imports
    const read= require('../fileSystem/read');
    const mobileNet = require('@tensorflow-models/mobilenet');


    const classificator = async(path) =>{
        try {
            const img = read.exec(path);
            const model = await mobileNet.load();
            const predictions = await model.classify(img);
            console.log('Classification Results : ', predictions);
        } catch (error) {
            console.log(error);
        }
    }

    if (process.argv.length !== 3) throw new Error('Incorrect arguments!');

    classificator(process.argv[2]);

  ```
  
  ## Ejecución del Modelo MobileNET
  * Las Imágenes se almacenan en el directorio `src/img`
  * Seleccionamos alguna imagen para que el modelo la clasifique..
  
  ### Primera Clasificación del Modelo
  ![Index app](https://github.com/andresWeitzel/Modulo_MobileNET_CNN_Tensorflow_NodeJs/blob/master/src/img/test04.jpg)
  
  </br>
  
  * En mi caso he eliminado la metadata de la imagen y nombre para que el modelo clasifique según su grado de confianza.
  * Ejecutamos el modelo desde `src/runners/classificator` con `node classificator.js ../img/test04.jpg`
  * Salida Esperada...
  
   ``` js
         2022-11-20 20:09:04.459159: I tensorflow/core/platform/cpu_feature_guard.cc:193] This TensorFlow binary is optimized with oneAPI Deep Neural Network Library (oneDNN) to use the following CPU instructions in 
   performance-critical operations:  AVX2
   To enable them in other operations, rebuild TensorFlow with the appropriate compiler flags.
   Classification Results :  [
     { className: 'espresso', probability: 0.9372739195823669 },        
     { className: 'cup', probability: 0.02711259014904499 },
     { className: 'mortar', probability: 0.008303580805659294 }
   ]

  ```
  
  * Alta probabilidad para `espresso` (café expreso). Intervalo de Confianza Alto y Clasificación Correcta.
  
  </br>
  
  ### Segunda Clasificación del Modelo
  ![Index app](https://github.com/andresWeitzel/Modulo_MobileNET_CNN_Tensorflow_NodeJs/blob/master/src/img/test05.jpg)
  
  </br>
  
  * En mi caso he eliminado la metadata de la imagen y nombre para que el modelo clasifique según su grado de confianza.
  * Ejecutamos el modelo desde `src/runners/classificator` con `node classificator.js ../img/test05.jpg`
  * Salida Esperada...
  
   ``` js
        2022-11-20 20:11:07.652384: I tensorflow/core/platform/cpu_feature_guard.cc:193] This TensorFlow binary is optimized with oneAPI Deep Neural Network Library (oneDNN) to use the following CPU instructions in 
   performance-critical operations:  AVX2
   To enable them in other operations, rebuild TensorFlow with the appropriate compiler flags.
   Classification Results :  [
     {
       className: 'microwave, microwave oven',
       probability: 0.3682105839252472
     },
     { className: 'coffeepot', probability: 0.08597368746995926 },      
     { className: 'paper towel', probability: 0.08168061077594757 }     
   ]

  ```
  
  * Alta probabilidad para `microwave` (microondas). Podemos Notar que el Modelo no aplica un intervalo de confianza aceptable para varios objetos. El modelo logró predecir que hay un `cofeepot` (cafetera) pero con baja probabilidad. Intervalo de Confianza Bajo y Clasificación Correcta. Para este caso se deberá aplicar un ajuste fino de parámetros del modelo.

 
  
  
