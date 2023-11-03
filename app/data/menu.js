import * as Icon from "react-feather";

export const getMenu = (lang) => {

    const menu = [
        // menu item  do not change its order!
        {
            title: lang == 'en' ? 'Machine Management' : "設備管理",
            url: 'machine-management',
        },
        {
            title: lang == 'en' ? 'Product Management' : "商品管理",
            url: 'product-management',
        },
        {
            title: lang == 'en' ? "Product List" : "商品列表",
            url: 'product-management/product-list',
        },
        {
            title: lang == 'en' ? "Create Product" : "建立商品",
            url: "product-management/create-product",
        },
        {
            title: lang == 'en' ? 'Data Analysis' : "數據分析",
            url: 'data-anaylysis',
        },
        {
            title: lang == 'en' ? "Daily Analysis" : "每日數據",
            url: 'daily-anaylsis',
        },
        {
            title: lang == 'en' ? "Sales Ranking" : "銷售排行",
            url: "sales-ranking",
        },
        {
            title: lang == 'en' ? "Sales Summary" : "銷售統計",
            url: "sales-summary",
        },
        {
            title: lang == 'en' ? 'Energy Management' : "能源管理",
            url: 'energy-management',
        },
        {
            title: lang == 'en' ? 'Operation History' : "操作紀錄",
            url: 'operation-history',
        },
        {
            title: lang == 'en' ? 'Setting' : "設定",
            url: 'setting',
        },
        {
            title: lang == 'en' ? 'Account' : "帳戶",
            url: 'setting/account',
        },
        {
            title: lang == 'en' ? 'Logout' : "登出",
            url: '/',
        },
        {
            title: lang == 'en' ? 'Machine Type' : "設備種類",
            url: 'machine-management/machine-Type',
        },
        //end menu item
        {
            title: lang == 'en' ? 'Account Add' : "新增帳戶",
            url: 'setting/account/add',
        },
        {
            title: lang == 'en' ? 'Account Change' : "Change帳戶",
            url: 'setting/account/[id]',
            regex: /setting\/account\/([^(?!add)*]+)/
        },
        {
            title: lang == 'en' ? 'Add Product' : "Add Product Tc",
            url: 'product-management/product-list/create-product',
        },
        {
            title: lang == 'en' ? 'Change Product' : "Change Product Tc",
            url: 'product-management/product-list/[id]',
            regex: /product-management\/product-list\/([^(?!create\-product)*]+)/
        },
        {
            title: lang == 'en' ? 'Machine Add' : "新增設備",
            url: 'machine-management/add',
        },
        {
            title: lang == 'en' ? 'Machine Change' : "Change設備",
            url: 'machine-management/[id]',
            regex: /machine-management\/([^(?!.*(add|machine\-Type)).*]+)/
        },
        {
            title: lang == 'en' ? 'Add Machine Type' : "新增設備種類",
            url: 'machine-management/machine-Type/add',
        },
        {
            title: lang == 'en' ? 'Change Machine Type' : "Change新增設備種類",
            url: /machine-management\/machine-Type\/([^(?!add)*]+)/,
        },
        // {}
    ]

    return menu
}

export const menuContent = ["en", "tc"].reduce((result, lang, index) => {
    result[lang] = [
        {
            ...getMenu(lang)[0],
            icon: <Icon.Cpu width="15" />,
            list: [
                {
                    ...getMenu(lang)[0],
                    icon: <Icon.Cpu width="15" />,
                },
                {
                    ...getMenu(lang)[13],
                    icon: <Icon.FileText />
                },
            ],
        },
        {
            ...getMenu(lang)[1],
            list: [
                {
                    ...getMenu(lang)[2],
                    icon: <Icon.FileText />
                },
                {
                    ...getMenu(lang)[3],
                    icon: <Icon.FilePlus />
                }
            ],
            icon: <Icon.DollarSign width="15px" />,
        },
        {
            ...getMenu(lang)[4],
            list: [
                {
                    ...getMenu(lang)[5],
                    icon: <Icon.FileText />
                },
                {
                    ...getMenu(lang)[6],
                    icon: <Icon.Award />
                },
                {
                    ...getMenu(lang)[8],
                    icon: <Icon.File />
                }
            ],
            icon: <Icon.PieChart width="15px" />,
        },

        {
            ...getMenu(lang)[8],
            icon: <Icon.BatteryCharging width="15px" />,
        },
        {
            ...getMenu(lang)[9],
            icon: <Icon.RotateCcw width="15px" />,
        },
        {
            ...getMenu(lang)[10],
            icon: <Icon.Settings width="15px" />,
            list: [
                {
                    ...getMenu(lang)[11],
                    icon: <Icon.User width="15px" />,
                },
            ]
        },
        {
            ...getMenu(lang)[12],
            key: 'logout',
            icon: <Icon.LogOut width="15px" />,
        },
    ]
    return result;
}, {})

// export const menuContent2 = {
//     en: [
//         {
//             ...getMenu(en)[0],
//             icon: <Icon.Cpu width="15"/>,
//         },
//         {
//             ...getMenu(en)[1],
//             list: [
//                 {
//                     ...getMenu(en)[2],
//                     icon: <Icon.FileText />
//                 },
//                 {
//                     ...getMenu(en)[3],
//                     icon: <Icon.FilePlus />
//                 }
//             ],
//             icon: <Icon.DollarSign width="15px" />,
//         },
//         {
//             ...getMenu(en)[4],
//             list: [
//                 {
//                     ...getMenu(en)[5],
//                     icon: <Icon.FileText />
//                 },
//                 {
//                     ...getMenu(en)[6],
//                     icon: <Icon.Award />
//                 },
//                 {
//                     ...getMenu(en)[8],
//                     icon: <Icon.File />
//                 }
//             ],
//             icon: <Icon.PieChart width="15px" />,
//         },

//         {
//             ...getMenu(en)[8],
//             icon: <Icon.BatteryCharging width="15px" />,
//         },
//         {
//             ...getMenu(en)[9],
//             icon: <Icon.RotateCcw width="15px" />,
//         },
//         {
//             ...getMenu(en)[10],
//             key: 'logout',
//             icon: <Icon.LogOut width="15px" />,
//         },
//     ],
//     tc: [
//         {
//             title: '設備管理',
//             url: '/machine-managment',
//             icon: <Icon.Cpu width="15px" />,
//         },
//         {
//             title: '商品管理',
//             url: '/product-management',
//             list: [
//                 {
//                     title: "商品列表",
//                     url: '/product-list',
//                     icon: <Icon.FileText />
//                 },
//                 {
//                     title: "建立商品",
//                     url: "/create-product",
//                     icon: <Icon.FilePlus />
//                 }
//             ],
//             icon: <Icon.DollarSign width="15px" />,
//         },
//         {
//             title: '數據分析',
//             url: '/data-anaylysis',
//             list: [
//                 {
//                     title: "每日數據",
//                     url: '/daily-anaylsis',
//                     icon: <Icon.FileText />
//                 },
//                 {
//                     title: "銷售排行",
//                     url: "/sales-ranking",
//                     icon: <Icon.FilePlus />
//                 },
//                 {
//                     title: "銷售統計",
//                     url: "/sales-summary",
//                     icon: <Icon.FilePlus />
//                 }
//             ],
//             icon: <Icon.PieChart width="15px" />,
//         },

//         {
//             title: '能源管理',
//             url: '/energy-management',
//             icon: <Icon.BatteryCharging width="15px" />,
//         },
//         {
//             title: '操作紀錄',
//             url: '/operation-history',
//             icon: <Icon.RotateCcw width="15px" />,
//         },
//         {
//             title: '登出',
//             url: '/',
//             key: 'logout',
//             icon: <Icon.LogOut width="15px" />,
//         },
//     ]
// }
