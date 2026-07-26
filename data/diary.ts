// 日记数据配置
// 用于管理日记页面的数据
// 内容分离：此文件由内容仓库同步管理

export interface DiaryItem {
	id: number;
	content: string;
	date: string;
	images?: string[];
	location?: string;
	mood?: string;
	tags?: string[];
}

// 日记数据
const diaryData: DiaryItem[] = [
	{
		id: 1,
		content: "它老蹦的！这个博客写了好几天了。今天终于写到日记了，算鸟，当学MarkDown了。",
		date: "2026-07-26",
		images: ["https://bee-reg-ab.imagency.cn/p/0579b27512a43f6f5ecdfdd75d363f16.png"],
		mood: "无语",
		tags: ["博客"],
	},
];

// 获取日记列表（按时间倒序）
export const getDiaryList = (limit?: number) => {
	const sortedData = [...diaryData].sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	);

	if (limit && limit > 0) {
		return sortedData.slice(0, limit);
	}

	return sortedData;
};

// 获取所有标签
export const getAllTags = () => {
	const tags = new Set<string>();
	for (const item of diaryData) {
		if (item.tags) {
			for (const tag of item.tags) {
				tags.add(tag);
			}
		}
	}
	return Array.from(tags).sort();
};
