import * as Icon from "react-feather";

export default {
    en: [
        {
            title: 'Machine Management',
            url: '/machine-management',
            icon: <Icon.Cpu width="15"/>,
        },
        {
            title: 'Product Management',
            url: '/product-management',
            list: [
                {
                    title: "Product List",
                    url: '/product-list',
                    icon: <Icon.FileText />
                },
                {
                    title: "Create Product",
                    url: "/create-product",
                    icon: <Icon.FilePlus />
                }
            ],
            icon: <Icon.DollarSign width="15px" />,
        },
        {
            title: 'Data Analysis',
            url: '/data-anaylysis',
            list: [
                {
                    title: "Daily Analysis",
                    url: '/daily-anaylsis',
                    icon: <Icon.FileText />
                },
                {
                    title: "Sales Ranking",
                    url: "/sales-ranking",
                    icon: <Icon.Award />
                },
                {
                    title: "Sales Summary",
                    url: "/sales-summary",
                    icon: <Icon.File />
                }
            ],
            icon: <Icon.PieChart width="15px" />,
        },

        {
            title: 'Energy Management',
            url: '/energy-management',
            icon: <Icon.BatteryCharging width="15px" />,
        },
        {
            title: 'Operation History',
            url: '/operation-history',
            icon: <Icon.RotateCcw width="15px" />,
        },
        {
            title: 'Logout',
            key: 'logout',
            url: '/',
            icon: <Icon.LogOut width="15px" />,
        },
    ],
    tc: [
        {
            title: '設備管理',
            url: '/machine-managment',
            icon: <Icon.Cpu width="15px" />,
        },
        {
            title: '商品管理',
            url: '/product-management',
            list: [
                {
                    title: "商品列表",
                    url: '/product-list',
                    icon: <Icon.FileText />
                },
                {
                    title: "建立商品",
                    url: "/create-product",
                    icon: <Icon.FilePlus />
                }
            ],
            icon: <Icon.DollarSign width="15px" />,
        },
        {
            title: '數據分析',
            url: '/data-anaylysis',
            list: [
                {
                    title: "每日數據",
                    url: '/daily-anaylsis',
                    icon: <Icon.FileText />
                },
                {
                    title: "銷售排行",
                    url: "/sales-ranking",
                    icon: <Icon.FilePlus />
                },
                {
                    title: "銷售統計",
                    url: "/sales-summary",
                    icon: <Icon.FilePlus />
                }
            ],
            icon: <Icon.PieChart width="15px" />,
        },

        {
            title: '能源管理',
            url: '/energy-management',
            icon: <Icon.BatteryCharging width="15px" />,
        },
        {
            title: '操作紀錄',
            url: '/operation-history',
            icon: <Icon.RotateCcw width="15px" />,
        },
        {
            title: '登出',
            url: '/',
            key: 'logout',
            icon: <Icon.LogOut width="15px" />,
        },
    ]
}
