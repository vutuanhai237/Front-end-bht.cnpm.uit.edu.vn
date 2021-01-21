import {
    GET_DAI_CUONG_COURSES_LIST_REQUEST,
    GET_DAI_CUONG_COURSES_LIST_SUCCESS,
    GET_DAI_CUONG_COURSES_LIST_FAILURE,

    GET_CS_NHOM_NGANH_COURSES_LIST_REQUEST,
    GET_CS_NHOM_NGANH_COURSES_LIST_SUCCESS,
    GET_CS_NHOM_NGANH_COURSES_LIST_FAILURE,

    GET_COURSES_LIST_REQUEST,
    GET_COURSES_LIST_SUCCESS,
    GET_COURSES_LIST_FAILURE,

    GET_MY_COURSES_REQUEST,
    GET_MY_COURSES_SUCCESS,
    GET_MY_COURSES_FAILURE,

    GET_COURSE_SEARCH_RESULT_REQUEST,
    GET_COURSE_SEARCH_RESULT_SUCCESS,
    GET_COURSE_SEARCH_RESULT_FAILURE,


} from '../constants.js'

const initialState = {


    //search post: use for search post and post list
    daiCuongCoursesList: {
        isLoading: false,
        data: [],
        error: ""
    },
    coSoNhomNganhCoursesList: {
        isLoading: false,
        data: [],
        error: ""
    },
    coursesList: {
        isLoading: false,
        data: [],
        error: ""
    },
    //my posts
    myCourses: {
        isLoading: false,
        data: [],
        error: ""
    },

};

function CourseReducer(state = initialState, action) {
    switch (action.type) {

        //get my post
        case GET_MY_COURSES_REQUEST:
            return {
                ...state, myCourses: { isLoading: true }
            };
        case GET_MY_COURSES_SUCCESS:
            {
                return { ...state, myCourses: { isLoading: false, data: action.payload, error: '' } }
            }
        case GET_MY_COURSES_FAILURE:
            {
                return { ...state, myCourses: { isLoading: false, error: action.payload, data: [] } }
            }

        //get post search result
        case GET_COURSE_SEARCH_RESULT_REQUEST:
        case GET_COURSES_LIST_REQUEST:
            return {
                ...state, postsList: { isLoading: true }
            };
        case GET_COURSE_SEARCH_RESULT_SUCCESS:
        case GET_COURSES_LIST_SUCCESS:
            {
                return { ...state, postsList: { isLoading: false, data: action.payload, error: '' } }
            }
        case GET_COURSE_SEARCH_RESULT_FAILURE:
        case GET_COURSES_LIST_FAILURE:
            {
                return { ...state, postsList: { isLoading: false, error: action.payload, data: [] } }
            }

        default:
            return state;
    }
}

export default CourseReducer;
