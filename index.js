const { Client } = require('whatsapp-web.js');
const qrcode = require("qrcode-terminal");
const {Configuration, OpenAIApi} = require("openai");

const client = new Client();

client.on('qr',(qr) =>{
    qrcode.generate(qr,{small:true});
});

client.on('ready',() =>{
    console.log("Client is ready");
});

client.initialize();

const configuration = new Configuration({
    apiKey : "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",
});
const openai = new OpenAIApi(configuration);

const runCompletion = async (prompt) => {
    const completion = await openai.createChatCompletion({
        model:"gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt },],
    });
    return (completion["data"]["choices"][0]["message"]["content"]);
}

client.on('message',message => {
    if(message.body.includes("/gpt")) {
        console.log(message.body);
    runCompletion(message.body).then(result => message.reply(result));
    };
    if (message.body.includes("/newtopic")) {
        messages = [];
        client.sendMessage(message.from, "Бот перезапущен.")
    };
});