const {
	vivu,
	mode,
	config,
	getJson
} = require("../lib/");

vivu(
	{
		pattern: "dob",
		fromMe: mode,
		desc: "get birth details",
		type: "information",
	},
	async (message, match) => {
		if (!match) return await message.send('*provide a time!*\n*Example: dd/mm/yyyy*');
		let [a, b, c] = match.split(/[/-]/);
		if (!c) return await message.send('*invalid format!*\n*Example: dd/mm/yyyy*');
		if (a.length < 2) a = '0' + a;
		if (b.length < 2) b = '0' + b;
		if (c.length != 4) return await message.send('*invalid format!*\n*Example: dd/mm/yyyy*');
		const result = await getJson(`${config.BASE_URL}api/info/age?dob=${match}&apikey=${config.INRL_KEY}`);
		if (!result.status) return await message.send(`Please enter a new apikey, as the given apikey limit has been exceeded. Visit ${config.BASE_URL}api/signup for gettig a new apikey. setvar inrl_key: your apikey`);
		const {
			age,
			months,
			days,
			hours,
			minutes,
			seconds,
			next
		} = result.result;

		return await message.send(`*🔖 Your birth day details*

*々 age :* ${age} 🧃

     *⸋ life time*

_*☇ months :* ${months}_
_*☇ days :* ${days}_
_*☇ hours :* ${hours}_
_*☇ minutes :* ${minutes}_
_*☇ seconds :* ${seconds}_

 *⸋ time left to next bday*

_*☇ date :* ${next.date}_
_*☇ months :* ${next.remainingMonths}_
_*☇ day :* ${next.remainingDays}_
_*☇ hours :* ${next.remainingHours}_
_*☇ minutes :* ${next.remainingMinutes}_
_*☇ seconds :* ${next.remainingSeconds}_`);
	}
);

vivu(
	{
		pattern: "country",
		fromMe: mode,
		desc: "get country details",
		type: "information",
	},
	async (message, match) => {
		if (!match) return await message.send('*provide a country code!*\n*Example: country IN*');
		const {
			result,
			status
		} = await getJson(`${config.BASE_URL}api/info/country?code=${match}&apikey=${config.INRL_KEY}`);
		if (!status) return await message.send(`Please enter a new apikey, as the given apikey limit has been exceeded. Visit ${config.BASE_URL}api/signup for gettig a new apikey. setvar inrl_key: your apikey`);
		const {
			id,
			name,
			language,
			capital,
			currency,
			famous_us,
			constitutional_from,
			language_codes,
			neighbors,
			image,
			flag,
			phoneCode,
			times,
			date
		} = result;

		const formattedMessage = `
_*Country:* ${name} (${id})_
_*Capital:* ${capital}_
_*Language:* ${language.join(', ')}_
_*Currency:* ${currency}_
_*Famous for:* ${famous_us}_
_*Constitutional Form:* ${constitutional_from}_
_*Language Codes:* ${language_codes.join(', ')}_
_*Neighbors:* ${neighbors.join(', ')}_
_*Flag:* ${flag || 'N/A'}_
_*Date:* ${date || 'N/A'}_
_*Phone Code:* ${phoneCode || 'N/A'}_
_*Local Time:* ${times && times.length ? `${times[0].time} (${times[0].zone})` : 'N/A'}_
`;

		const msg = await message.send({
			url: image
		}, {
			caption: formattedMessage
		}, "image");
		return await message.send({
			key: msg.key,
			text: flag
		}, {}, 'react');
	});

vivu(
	{
		pattern: "checkapi",
		fromMe: mode,
		desc: "check inrlkey",
		type: "information",
	},
	async (message, match) => {
		const {
			status,
			message: res_msg,
			result
		} = await getJson(`${config.BASE_URL}api/info/age?dob=${match}&apikey=${config.INRL_KEY}`);
		if (!status) return await message.send(res_msg);
		const msg = `_*API KEY:* ${encode(config.INRL_KEY)}_\n_*KEY_TYPE:* unavailable_\n_*MAX REQ LIMIT:* unavailable_\n_*TOTAL REQ:* unavailable_\n_*TODAY REQ:* unavailable_\n_*LIMIT REMAINS:* ${result}_`;
		return await message.send(msg);
	});

function encode(str) {
	for (let i = 01; i < str.split('').length; i++) {
		if (i % 2 == 0) str = str.replace(str.split('')[i - 1], '_');
	}
	return str
}