import axios, {AxiosResponse} from 'axios';
import {IAlbumsRs, ILastAlbumsRs, IResponse} from "./Models";

export function loadLastAlbums(): Promise<ILastAlbumsRs> {
    return axios.request({
        url: '/rest/album/last',
        method: 'get',
    }).then((result: AxiosResponse<IResponse<ILastAlbumsRs>>) => {
        if (result.data.success === true) {
            return result.data.body;
        } else {
            throw new Error(result.data.error);
        }
    });
}

export function loadAlbums(id?: string): Promise<IAlbumsRs> {
    return axios.request({
        url: `/rest/album/${typeof id !== "undefined" ? id : ""}`,
        method: 'get',
    }).then((result: AxiosResponse<IResponse<IAlbumsRs>>) => {
        if (result.data.success === true) {
            return result.data.body;
        } else {
            throw new Error(result.data.error);
        }
    });
}

export function loadBlog(id?: string): Promise<IAlbumsRs> {
    return axios.request({
        url: `/rest/blog/${typeof id !== "undefined" ? id : ""}`,
        method: 'get',
    }).then((result: AxiosResponse<IResponse<IAlbumsRs>>) => {
        if (result.data.success === true) {
            return result.data.body;
        } else {
            throw new Error(result.data.error);
        }
    });
}
