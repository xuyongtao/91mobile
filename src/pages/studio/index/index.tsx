import "./index.less";

import * as React from "react";
import { render } from "react-dom";
import { Link } from "react-router";

import Course from "../../../components/course/index";
import BasicInfo from "../../../components/basic-info/index";
import Carousel from "../../../components/carousel/index";
import EmptyList from "../../../components/empty-list/index";
import LoadingToast from "../../../components/toast/index";
import IntroPanel from "../intro/index";

import { Role } from "../../../js/common/config";

import { getStudioIndexPageInfo } from "../../../js/store/index";
import { ReceiveIndexPageInfoPost } from "../../../js/interface/studio";
import { CourseBasic, BasicInfo as BasicInfoInterface } from "../../../js/interface/common";

interface IndexPageProps {
    params: {
        sid: string;
    },
    initData?: StudioIndexDataBasic;
    handleSaveStudioIndexData?: (data: StudioIndexDataBasic) => void;
}

export interface StudioIndexDataBasic {
    banners?: string[];
    courses?: CourseBasic[];
    teachers?: BasicInfoInterface[];
    intro?: string;
}

interface IndexPageState {
    loading?: boolean;
    data?: StudioIndexDataBasic;
}

export default class IndexPage extends React.Component<IndexPageProps, IndexPageState> {
    constructor(props: IndexPageProps) {
        super(props);

        this.state = {
            loading: false,
            data: {
                banners: [],
                courses: [],
                teachers: [],
                intro: "",
            }
        }
    }

    static propTypes = {
        initData: React.PropTypes.object,
        handleSaveStudioIndexData: React.PropTypes.func,
    }

    componentDidMount() {
        if (this.props.initData) {
            this.setState({
                data: this.props.initData,
            });
        } else {
            this.setState({
                loading: true,
            })

            getStudioIndexPageInfo(Number(this.props.params.sid))
                .then(res => {
                    let data: StudioIndexDataBasic = {
                        banners: res.banners,
                        courses: res.courses,
                        teachers: res.teachers,
                        intro: res.intro,
                    };

                    this.setState({ data });

                    this.props.handleSaveStudioIndexData && this.props.handleSaveStudioIndexData(data);
                })
                .handle(() => {
                    this.setState({
                        loading: false,
                    })
                })
        }
    }

    render() {
        const { loading } = this.state;
        const { courses, teachers, intro, banners } = this.state.data;

        const CarouselProps = {
            pics: banners,
        };

        const loadingToastProps = {
            tip: "加载中...",
            iconClassName: "icon-loading",
            isOpen: this.state.loading,
        };

        if (loading) {
            return (
                <LoadingToast { ...loadingToastProps }/>
            )
        } else {
            return (
                <div>
                    {
                        !banners.length && !courses.length && !teachers.length && !intro ?
                            <EmptyList tip="该机构暂未完善信息" /> :
                            <div className="studio-index-page">
                                { banners.length ?
                                    <Carousel { ...CarouselProps } /> :
                                    null
                                }

                                { courses.length ?
                                    <div className="hot-courses">
                                        <div className="title">
                                            <h2>热门课程</h2>
                                            <Link className="link-more" to={ `/studio/${this.props.params.sid}/courses` }>更多</Link>
                                        </div>
                                        <ul className="course-list">
                                            { courses.map((course, index) => {
                                                let courseProps = {
                                                    cid: course.cid,
                                                    title: course.title,
                                                    cover: course.cover,
                                                    detail: course.detail,
                                                }
                                                return (
                                                    <li key={ index }>
                                                        <Course { ...courseProps } />
                                                    </li>
                                                )
                                            }) }
                                        </ul>
                                    </div> :
                                    null
                                }

                                { teachers.length ?
                                    <div className="hot-teachers">
                                        <div className="title">
                                            <h2>热门老师</h2>
                                            <Link className="link-more" to={ `/studio/${this.props.params.sid}/teachers` }>更多</Link>
                                        </div>
                                        <ul className="teacher-list">
                                            { teachers.map((teacher, index) => {
                                                let teacherProps = {
                                                    id: teacher.id,
                                                    role: Role.teacher,
                                                    avatar: teacher.avatar,
                                                    name: teacher.name,
                                                    teachingAge: teacher.teachingAge,
                                                    selfIntro: teacher.selfIntro,
                                                }

                                                return (
                                                    <li key={ index }>
                                                        <BasicInfo { ...teacherProps } />
                                                    </li>
                                                )
                                            }) }
                                        </ul>
                                    </div> :
                                    null
                                }

                                { intro ?
                                    <div className="intro">
                                        <div className="title">
                                            <h2>机构介绍</h2>
                                        </div>
                                        <div className="intro-cont" dangerouslySetInnerHTML={{ __html: intro }}></div>
                                    </div> :
                                    null
                                }
                            </div>
                    }
                </div>
            )
        }
    }
}