const {
    vivu,
    mode,
    weather,
    ringtone,
    GenListMessage,
    lang,
    getJson,
    config
} = require('../lib');


vivu({
    pattern: 'google',
    fromMe: mode,
    desc: lang.SCRAP.GOOGLE_DESC,
    react: "🙃",
    type: "search"
}, async (message, match) => {
    if (!match) return message.send(lang.BASE.TEXT);
    const { result, status } = await getJson(`${config.BASE_URL}api/search/pinterest?text=${match}&apikey=${config.INRL_KEY}`);
    if (!status) return await message.send(`API key limit exceeded. Get a new API key at ${config.BASE_URL}api/signup. Set var inrl_key: your_api_key`);
    await Promise.all(result.map(async (item) => {
        await message.send(`*Title:* ${item.title}\n*Link:* ${item.link}\n*Snippet:* ${item.snippet}\n`);
    }));
});

vivu({
    pattern: 'ringtone',
    fromMe: mode,
    desc: lang.SCRAP.RING_DESC,
    react : "🙃",
    type: "search"
}, async (message, match) => {
        if (!match) return message.send(lang.BASE.TEXT);
        let result = await ringtone(match), res=[];
        await result.map(r=>res.push(r.title));
        return await message.send(GenListMessage(lang.SCRAP.RING_LIST, res));
});   

inrl({
    pattern: 'weather',
    fromMe: mode,
    desc: lang.SCRAP.WEATHER_DESC,
    react : "🔥",
    type: "search"
}, async (message, match) => {
    if(!match) return await m.send(lang.SCRAP.NEED_PLACE)
        return await weather(message);
});

vivu({
    on: "text",
    fromMe: mode,
}, async (m, match) => {
    if (!m.reply_message || !m.reply_message?.fromMe) return;
    if(!m.body.includes(lang.SCRAP.RING_LIST)) return;
    match = m.body.replace(lang.SCRAP.RING_LIST, "").trim();
    await m.send("*_downloading_*:-\n\n"+match);
    let result = await ringtone(match);
    return await m.send({
                url: result[0].audio
            },{
            fileName: result[0].title + '.mp3',
            mimetype: 'audio/mpeg'
        }, 'audio');
});