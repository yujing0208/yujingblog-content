// 友情链接数据配置
// 用于管理友情链接页面的数据
import type { FriendItem } from "../types/friends";
const friendsData: FriendItem[] = [
	{
		id: 1,
		title: "Mizuki Docs",
		imgurl: "https://q.qlogo.cn/headimg_dl?dst_uin=3231515355&spec=640&img_type=jpg",
		desc: "Mizuki User Manual",
		siteurl: "https://docs.mizuki.mysqil.com",
		tags: [
			"技术"
		]
	},
	{
		id: 2,
		title: "Vercel",
		imgurl: "https://ts3.tc.mm.bing.net/th/id/OIP-C.BHToo31Gbbw69wyXq4pqBQAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
		desc: "Develop. Preview. Ship.",
		siteurl: "https://vercel.com",
		tags: [
			"技术"
		]
	},
	{
		id: 3,
		title: "GitHub",
		imgurl: "https://tse3-mm.cn.bing.net/th/id/OIP-C.Lwbgu4eSpSz4gKe-F_k58gHaHa?w=167&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
		desc: "Where the world builds software",
		siteurl: "https://github.com",
		tags: [
			"技术"
		]
	},
	{
		id: 3,
		title: "合肥一中电脑社",
		imgurl: "https://hfyzdns.cn/logo.png",
		desc: "合肥一中历史最悠久的科技社团之一。 零基础友好 · 技术驱动。从编程入门到 VR 开发，从游戏设计到 AI 实践，打造自由交流、学习、创造的平台。",
		siteurl: "https://hfyzdns.cn",
		tags: [
			"校园"
		]
	},
	{
		id: 4,
		title: "CloudFlare ImgBed",
		imgurl: "https://cfbed.sanyue.de/logo.png",
		desc: "开源文件托管解决方案，安心存取，轻松分享",
		siteurl: "https://cfbed.sanyue.de",
		tags: [
			"技术"
		]
	},
	{
		id: 5,
		title: "叮叮猫资源搜索站",
		imgurl: "https://www.boosds.cn/uploads/image/20260406/5572e4ad14fa6e2579205aa9048d2429.png",
		desc: "免费分享百万级网盘资源,请输入准确影视名称进行搜索！",
		siteurl: "https://www.boosds.cn",
		tags: [
			"资源"
		]
	},
	{
		id: 6,
		title: "Twikoo",
		imgurl: "https://twikoo.js.org/twikoo-logo-home.png",
		desc: "网站评论系统，简洁、安全、免费",
		siteurl: "https://twikoo.js.org",
		tags: [
			"技术"
		]
	},
	{
		id: 7,
		title: "LX Music",
		imgurl: "https://ts1.tc.mm.bing.net/th/id/OIP-C.pxhC07XCuH4CfENun93MqwAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
		desc: "一个免费&开源的音乐查找工具",
		siteurl: "https://lxmusic.toside.cn",
		tags: [
			"资源"
		]
	},
	{
		id: 8,
		title: "蜜蜂图床",
		imgurl: "https://bee-reg-ab.imagency.cn/p/81985253f7a87ad615ee5ad6fffba283.png",
		desc: "提供免费、稳定、高速的图片上传与外链服务平台",
		siteurl: "https://www.beeimg.cn/",
		tags: [
			"图床"
		]
	},
	{
		id: 9,
		title: "Cloudflare",
		imgurl: "https://www.zhanlian.net/wp-content/uploads/2022/10/36e0f-www.cloudflare.com.png",
		desc: "为您的网站提供免费的防护和加速",
		siteurl: "https://dash.cloudflare.com/",
		tags: [
			"技术"
		]
	},
	{
		id: 10,
		title: "合肥市第一中学",
		imgurl: "https://tse2-mm.cn.bing.net/th/id/OIP-C.c7j-78QvJc2VrZ-j1t80FAAAAA?w=154&h=155&c=7&r=0&o=7&pid=1.7&rm=3",
		desc: "怀天下抱负，做未来主人。",
		siteurl: "http://www.hfyz.net/sy/index.html",
		tags: [
			"校园"
		]
	},
	{
		id: 11,
		title: "PigHub",
		imgurl: "https://www.pighub.top/images/%E7%88%B1%E4%B8%8A%E4%B8%80%E5%8F%AA%E5%B0%8F%E7%8C%AA%EF%BC%9F.jpg",
		desc: "最大的猪猪图片网站",
		siteurl: "https://www.pighub.top/",
		tags: [
			"娱乐"
		]
	},
	{
		id: 12,
		title: "Z-Library",
		imgurl: "https://tse3-mm.cn.bing.net/th/id/OIP-C.YrNMwDyCI7RRbq5_NIVNhQAAAA?w=131&h=150&c=7&r=0&o=7&pid=1.7&rm=3",
		desc: "世界上最大的电子图书馆。自由访问知识和文化。",
		siteurl: "https://zh.kid1412.by/",
		tags: [
			"资源"
		]
	},
	{
		id: 13,
		title: "GitHub加速",
		imgurl: "https://weavatar.com/avatar/50abbf204520fa0a98fdaab4bc98a10f",
		desc: "将 GitHub 链接转换为多区域加速链接，解决 GitHub 访问慢、下载失败等问题",
		siteurl: "https://gh-proxy.com/",
		tags: [
			"工具"
		]
	},
	{
		id: 14,
		title: "YuJing ImgHub",
		imgurl: "https://img.yujingblog.top/file/1785690853054_logo.png",
		desc: "我的个人图床",
		siteurl: "https://img.yujingblog.top",
		tags: [
			"图床"
		]
	},
	{
		id: 15,
		title: "哲风壁纸",
		imgurl: "https://haowallpaper.com/favicon.ico",
		desc: "免费4K高清壁纸-电脑背景图片-Mac壁纸网站",
		siteurl: "https://haowallpaper.com/",
		tags: [
			"资源"
		]
	},
	{
		title: "DeepSeek | 深度求索",
		imgurl: "https://a.favicon.im/www.deepseek.com",
		desc: "deepseek探索未至之境",
		siteurl: "https://www.deepseek.com/",
		tags: [
			"AI"
		]
	},
	{
		title: "Favicon.im: 即时网站图标获取器",
		imgurl: "https://a.favicon.im/favicon.im",
		desc: "Favicon.im是一个简单高效的服务，允许您获取任何网站的图标（网站图标）。 只需提供域名，我们就 …",
		siteurl: "https://favicon.im/zh",
		tags: [
			"工具"
		]
	},
	{
		title: "豆包",
		imgurl: "https://a.favicon.im/www.doubao.com",
		desc: "豆包 - 字节跳动旗下 AI 智能助手",
		siteurl: "https://www.doubao.com",
		tags: [
			"AI"
		]
	},
	{
		title: "千问",
		imgurl: "https://a.favicon.im/www.qianwen.com",
		desc: "千问-阿里Qwen最新模型体验 - 界面简洁，交互流畅清爽",
		siteurl: "https://www.qianwen.com/",
		tags: [
			"AI"
		]
	},
	{
		title: "skills mp",
		imgurl: "https://a.favicon.im/skillsmp.com",
		desc: "看人们正在教 Claude、Codex 和其他 AI 智能体做些什么。",
		siteurl: "https://skillsmp.com/zh",
		tags: [
			"AI工具"
		]
	},
	{
		title: "图床 | StarDots",
		imgurl: "https://a.favicon.im/dashboard.stardots.io",
		desc: "图像云存储。\n图片托管，让你的图片公开访问。\n安全数据，完全免费。",
		siteurl: "https://dashboard.stardots.io/",
		tags: [
			"图床"
		]
	},
	{
		title: "PromptPilot",
		imgurl: "https://a.favicon.im/promptpilot.volcengine.com",
		desc: "PromptPilot是火山引擎推出的AI提示词优化平台，能将用户模糊的想法转化为AI能精准执行的专业指令。本文全面 …",
		siteurl: "https://promptpilot.volcengine.com/",
		tags: [
			"AI工具"
		]
	},
	{
		title: "Iconify",
		imgurl: "https://a.favicon.im/icon-sets.iconify.design",
		desc: "开源图标集的家园",
		siteurl: "https://icon-sets.iconify.design/",
		tags: [
			"前端组件"
		]
	},
	{
		title: "Imagio",
		imgurl: "https://a.favicon.im/image.oblivionis.net",
		desc: "描述你想生成的图片，或附加图片进行编辑……",
		siteurl: "https://image.oblivionis.net/",
		tags: [
			"AI工具"
		]
	},
	{
		title: "One Page Love",
		imgurl: "https://a.favicon.im/onepagelove.com",
		desc: "一页网站，精心策划。",
		siteurl: "https://onepagelove.com/",
		tags: [
			"前端组件"
		]
	},
	{
		title: "坐标拾取器 | 高德地图API",
		imgurl: "https://a.favicon.im/lbs.amap.com",
		desc: "获取足迹页面所需的精确经纬",
		siteurl: "https://lbs.amap.com/tools/picker",
		tags: [
			"工具"
		]
	},
	{
		title: "AGE动漫",
		imgurl: "https://a.favicon.im/www.agedm.io",
		desc: "免费动漫资源聚合站",
		siteurl: "https://www.agedm.io/",
		tags: [
			"资源"
		]
	},
	{
		title: "MANHWATOP",
		imgurl: "https://a.favicon.im/manhwatop.com",
		desc: "收录漫画资源",
		siteurl: "https://manhwatop.com/",
		tags: [
			"资源"
		]
	},
	{
		title: "免费在线抠图",
		imgurl: "https://a.favicon.im/www.koukoutu.com",
		desc: "无需上传的在线图像抠图工具",
		siteurl: "https://www.koukoutu.com/removebgtool/all",
		tags: [
			"工具"
		]
	},
	{
		title: "imagesTool",
		imgurl: "https://a.favicon.im/imagestool.com",
		desc: "无需上传文件也可在线处理图片",
		siteurl: "https://imagestool.com/zh_CN/",
		tags: [
			"工具"
		]
	},
	{
		title: "Itdog-在线测速",
		imgurl: "https://a.favicon.im/www.itdog.cn",
		desc: "在线网络工具箱，网站测速",
		siteurl: "https://www.itdog.cn/",
		tags: [
			"工具"
		]
	},
	{
		title: "免费在线视频压缩工具",
		imgurl: "https://a.favicon.im/videocompress.io",
		desc: "免费在线视频压缩工具，支持 MP4、MOV、WebM 等格式。免费在线压缩视频文件大小，在画质和体积之间取得合适平衡。无需安装软件，上传后即可压缩下载。",
		siteurl: "https://videocompress.io/zh-cn",
		tags: [
			"工具"
		]
	},
	{
		title: "Qwerty Learner",
		imgurl: "https://a.favicon.im/qwerty.kaiyi.cool",
		desc: "键盘工作者单词记忆软件",
		siteurl: "https://qwerty.kaiyi.cool/",
		tags: [
			"学习"
		]
	},
	{
		title: "小小API",
		imgurl: "https://a.favicon.im/xxapi.cn",
		desc: "小小API-专业的API服务平台",
		siteurl: "https://xxapi.cn/",
		tags: [
			"API"
		]
	},
	{
		title: " UApiPro",
		imgurl: "https://a.favicon.im/uapis.cn",
		desc: "免费、稳定、快速的公共 API",
		siteurl: "https://uapis.cn/",
		tags: [
			"API"
		]
	},
	{
		title: "Emojiall",
		imgurl: "https://a.favicon.im/www.emojiall.com",
		desc: "Emoji大全",
		siteurl: "https://www.emojiall.com/zh-hans",
		tags: [
			"资源"
		]
	},
	{
		title: "OpenMediaTools",
		imgurl: "https://a.favicon.im/openmedia.tools",
		desc: "免费在线视频、音频、图像PDF和AI工具",
		siteurl: "https://openmedia.tools/zh/",
		tags: [
			"工具"
		],
		id: 16
	},
	{
		title: "GitHub Proxy",
		imgurl: "https://a.favicon.im/github.akams.cn",
		desc: "支持 API、Git Clone、Releases、Archive、Gist、Raw 等资源加速下载，提升 GitHub 文件下载体验。",
		siteurl: "https://github.akams.cn/",
		tags: [
			"工具"
		],
		id: 17
	},
	{
		title: "GitHub 文件加速",
		imgurl: "https://a.favicon.im/ghproxy.net",
		desc: "GitHub文件链接带不带协议头都可以，支持release、archive以及文件，右键复制出来的链接都是符合标准的",
		siteurl: "https://ghproxy.net/",
		tags: [
			"工具"
		],
		id: 18
	},
	{
		title: "升学E网通 ",
		imgurl: "https://a.favicon.im/www.ewt360.com",
		desc: "升学E网通集助学、助考、和升学为一体，是国内领先的高中生综合指导系统，专为高中同学打造的提供学习、助学备考、志愿填报、 …",
		siteurl: "https://www.ewt360.com",
		tags: [
			"学习"
		],
		id: 19
	}
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
