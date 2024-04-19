const {
	inrl,
	config,
	getJson,
	lang,
	mode
} = require('../lib');


vivu({
	pattern: 'apk ?(.*)',
	type: "downloader",
	desc: "download applications from aptoid",
	fromMe: mode
}, async (message, match) => {
	match = match || message.reply_message.text;
	if (!match) return await message.send("*please give me an application name*");
	if (match.startsWith('dl-id:')) {
		match = match.replace(/dl-id:/, '').replace(lang.YT.INFO_VIDEO,'').trim();
		const res = await getJson(`${config.BASE_URL}api/download/apk?url=${match}&apikey=${config.INRL_KEY}`);
		if (!res.status) return await message.send(`Please enter a new apikey, as the given apikey limit has been exceeded. Visit ${config.BASE_URL}api/signup for gettig a new apikey. setvar inrl_key: your apikey`);
		return await message.send({
			url: res.result.link
		}, {
			mimetype: `application/vnd.android.package-archive`,
			fileName: res.result.name
		}, 'document')
	}
	const res = await getJson(`${config.BASE_URL}api/search/apk?text=${match}&apikey=${config.INRL_KEY}`);
	if (!res.status) return await message.send(`Please enter a new apikey, as the given apikey limit has been exceeded. Visit ${config.BASE_URL}api/signup for gettig a new apikey. setvar inrl_key: your apikey`);
	const list = res.result.splice(0, 10).map(a => ({
		name: a.name,
		id: `apk dl-id:${a.id}`
	}));
	return await message.send({
		name: lang.YT.INFO_VIDEO,
		values: list,
		withPrefix: true,
		onlyOnce: true,
		participates: [message.sender],
		selectableCount: true
	}, {}, 'poll');
});