// 友情链接数据配置
// 用于管理友情链接页面的数据
import type { FriendItem } from "../types/friends";
const friendsData: FriendItem[] = [
	{
		id: 1,
		title: "MEMZGBL的博客",
		imgurl:
			"https://blog.mcstarland.top/assets/home/default-logo.png",
		desc: "Mizuki User Manual",
		siteurl: "https://blog.mcstarland.top",
		tags: ["博客"],
	},
	{
		id: 2,
		title: "Elykia",
		imgurl:
			"https://bu.dusays.com/2024/10/25/671b2438203a6.gif",
		desc: "致以无瑕之人",
		siteurl: "https://blog.elykia.cn/",
		tags: ["博客"],
	},
	{
		id: 3,
		title: "XiaoWangのBlog~",
		imgurl:
			"https://image.xiaowang233.top/ts.png",
		desc: "致以无瑕之人",
		siteurl: "https://blog.xiaowang233.top",
		tags: ["博客"],
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
