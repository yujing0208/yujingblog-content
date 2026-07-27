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
		description: "从小接受母亲严格的钢琴训练并在各种音乐比赛上获胜的"神童"—有马公生，11岁那年因母亲去世，他从此变得听不见钢琴的声音，因而放弃了弹奏钢琴。国中三年级时，在青梅竹马泽村椿的引见下，公生认识了与他同年级的小提琴手—宫园新，并于一场比赛中被新自由奔放的演奏风格所吸引。自此，公生的日常生活开始有了改变。",
		episodes: "22 episodes",
		year: "2014",
		genre: ["音乐","校园","纯爱","治愈"],
		studio: "A-1 Pictures",
		link: "https://www.bilibili.com/bangumi/media/md1699",
		progress: 22,
		totalEpisodes: 22,
		startDate: "2025-07",
		endDate: "2025-08",
	},
];

export default localAnimeList;
