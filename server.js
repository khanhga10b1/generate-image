import express from 'express';
import OpenAI from 'openai';
import ejs from 'ejs';
import { writeFileSync } from 'fs';
import * as buffer from 'buffer';
import * as path from 'path';
import fetch from 'node-fetch';

const app = express();
const port = 8080;
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const openai = new OpenAI({
    apiKey: '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',
});


app.post('/generate-image', async (req, res) => {
    const prompt = req.body.prompt;

    try {
        const response = await openai.images.generate({
            model: 'dall-e-2',
            prompt: prompt,
            n: 1,  // Number of images to generate
            size: '256x256',  // Image size
        });

        const imageUrl = response?.data?.[0].url || null;

        if(imageUrl) {
            // save image
            const imageResponse = await fetch(imageUrl);
            const imageBuffer = await imageResponse.buffer();

            writeFileSync(path.join(process.cwd(), 'image', `${Date.now()}.png`), imageBuffer);
        }

        // Send the generated image URL in the response (json data)
        // res.json({ imageUrl: response?.data?.[0].url });

        // this is view
        res.render('generate-image',{prompt: prompt || '', imageUrl: imageUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to generate image' });
    }
});

app.get('/generate-image', async (req, res) => {
    res.render('generate-image', {prompt: '', imageUrl: null});
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
