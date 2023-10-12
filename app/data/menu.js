import SvgIconAddproduct from '/public/svg/icon_add_product.svg'
import SvgIconListproduct from '/public/svg/icon_list_product.svg'
import SvgIconLock from '/public/svg/icon_lock.svg'
import SvgIconLogout from '/public/svg/icon_signout.svg'
import SvgIconQuestion from '/public/svg/icon_question.svg'
import SvgIconAddproductWhite from '/public/svg/icon_list_all_white.svg'
import SvgIconListproductWhite from '/public/svg/icon_list_product_white.svg'
import SvgIconLockWhite from '/public/svg/icon_lock_white.svg'
import SvgIconLogoutWhite from '/public/svg/icon_signout_white.svg'
import SvgIconQuestionWhite from '/public/svg/icon_question_white.svg'

module.exports = {
    en: [
        {
            title: 'Machine',
            url: '/machine',
            svg: <SvgIconListproduct />,
            svgWhite: <SvgIconListproductWhite />
        },
        {
        title: 'Pallet Configuration',
        url: '/pallet-config',
        svg: <SvgIconListproduct />,
        svgWhite: <SvgIconListproductWhite />
    },
    {
        title: 'Cabinet Maintenance',
        url: '/cabinet-config',
        svg: <SvgIconAddproduct />,
        svgWhite: <SvgIconAddproductWhite />
    },

    {
        title: 'Privacy Policy',
        url: '/',
        svg: <SvgIconLock />,
        svgWhite: <SvgIconLockWhite />
    },
    {
        title: 'Help',
        url: '/',
        svg: <SvgIconQuestion />,
        svgWhite: <SvgIconQuestionWhite />
    },
    {
        title: 'Logout',
        key: 'logout',
        url: '/',
        svg: <SvgIconLogout />,
        svgWhite: <SvgIconLogoutWhite />
    },
    ],
    tc: [{
        title: '貨道設置',
        url: '/pallet-config',
        svg: <SvgIconListproduct />,
        svgWhite: <SvgIconListproductWhite />
    },
    {
        title: '設備營運',
        url: '/cabinet-config',
        svg: <SvgIconAddproduct />,
        svgWhite: <SvgIconAddproductWhite />
    },

    {
        title: 'Privacy Policy tc',
        url: '/',
        svg: <SvgIconLock />,
        svgWhite: <SvgIconLockWhite />
    },
    {
        title: 'Help tc',
        url: '/',
        svg: <SvgIconLogout />,
        svgWhite: <SvgIconLogoutWhite />
    },
    {
        title: 'Logout tc',
        url: '/',
        svg: <SvgIconQuestion />,
        svgWhite: <SvgIconQuestionWhite />
    },
    ]
}
