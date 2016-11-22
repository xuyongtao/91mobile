import "./index.less";
import * as React from "react";
import { render, findDOMNode } from "react-dom";
import { TouchEvent, UIEvent } from "react";
import SwipeableViews from "react-swipeable-views";
import LazyLoad from "react-lazyload";
// import AutoPlay from "react-swipeable-views/lib/autoPlay";

// const test = AutoPlay(SwipeableViews);
// console.log(SwipeableViews);
// console.log(AutoPlay);

import * as Lodash from "lodash";

interface PhotosSwiperProps {
    hidden: boolean,
    maxSwiperWidth?: number,
    pics: string[],
    index: number,
    closeHandler(): void,
}
interface PhotosSwiperStates {
    swiperWidth: number,
    swiperHeight: number,
}

class PhotosSwiper extends React.Component<PhotosSwiperProps, PhotosSwiperStates> {
    constructor(props: PhotosSwiperProps, context: PhotosSwiperStates) {
        super(props, context);

        this.state = {
            swiperWidth: 0,
            swiperHeight: 0,
        }
    }

    getClientWH() {
        let node = findDOMNode(this.refs['swiper']);

        return {
            W: node.clientWidth,
            H: node.clientHeight,
        }
    }

    clickHandler() {
        this.props.closeHandler();
    }

    componentDidMount() {
        this.setState({
            swiperWidth: this.getClientWH().W,
            swiperHeight: this.getClientWH().H,
        })
    }

    render() {
        console.log('index: ', this.props.index);

        let swiperStyle = this.state.swiperWidth ? { width: this.state.swiperWidth } : null;
        let slideStyle = {
            height: "100%",
            width: "100%",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        };
        let swipeableViewsProps = {
            resistance: true,
            index: this.props.index,
            slideStyle: {
                paddingLeft: "2.5%",
                paddingRight: "2.5%",
            }
        };

        return (
            <div id="swiper" ref="swiper" style={ swiperStyle } hidden={ this.props.hidden } onClick={ this.clickHandler.bind(this) }>
                <SwipeableViews { ...swipeableViewsProps }>
                    { this.props.pics.map((pic: string, index: number) => {
                        return (
                            <div key={ index } style={ Lodash.assign({}, slideStyle, { backgroundImage: `url(${require(pic)})` }) } ></div>
                        )
                    }) }
                </SwipeableViews>

            </div>
        )
    }
}

interface TeacherPhotosProps {
    params: {
        [key: string]: any
    },
}
interface TeacherPhotosStates {
    hiddenSwiper?: boolean;
    pics?: string[];
    swiperIndex?: number;
}

export default class TeacherPhotos extends React.Component<TeacherPhotosProps, TeacherPhotosStates> {
    constructor(props: TeacherPhotosProps, context: TeacherPhotosStates) {
        super(props, context);

        this.state = {
            hiddenSwiper: true,
            pics: [],
            swiperIndex: 0,
        };
    }

    showPhotosSwiper(index: number) {
        this.setState({
            hiddenSwiper: false,
            swiperIndex: index,
        })
    }

    hidePhotosSwiper() {
        this.setState({
            hiddenSwiper: true,
        })
    }

    componentDidMount() {
        // 通过请求获取图片的链接地址
        this.setState({
            pics: ["./pic2.jpeg", "./pic3.jpeg", "./pic1.jpeg", "./pic4.jpeg", "./pic6.png", "./pic5.jpeg", "./pic7.png", "./pic8.png", "./pic10.jpeg", "./pic9.png", "./pic2.jpeg", "./pic1.jpeg", "./pic5.jpeg", "./pic3.jpeg", "./pic4.jpeg", "./pic6.png", "./pic8.png", "./pic9.png", "./pic10.jpeg", "./pic7.png"],
        })
    }

    render() {
        let swiperProps = {
            hidden: this.state.hiddenSwiper,
            pics: this.state.pics,
            index: this.state.swiperIndex,
            closeHandler: this.hidePhotosSwiper.bind(this),
        };
        let lazyloadProps = {
            height: 200,
        };
        let pics = {
            left: this.state.pics.slice(0, Math.floor(this.state.pics.length / 2)),
            right: this.state.pics.slice(Math.floor(this.state.pics.length / 2), this.state.pics.length),
        };

        return (
            <div id="gallery-wall">
                <PhotosSwiper { ...swiperProps }/>

                <div className="gallery-wall-left">
                    { pics.left.map((pic, index) => {
                        return (
                            <div key={ index } className="gallery-wall-item" onClick={ this.showPhotosSwiper.bind(this, index) }>
                                <LazyLoad { ...lazyloadProps }>
                                    <img src={ require(pic) } alt={ `图片${index}` }/>
                                </LazyLoad>
                            </div>
                        )
                    }) }
                </div>
                <div className="gallery-wall-right">
                    { pics.right.map((pic, index) => {
                        return (
                            <div key={ index } className="gallery-wall-item" onClick={ this.showPhotosSwiper.bind(this, index + Math.floor(this.state.pics.length / 2)) }>
                                <LazyLoad { ...lazyloadProps }>
                                    <img src={ require(pic) } alt={ `图片${index + Math.floor(this.state.pics.length / 2)}` }/>
                                </LazyLoad>
                            </div>
                        )
                    }) }
                </div>
            </div>
        )
    }
}



