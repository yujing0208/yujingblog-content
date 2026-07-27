import type { TimelineItem } from "../components/features/timeline/types";

export const timelineData: TimelineItem[] = [
	{
		id: "初中毕业",
		title: "初中毕业",
		description:
			"三年初中学习结束",
		type: "education",
		startDate: "2023-09-01",
		endDate: "2025-06-10",
		location: "安徽 合肥",
		organization: "合肥市一六八玫瑰园学校南校",
		achievements: [
			"获得了优异的学习成绩",
		],
		icon: "material-symbols:school",
		color: "#59f0cf",
	},
	{
		id: "高一学习",
		title: "高一学习",
		description:
			"中考发挥失常，进入徭役开始高中学习，在高一57班。",
		type: "education",
		startDate: "2025-08-27",
		endDate: "2026-07-11",
		location: "安徽 合肥",
		organization: "合肥市第一中学瑶海校区",
		achievements: [
			"积极参与志愿服务活动",
			"青年志愿者协会成员",
			"学习状态堪忧，成绩一落千丈，整天发呆",
		],
		icon: "material-symbols:school",
		color: "#43bbeb",
	},
	{
		id: "高二学习",
		title: "高二学习",
		description:
			"高一学习结束，进入高二54班。",
		type: "",
		startDate: "2026-09-01",
		location: "安徽 合肥",
		organization: "合肥市第一中学瑶海校区",
		achievements: [
			"成为尊贵的物化生学者",
			"物化生素养班学生",
			"",
		],
		icon: "material-symbols:school",
		color: "#3945f1",
	},
	{
		id: "web-development-course",
		title: "Completed Web Development Online Course",
		description:
			"Completed a full-stack web development online course, systematically learning frontend and backend development technologies.",
		type: "achievement",
		startDate: "2024-01-15",
		endDate: "2024-05-30",
		organization: "Mooc Website",
		skills: ["HTML", "CSS", "JavaScript", "Node.js", "Express"],
		achievements: [
			"Received course completion certificate",
			"Completed 5 practical projects",
			"Mastered full-stack development fundamentals",
		],
		links: [
			{
				name: "Course Certificate",
				url: "https://certificates.example.com/web-dev",
				type: "certificate",
			},
		],
		icon: "material-symbols:verified",
		color: "#059669",
	},
	{
		id: "student-management-system",
		title: "Student Management System Course Project",
		description:
			"Final project for the database course, developed a complete student information management system.",
		type: "project",
		startDate: "2023-11-01",
		endDate: "2023-12-15",
		skills: ["Java", "MySQL", "Swing", "JDBC"],
		achievements: [
			"Received excellent course project grade",
			"Implemented complete CRUD functionality",
			"Learned database design and optimization",
		],
		icon: "material-symbols:database",
		color: "#EA580C",
	},
	{
		id: "programming-contest",
		title: "University Programming Contest",
		description:
			"Participated in a programming contest held by the university, improving algorithm and programming skills.",
		type: "achievement",
		startDate: "2023-10-20",
		location: "Beijing Institute of Technology",
		organization: "School of Computer Science",
		skills: ["C++", "Algorithms", "Data Structures"],
		achievements: [
			"Won third prize in university contest",
			"Improved algorithmic thinking ability",
			"Strengthened programming fundamentals",
		],
		icon: "material-symbols:emoji-events",
		color: "#7C3AED",
	},
	{
		id: "part-time-tutor",
		title: "Part-time Programming Tutor",
		description:
			"Provided programming tutoring for high school students, helping them learn Python basics.",
		type: "work",
		startDate: "2023-09-01",
		endDate: "2024-01-31",
		position: "Programming Tutor",
		skills: ["Python", "Teaching", "Communication"],
		achievements: [
			"Helped 3 students master Python basics",
			"Improved expression and communication skills",
			"Gained teaching experience",
		],
		icon: "material-symbols:school",
		color: "#059669",
	},
	{
		id: "high-school-graduation",
		title: "High School Graduation",
		description:
			"Graduated from high school with excellent grades and was admitted to the Computer Science and Technology program at Beijing Institute of Technology.",
		type: "education",
		startDate: "2019-09-01",
		endDate: "2022-06-30",
		location: "Jinan, Shandong",
		organization: "No.1 High School of Jinan",
		achievements: [
			"College entrance exam score: 620",
			"Received municipal model student award",
			"Won provincial second prize in math competition",
		],
		icon: "material-symbols:school",
		color: "#2563EB",
	},
	{
		id: "first-programming-experience",
		title: "First Programming Experience",
		description:
			"First encountered programming in high school IT class, started learning Python basic syntax.",
		type: "education",
		startDate: "2021-03-01",
		skills: ["Python", "Basic Programming Concepts"],
		achievements: [
			'Completed first "Hello World" program',
			"Learned basic loops and conditional statements",
			"Developed interest in programming",
		],
		icon: "material-symbols:code",
		color: "#7C3AED",
	},
];
