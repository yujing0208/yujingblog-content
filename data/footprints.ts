// 足迹数据 —— 在内容仓库维护，Obsidian 可直接编辑。
// 字段说明（每项一条足迹）：
//   name        地点名称（必填）
//   coordinates 经纬度 [lng, lat]（必填，缺省会被忽略）
//   categories  分类数组：含「计划」的不会被地图高亮点亮
//   date        到访日期（可选）
//   description 简介（可选）
//   url/urlLabel 相关链接（可选）
// 经纬度可在高德坐标拾取器获取：https://lbs.amap.com/tools/picker
export const footprintsData = [
	{
		name: "北京",
		coordinates: [116.407526, 39.90403],
		categories: ["去过"],
		date: "2024-05-01",
		description: "故宫、长城，第一次去北方。",
	},
	{
		name: "上海",
		coordinates: [121.473701, 31.230416],
		categories: ["去过"],
		date: "2023-10-01",
		description: "外滩夜景，梧桐区的咖啡店。",
	},
	{
		name: "成都",
		coordinates: [104.066301, 30.572961],
		categories: ["去过"],
		date: "2025-02-10",
		description: "火锅、大熊猫基地。",
	},
	{
		name: "西安",
		coordinates: [108.940174, 34.341568],
		categories: ["去过"],
		date: "2024-08-15",
		description: "兵马俑、城墙骑行。",
	},
	{
		name: "东京",
		coordinates: [139.691706, 35.689487],
		categories: ["计划"],
		description: " someday 想去。",
	},
];
