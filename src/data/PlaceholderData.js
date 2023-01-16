
//import slider img
import Slider1 from '../images/slider/s1.jpg';
import Slider2 from '../images/slider/s2.jpg';
import Slider3 from '../images/slider/s3.jpg';

//import banner img
import bannerImg1 from '../images/slider/casual.png';
import bannerImg2 from '../images/slider/crop-blouse.png';
import bannerImg3 from '../images/slider/sleveless-middi.png';

//import feature icon
import { CiHeadphones } from 'react-icons/ci';
import { AiOutlineCreditCard, AiOutlineUndo } from 'react-icons/ai';


//sliders data

const Carosels = [
    {
        id: 1,
        backgroundImg: Slider1,
        sliderTitle: "40% Discount Now",
        sliderSubTitle: "Convallis interdum purus adipiscing dis parturient posuere ac a quam a eleifend montes parturient posuere curae tempor",
        btnText: "Shop Now"
    },
    {
        id: 2,
        backgroundImg: Slider2,
        sliderTitle: "On sale now",
        sliderSubTitle: "Convallis interdum purus adipiscing dis parturient posuere ac a quam a eleifend montes parturient posuere curae tempor",
        btnText: "Shop Now"
    },
    {
        id: 3,
        backgroundImg: Slider3,
        sliderTitle: "Black Friday Sale",
        sliderSubTitle: "Convallis interdum purus adipiscing dis parturient posuere ac a quam a eleifend montes parturient posuere curae tempor",
        btnText: "Shop Now"
    },

]

export default Carosels

// promobanners data
export const promoBanners = [
    {
        id: 1,
        image: bannerImg1,
        title: "Casual Dress Collection",
        subtitle: "Lorem ipsum dolor sit amet consectetur",
        btnBorder: "Shop Now"
    },
    {
        id: 2,
        image: bannerImg2,
        title: "Crop Blouse Collection",
        subtitle: "Lorem ipsum dolor sit amet consectetur",
        btnBorder: "Shop Now"
    },
    {
        id: 3,
        image: bannerImg3,
        title: "SleeveLess Middi Collection",
        subtitle: "Lorem ipsum dolor sit amet consectetur",
        btnBorder: "Shop Now"
    }
]




// feature box data
export const featureBoxes = [
    {
        id: 1,
        Icon: CiHeadphones,
        title: "CUSTOMER SUPPORT",
        subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec vestibulum magna, et dapib."
    },
    {
        id: 2,
        Icon: AiOutlineCreditCard,
        title: "SECURED PAYMENT",
        subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec vestibulum magna, et dapib."
    },

    {
        id: 3,
        Icon: AiOutlineUndo,
        title: "RETURNS",
        subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec vestibulum magna, et dapib."
    },
]

//site overvire info

export const siteDatas = [
    {
        id: 1,
        title: "Categories",
        amount: 20,
        monthlyProgress: "21% more than last month"

    },
    {
        id: 2,
        title: "Customers",
        amount: 7000,
        monthlyProgress: "30% more than last month"

    },
    {
        id: 3,
        title: "Products",
        amount: 3252,
        monthlyProgress: "29% more than last month"

    },
    {
        id: 4,
        title: "Total Orders",
        amount: 28,
        monthlyProgress: "15% more than last month"

    },
]

//site features

export const siteFeatures = [
    {
        id: 1,
        name: "Total Sales Graph",
        borderColor: "border-blue-900"
    },
    {
        id: 2,
        name: "Partners Commission",
        borderColor: "border-pink-600"
    },
    {
        id: 3,
        name: "Stock Availability",
        borderColor: "border-orange-400"
    },
    {
        id: 4,
        name: "Amazon Service",
        borderColor: "border-teal-400"
    },



]


//top categories 

export const topCategories = [
    {
        id: 1,
        categoryName: "Polo-shirt",
        total: 28
    },
    {
        id: 2,
        categoryName: "Sweat-shirt",
        total: 35
    },
    {
        id: 3,
        categoryName: "Hoodie",
        total: 15
    },
    {
        id: 4,
        categoryName: "Casual",
        total: 19
    },
    {
        id: 5,
        categoryName: "Mini-skirt",
        total: 12
    },
]