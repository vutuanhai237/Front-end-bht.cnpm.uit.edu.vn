
import {
    get_TrendingDocumentsListRequest,
    get_TrendingDocumentsListSuccess,
    get_TrendingDocumentsListFailure,

    get_HighlightPostsListRequest,
    get_HighlightPostsListSuccess,
    get_HighlightPostsListFailure,

    get_NewestPostsListRequest,
    get_NewestPostsListSuccess,
    get_NewestPostsListFailure,

    get_NewestActivitiesRequest,
    get_NewestActivitiesSuccess,
    get_NewestActivitiesFailure,

} from "redux/actions/homeAction.js";
import { remoteServiceBaseUrl } from 'utils/httpServices'

export function getTrendingDocumentsList() {

    return dispatch => {

        var myHeaders = new Headers();

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        dispatch(get_TrendingDocumentsListRequest());

        fetch(`${remoteServiceBaseUrl}docs/trending`, requestOptions)
            .then(response => response.json())
            .then(
                result => {
                    dispatch(get_TrendingDocumentsListSuccess(result));
                }
            )
            .catch(error => {
                dispatch(get_TrendingDocumentsListFailure(error)); //
            })
    }
}

export function getNewestPostsList() {

    return dispatch => {

        var myHeaders = new Headers();

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        dispatch(get_NewestPostsListRequest());

        fetch(`${remoteServiceBaseUrl}/posts/newest`, requestOptions)
            .then(response => response.json())
            .then(
                result => {
                    let result_1 = result;
                    let IDarr = ''; result.map(item => IDarr += item.id + ","
                    )
                    console.log(result);
                    fetch(`${remoteServiceBaseUrl}/posts/statistic?postIDs=${IDarr}`, requestOptions)
                        .then(response => response.json())
                        .then(
                            result => {
                                let arr = result_1.map((item, i) => Object.assign({}, item, result[i]));
                                console.log(arr);
                                dispatch(get_NewestPostsListSuccess(arr))
                            }).catch(error => dispatch(get_NewestPostsListFailure(error)))
                }
            )
            .catch(error => {

                dispatch(get_NewestPostsListFailure(JSON.parse(error))); //
            })
    }
}

//highlight post
export function getHighlightPostsList() {
    return dispatch => {

        dispatch(get_HighlightPostsListRequest());

        var myHeaders = new Headers();
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${remoteServiceBaseUrl}/posts/newest`, requestOptions)
            .then(response => response.json())
            .then(
                result => {
                    let result_1 = result;
                    let IDarr = ''; result.map(item => IDarr += item.id + ","
                    )
                    console.log(result);
                    fetch(`${remoteServiceBaseUrl}/posts/statistic?postIDs=${IDarr}`, requestOptions)
                        .then(response => response.json())
                        .then(
                            result => {
                                let arr = result_1.map((item, i) => Object.assign({}, item, result[i]));
                                dispatch(get_HighlightPostsListSuccess(arr))
                            }).catch(error => dispatch(get_HighlightPostsListFailure(error)))
                }
            )
            .catch(error => {
                dispatch(get_HighlightPostsListFailure(error))
            })
    }
}


export function getNewestActivities() {
    return dispatch => {

        dispatch(get_NewestActivitiesRequest());

        var myHeaders = new Headers();
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`https://5fca2bc63c1c220016441d27.mockapi.io/highlight`, requestOptions)
            .then(response => response.text())
            .then(
                result => {
                    dispatch(get_NewestActivitiesSuccess(JSON.parse(result)));
                }
            )
            .catch(error => {
                dispatch(get_NewestActivitiesFailure(error))
            })
    }
}