import { Dispatch } from "redux";
import * as fetch from "isomorphic-fetch";
import { api } from "../common/utils";

import {
    RequestBasicInfoPost,
    ReceiveBasicInfoPost,
    RequestRecommendListPost,
    ReceiveRecommendListPost,
    RequestHotListPost,
    ReceiveHotListPost,
} from "../interface/common";

export const REQUEST_BASIC_INFO_POST = "REQUEST_BASIC_INFO_POST";
export const RECEIVE_BASIC_INFO_POST = "RECEIVE_BASIC_INFO_POST";
export const REQUEST_RECOMMENT_LIST_POST = 'REQUEST_RECOMMENT_LIST_POST';
export const RECEIVE_RECOMMENT_LIST_POST = 'RECEIVE_RECOMMENT_LIST_POST';
export const REQUEST_HOT_LIST_POST = 'REQUEST_HOT_LIST_POST';
export const RECEIVE_HOT_LIST_POST = 'RECEIVE_HOT_LIST_POST';

function requestBasicInfoPost(data: RequestBasicInfoPost) {
    return {
        type: REQUEST_BASIC_INFO_POST,
        requestData: data,
    }
}
function receiveBasicInfoPost(data: ReceiveBasicInfoPost) {
    return {
        type: RECEIVE_BASIC_INFO_POST,
        responseData: data,
    }
}
export function fetchBasicInfoPost({
    url,
    data,
}: {
        url: string;
        data: RequestBasicInfoPost;
    }) {
    return (dispatch: Dispatch<any>) => {
        dispatch(requestBasicInfoPost(data));

        return api
            .post(url, data)
            .then(res => {
                dispatch(receiveBasicInfoPost(<ReceiveBasicInfoPost>res.data));
            })
    }
}

function requestRecommendListPost(data: RequestRecommendListPost) {
    return {
        type: REQUEST_RECOMMENT_LIST_POST,
        requestData: data,
    }
}
function receiveRecommendListPost(data: ReceiveRecommendListPost) {
    return {
        type: RECEIVE_RECOMMENT_LIST_POST,
        responseData: data
    }
}
export function fetchRecommendList({
    url,
    data,
}: {
        url: string;
        data: RequestRecommendListPost;
    }) {
    return (dispatch: Dispatch<any>) => {
        dispatch(requestRecommendListPost(data));

        return api
            .post(url, data)
            .then(res => {
                dispatch(receiveRecommendListPost(<ReceiveRecommendListPost>res.data));
            })
    }
}

function requestHotListPost(data: RequestHotListPost) {
    return {
        type: REQUEST_HOT_LIST_POST,
        requestData: data,
    }
}
function receiveHotListPost(data: ReceiveHotListPost) {
    return {
        type: RECEIVE_HOT_LIST_POST,
        responseData: data
    }
}
export function fetchHotList({
    url,
    data,
}: {
        url: string;
        data: RequestHotListPost;
    }) {
    return (dispatch: Dispatch<any>) => {
        dispatch(requestHotListPost(data));

        return api
            .post(url, data)
            .then(res => {
                dispatch(receiveHotListPost(<ReceiveHotListPost>res.data));
            })
    }
}