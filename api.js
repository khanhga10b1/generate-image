// // New 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
// import OpenAI from 'openai';


// const openai = new OpenAI({
//   apiKey: "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" // This is also the default, can be omitted
// });


// const prompt = "A sketch of a cat playing basketball";
// const numberOfImages = 2;
// const imageSize = "1024x1024";

// const imageGenaration = await openai.images.generate(	
// {
// 	model: "dall-e-2",
// 	prompt: prompt,
// 	n: numberOfImages,
// 	size: imageSize,
	
// }).then((data) => {
// 	console.log(data)});

// // .then((data) => {
// // 	console.log(data);
	
// // }
// // const json = $.parseJSON('<?php echo $result; ?>');
// // var result = json.result;
// // for (var i = 0; i < result.length; i++) {
// //   for (var key in result[i]) {
// //     console.log('KEY: ' + key + 'VALUE: ' + result[i][key]);
// //   }
// // }

// {
//   "name": "webb",
//   "version": "1.0.0",
//   "main": "api.js",
//   "type": "module",
//   "license": "MIT",
//   "dependencies": {
//     "openai": "^4.24.0"
    
//   }
// }

import { writeFileSync } from "fs";

import OpenAI from 'openai';
const openai = new OpenAI({
    apiKey: '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',
});
const numberOfImages = 2;
const imageSize = "1024x1024";
const prompt = 'A sketch of a cat playing basketball'

const result = await openai.images.generate({
    model: "dall-e-2",
	prompt: prompt,
	n: numberOfImages,
	size: imageSize,
});

const url = result.data.data[0].url;
console.log(url);

const imgResult = await fetch(url);
const blob = await imgResult.blob();
const buffer = Buffer.from ( await blob.arrayBuffer() );
writeFileSync(`./output/${Date.now()}.png`, buffer);