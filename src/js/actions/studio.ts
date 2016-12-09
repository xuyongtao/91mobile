import { Dispatch } from "redux";
import * as fetch from "isomorphic-fetch";
import { api } from "../common/utils";

export const REQUEST_INDEX_PAGE_INFO_POST = "REQUEST_INDEX_PAGE_INFO_POST";
export const RECEIVE_INDEX_PAGE_INFO_POST = "RECEIVE_INDEX_PAGE_INFO_POST";
export const REQUEST_TEACHER_LIST_POST = "REQUEST_TEACHER_LIST_POST";
export const RECEIVE_TEACHER_LIST_POST = "RECEIVE_TEACHER_LIST_POST";

import {
    RequestIndexPageInfoPost,
    ReceiveIndexPageInfoPost,
    RequestTeacherListPost,
    ReceiveTeacherListPost,
} from "../interface/studio";

function requestIndexPageInfoPost(data: RequestIndexPageInfoPost) {
    return {
        type: REQUEST_INDEX_PAGE_INFO_POST,
        requestData: data,
    }
}
function receiveIndexPageInfoPost(data: ReceiveIndexPageInfoPost) {
    return {
        type: RECEIVE_INDEX_PAGE_INFO_POST,
        responseData: data
    }
}
export function fetchIndexPageInfo({
    url,
    data,
}: {
        url: string;
        data: RequestIndexPageInfoPost;
    }) {
    return (dispatch: Dispatch<any>) => {
        dispatch(requestIndexPageInfoPost(data));

        return api
            .post(url, data)
            .then(res => {
                dispatch(receiveIndexPageInfoPost(<ReceiveIndexPageInfoPost>res.data));
            })
    }
}

function requestTeacherList(data: RequestTeacherListPost) {
    return {
        type: REQUEST_TEACHER_LIST_POST,
        requestData: data,
    }
}
function receiveTeacherList(data: ReceiveTeacherListPost) {
    return {
        type: RECEIVE_TEACHER_LIST_POST,
        responseData: data,
    }
}
export function fetchTeacherList({
    url,
    data,
}: {
        url: string;
        data: RequestTeacherListPost
    }) {
    return (dispatch: Dispatch<any>) => {
        dispatch(requestTeacherList(data));

        return api
            .post(url, data)
            .then(res => {
                dispatch(receiveTeacherList(<ReceiveTeacherListPost>res.data));
            })
    }
}