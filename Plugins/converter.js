const {
    vivu,
    mode,
    sendPhoto,
    sendVoice,
    sendGif,
    sendBassAudio,
    sendSlowAudio,
    sendBlownAudio,
    sendDeepAudio,
    sendErrapeAudio,
    sendFastAudio,
    sendFatAudio,
    sendNightcoreAudio,
    sendReverseAudio,
    sendSquirrelAudio,
    toAudio,
    toPTT,
    toVideo,
    AudioMetaData,
    lang,
    config
} = require('../lib');

vivu({
    pattern: 'photo ?(.*)',
    desc: lang.CONVERTER.PHOTO_DESC,
    type: "converter",
    fromMe: mode
}, async (message) => {
    if (!message.reply_message.sticker) return  await message.reply(lang.BASE.NEED.format("non animated sticker message"));
    if(message.reply_message.isAnimatedSticker) return  await message.reply(lang.BASE.NEED.format("please reply to a non animated sticker"));
    return await sendPhoto(message);
});
vivu({
    pattern: 'mp4 ?(.*)',
    desc: lang.CONVERTER.VIDEO_DESC,
    type: "converter",
    fromMe: mode
}, async (message, match) => {
    if (!message.reply_message.sticker) return message.reply(lang.BASE.NEED.format("animated sticker message"));
    if(!message.reply_message.isAnimatedSticker) return  await message.reply(lang.BASE.NEED.format("please reply to an animated sticker"));
    let media = await toVideo(await message.reply_message.download())
    return await message.send(media,{
        mimetype: 'video/mp4',
    },'video')
});
vivu({
    pattern: 'voice ?(.*)',
    desc: lang.CONVERTER.AUDIO_DESC,
    type: "converter",
    fromMe: mode
}, async (message) => {
    if (!message.reply_message.audio) return message.reply(lang.BASE.NEED.format("video/audio message"));
    let media = await toPTT(await message.reply_message.download())
    return await message.send(media,{
        mimetype: 'audio/mpeg',
        ptt: true
    }, 'audio')
});
vivu({
    pattern: 'gif ?(.*)',
    desc: lang.CONVERTER.GIF_DESC,
    type: "converter",
    fromMe: mode
}, async (message) => {
    
    if (!message.reply_message.sticker || message.reply_message.video) return message.reply(lang.BASE.NEED.format("animated sticker/video message"));
    return await sendGif(message)
});
vivu({
    pattern: 'bass ?(.*)',
    desc: lang.CONVERTER.AUDIO_EDIT_DESC,
    type: "audio-edit",
    fromMe: mode
}, async (message) => {
    if (!message.reply_message.audio) return message.reply(lang.BASE.NEED.format("audio message"));
    return await sendBassAudio(message)
});
vivu({
    pattern: 'slow ?(.*)',
    desc: lang.CONVERTER.AUDIO_EDIT_DESC,
    type: "audio-edit",
    fromMe: mode
}, async (message) => {
    if (!message.reply_message.audio) return message.reply(lang.BASE.NEED.format("audio message"));
    return await sendSlowAudio(message)
});
vivu({
    pattern: 'blown ?(.*)',
    desc: lang.CONVERTER.AUDIO_EDIT_DESC,
    type: "audio-edit",
    fromMe: mode
}, async (message) => {
    if (!message.reply_message.audio) return message.reply(lang.BASE.NEED.format("audio message"));
    return await sendBlownAudio(message)
});
vivu({
    pattern: 'deep ?(.*)',
    desc: lang.CONVERTER.AUDIO_EDIT_DESC,
    type: "audio-edit",
    fromMe: mode
}, async (message) => {
    if (!message.reply_message.audio) return message.reply(lang.BASE.NEED.format("audio message"));
    return await sendDeepAudio(message);
});
vivu({
    pattern: 'earrape ?(.*)',
    desc: lang.CONVERTER.AUDIO_EDIT_DESC,
    type: "audio-edit",
    fromMe: mode
}, async (message) => {
    if (!message.reply_message.audio) return message.reply(lang.BASE.NEED.format("audio message"));
    return await sendErrapeAudio(message)
});
vivu({
    pattern: 'fast ?(.*)',
    desc: lang.CONVERTER.AUDIO_EDIT_DESC,
    type: "audio-edit",
    fromMe: mode
}, async (message) => {
    if (!message.reply_message.audio) return message.reply(lang.BASE.NEED.format("audio message"));
    return await sendFastAudio(message)
});
vivu({
    pattern: 'fat ?(.*)',
    desc: lang.CONVERTER.AUDIO_EDIT_DESC,
    type: "audio-edit",
    fromMe: mode
}, async (message) => {
    if (!message.reply_message.audio) return message.reply(lang.BASE.NEED.format("audio message"));
    return await sendFatAudio(message);
});
vivu({
    pattern: 'nightcore ?(.*)',
    desc: lang.CONVERTER.AUDIO_EDIT_DESC,
    type: "audio-edit",
    fromMe: mode
}, async (message) => {
    if (!message.reply_message.audio) return message.reply(lang.BASE.NEED.format("audio message"));
    return await sendNightcoreAudio(message);
});
vivu({
    pattern: 'reverse ?(.*)',
    desc: lang.CONVERTER.AUDIO_EDIT_DESC,
    type: "audio-edit",
    fromMe: mode
}, async (message) => {
    if (!message.reply_message.audio) return message.reply(lang.BASE.NEED.format("audio message"));
    return await sendReverseAudio(message);
});
vivu({
    pattern: 'squirrel ?(.*)',
    desc: lang.CONVERTER.AUDIO_EDIT_DESC,
    type: "audio-edit",
    fromMe: mode
}, async (message) => {
    if (!message.reply_message.audio) return message.reply(lang.BASE.NEED.format("audio message"));
    return await sendSquirrelAudio(message);
});

vivu({
    pattern: 'mp3 ?(.*)',
    desc: lang.CONVERTER.MP3_DESC,
    type: "converter",
    fromMe: mode
}, (async (message) => {
    if (!message.reply_message.audio && !message.reply_message.video) return message.reply(lang.BASE.NEED.format("video message"));
    const opt = {
                title: config.AUDIO_DATA.split(/[|,;]/)[0] || config.AUDIO_DATA,
                body: config.AUDIO_DATA.split(/[|,;]/)[1],
                image: config.AUDIO_DATA.split(/[|,;]/)[2]
            }
    const AudioMeta = await AudioMetaData(await toAudio(await message.reply_message.download()), opt);
    return await message.send(AudioMeta,{
        mimetype: 'audio/mpeg'
    },'audio')
}));