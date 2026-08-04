// 足迹数据 —— 在内容仓库维护，Obsidian 可直接编辑。
// 字段说明（每项一条足迹）：
//   name        地点名称（必填）
//   coordinates 经纬度 [lng, lat]（必填，缺省会被忽略）；也支持 lat/lng 分开写法
//   categories  分类数组：用于地图左上角「分类筛选」；含「计划」的不会被省份高亮点亮
//   date        到访日期（可选）
//   description 简介（可选，弹窗内显示）
//   photos      照片 URL 数组（可选，弹窗内轮播；建议用图床外链）
//   markerColor 标记颜色预设：sunset/ocean/violet/forest/amber/citrus，或任意 CSS 颜色
//   url / urlLabel 弹窗内链接（可选）
// 经纬度可在高德坐标拾取器获取：https://lbs.amap.com/tools/picker
export const footprintsData = [
	{
		name: "北京",
		coordinates: [116.407526, 39.90403],
		categories: ["去过", "2024", "城市"],
		date: "2024-05-01",
		description: "故宫、长城，第一次去北方。",
		photos: ["https://pic4.zhimg.com/v2-9c6c1c1e3e5c5e5c5e5c5e5c5e5c5e5c.jpg"],
		markerColor: "sunset",
		url: "https://yujingblog.top",
		urlLabel: "我的博客",
	},
	{
		name: "上海",
		coordinates: [121.473701, 31.230416],
		categories: ["去过", "2023", "城市"],
		date: "2023-10-01",
		description: "外滩夜景，梧桐区的咖啡店。",
		photos: ["https://pic4.zhimg.com/v2-9c6c1c1e3e5c5e5c5e5c5e5c5e5c5e5c.jpg"],
		markerColor: "ocean",
	},
	{
		name: "成都",
		coordinates: [104.066301, 30.572961],
		categories: ["去过", "2025", "美食"],
		date: "2025-02-10",
		description: "火锅、大熊猫基地。",
		photos: ["https://pic4.zhimg.com/v2-9c6c1c1e3e5c5e5c5e5c5e5c5e5c5e5c.jpg"],
		markerColor: "amber",
	},
	{
		name: "西安",
		coordinates: [108.940174, 34.341568],
		categories: ["去过", "2024", "历史"],
		date: "2024-08-15",
		description: "兵马俑、城墙骑行。",
		photos: ["https://pic4.zhimg.com/v2-9c6c1c1e3e5c5e5c5e5c5e5c5e5c5e5c.jpg"],
		markerColor: "forest",
	},
	{
		name: "东京",
		coordinates: [139.691706, 35.689487],
		categories: ["计划", "出国"],
		description: " someday 想去。",
		markerColor: "violet",
	},
];
