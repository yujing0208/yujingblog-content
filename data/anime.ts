// 本地番剧数据配置
export interface AnimeItem {
	title: string;
	status: "watching" | "completed" | "planned";
	rating: number;
	cover: string;
	description: string;
	episodes: string;
	year: string;
	genre: string[];
	studio: string;
	link: string;
	progress: number;
	totalEpisodes: number;
	startDate: string;
	endDate: string;
}

const localAnimeList: AnimeItem[] = [
	{
		title: "四月是你的谎言",
		status: "completed",
		rating: 9.8,
		cover: "https://i1.hdslb.com/bfs/bangumi/image/ec912249f5bf1fe1521c9a2df5ae655567bd85ef.png@660w_884h.webp",
		description: "从小接受母亲严格的钢琴训练并在各种音乐比赛上获胜的「神童」—有马公生,11岁那年因母亲去世,他从此变得听不见钢琴的声音，因而放弃了弹奏钢琴。国中三年级时，在青梅竹马泽村椿的引见下，公生认识了与他同年级的小提琴手—宫园新，并于一场比赛中被新自由奔放的演奏风格所吸引。自此，公生的日常生活开始有了改变。",
		episodes: "22 episodes",
		year: "2014",
		genre: ["音乐","校园","纯爱","治郁"],
		studio: "A-1 Pictures",
		link: "https://www.bilibili.com/bangumi/media/md1699",
		progress: 22,
		totalEpisodes: 22,
		startDate: "2025-07",
		endDate: "2025-08",
	},
	{
		title: "强风吹拂",
		status: "completed",
		rating: 9.9,
		cover: "https://i0.hdslb.com/bfs/bangumi/fe356b227e0005454ab2c267c9d7de902eebe837.png@450w_600h.webp",
		description: "夜晚。如同逃跑一般奔驰在城市中的藏原走。他的侧面，突然有辆自行车冲来。素不相识的男子，对阿走发问了。“喂！你很喜欢跑步吧！”男子的名字是清濑灰二。 就这样,阿走在灰二的引导下,到达了名为竹青庄的老旧公寓。9名个性丰富的住民住在那里。阿走来到最后的空房间,虽然感到困惑,却仍然被强行留下。他怎么也没有想到,自己会成为这里的“第10个男人”……。",
		episodes: "23 episodes",
		year: "2018",
		genre: ["运动","励志","热血"],
		studio: "Production I.G",
		link: "https://www.bilibili.com/bangumi/media/md139352",
		progress: 23,
		totalEpisodes: 23,
		startDate: "2026-02",
		endDate: "2026-02",
	},
	{
		title: "邻家的天使同学 ",
		status: "completed",
		rating: 7.3,
		cover: "https://i0.hdslb.com/bfs/bangumi/image/50f011dc86acb0f89bfb38384f9383a68a06bd78.png@450w_600h.webp",
		description: "高一学生藤宫周在升学后开始了他的独居生活。他所在的公寓隔壁，住着他们学校第一的美少女——椎名真昼。他们二人平时几乎没有交集。而一次大雨中，周把伞借给了浑身湿透的真昼。自此，二人便开始了奇妙的交流。周的懒散独居生活让真昼实在看不下去。她便开始为他做饭，打扫卫生，照顾他的起居。互为邻居的二人渐渐地开始对彼此有所了解。这是一个与可爱邻居之间的甜蜜又让人心急的恋爱故事——",
		episodes: "12 episodes",
		year: "2023",
		genre: ["日常","校园","纯爱","治愈"],
		studio: "project No.9",
		link: "https://www.bilibili.com/bangumi/media/md20136738",
		progress: 12,
		totalEpisodes: 12,
		startDate: "2026-07",
		endDate: "2026-07",
	},
];

export default localAnimeList;
