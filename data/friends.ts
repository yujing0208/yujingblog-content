// 友情链接数据配置
// 用于管理友情链接页面的数据
import type { FriendItem } from "../types/friends";
const friendsData: FriendItem[] = [
	{
		id: 1,
		title: "Mizuki Docs",
		imgurl:
			"https://q.qlogo.cn/headimg_dl?dst_uin=3231515355&spec=640&img_type=jpg",
		desc: "Mizuki User Manual",
		siteurl: "https://docs.mizuki.mysqil.com",
		tags: ["Docs"],
	},
	{
		id: 2,
		title: "Vercel",
		imgurl: "https://avatars.githubusercontent.com/u/14985020?v=4&s=640",
		desc: "Develop. Preview. Ship.",
		siteurl: "https://vercel.com",
		tags: ["Hosting", "Cloud"],
	},
	{
		id: 3,
		title: "GitHub",
		imgurl: "https://avatars.githubusercontent.com/u/9919?v=4&s=640",
		desc: "Where the world builds software",
		siteurl: "https://github.com",
		tags: ["Development", "Platform"],
	},
		{
		id: 3,
		title: "合肥一中电脑社",
		imgurl: "https://hfyzdns.cn/logo.png",
		desc: "合肥一中历史最悠久的科技社团之一。 零基础友好 · 技术驱动。从编程入门到 VR 开发，从游戏设计到 AI 实践，打造自由交流、学习、创造的平台。",
		siteurl: "https://hfyzdns.cn/",
		tags: ["社团"],
	},
];
export function getFriendsList(): FriendItem[] {
	return friendsData;
}
export function getShuffledFriendsList(): FriendItem[] {
	const shuffled = [...friendsData];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}
