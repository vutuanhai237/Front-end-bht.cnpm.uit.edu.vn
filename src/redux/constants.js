export const HOME_GET_TOP_DOC = "HOME_GET_TOP_DOC";
export const HOME_GET_TOP_DOCUMENT = "HOME_GET_TOP_DOCUMENT";
export const HOME_GET_ACCOUNT_INFO = "HOME_GET_ACCOUNT_INFO";

// doc
//// 1. For writer
export const DOC_POST_DOC = "DOC_POST_DOC";
export const DOC_GET_SUBJECTS = "DOC_GET_SUBJECTS";
export const DOC_GET_SEMESTERS = "DOC_GET_SEMESTERS";
//// 2. For reader
export const DOC_POST_UP_VIEW_DOC = "DOC_POST_UP_VIEW_DOC";
export const DOC_POST_UP_DOWNLOAD_DOC = "DOC_POST_UP_DOWNLOAD_DOC";
export const DOC_GET_TOP_DOC = "DOC_GET_TOP_DOC";
export const DOC_GET_SEARCH_DOC = "DOC_GET_SEARCH_DOC";
export const DOC_GET_DOC_BY_ID = "DOC_GET_DOC_BY_ID";

// post
//// 1. For writer
export const POST_POST_POST = "POST_POST_POST";
export const POST_GET_HASHTAG = "POST_GET_HASHTAG";

//// 2. For reader
export const POST_POST_LIKE = "POST_POST_LIKE_POST";
export const POST_POST_SAVE = "POST_POST_COMMENT_POST";
export const POST_POST_COMMENT = "POST_POST_COMMENT_POST";
export const GET_POSTS_LIST = "GET_POSTS_LIST";
export const POST_GET_TOP_POST = "POST_GET_TOP_POST";
export const POST_GET_POST_BY_ID = "POST_GET_POST_BY_ID";
export const POST_GET_POST_COMMENT_BY_ID = "POST_GET_POST_COMMENT_BY_ID";
export const POST_DEL_POST_UNLIKE = "POST_DEL_POST_UNLIKE";
export const POST_GET_IS_LIKE_POST_BY_UID = "POST_GET_IS_LIKE_POST_BY_UID";
export const GET_HIGHLIGHT_POSTS = "GET_HIGHLIGHT_POSTS";
export const POST_GET_POST_NEWESTS = "POST_GET_POST_NEWESTS";
export const POST_GET_POST_NEW_ACTIVITIES = "POST_GET_POST_NEW_ACTIVITIES";
export const POST_GET_TAGS_BY_ID = "POST_GET_TAGS_BY_ID";

// user
export const USER_POST_LOGIN = "USER_POST_LOGIN";
export const USER_POST_REGISTER = "USER_POST_REGISTER";
export const USER_GET_CURRENT_USER = "USER_GET_CURRENT_USER";
export const USER_GET_LOGOUT = "USER_GET_LOGOUT";
//#endregion 

//#region management exclusive constant

//for document
export const GET_ALL_NOT_APPROVED_DOCUMENTS = "GET_ALL_NOT_APPROVED_DOCUMENTS";
export const APPROVE_A_DOCUMENT = "APPROVE_A_DOCUMENT";


//for document
export const GET_ALL_NOT_APPROVED_POSTS = "GET_ALL_NOT_APPROVED_POSTS";
export const APPROVE_A_POST = "APPROVE_A_POSTS";

//user
export const GET_ALL_USERS = "GET_ALL_USERS"
export const GET_ALL_ROLES = "GET_ALL_ROLES"
// export const 

//my posts list:
export const GET_MY_POSTS_REQUEST = "GET_MY_POSTS_REQUEST";
export const GET_MY_POSTS_SUCCESS = "GET_MY_POSTS_SUCCESS";
export const GET_MY_POSTS_FAILURE = "GET_MY_POSTS_FAILURE";

//my documents list:
export const GET_MY_DOCUMENTS_REQUEST = "GET_MY_DOCUMENTS_REQUEST";
export const GET_MY_DOCUMENTS_SUCCESS = "GET_MY_DOCUMENTS_SUCCESS";
export const GET_MY_DOCUMENTS_FAILURE = "GET_MY_DOCUMENTS_FAILURE";

//post category: 
export const GET_POST_CATEGORIES_REQUEST = "GET_POST_CATEGORIES_REQUEST";
export const GET_POST_CATEGORIES_SUCCESS = "GET_POST_CATEGORIES_SUCCESS";
export const GET_POST_CATEGORIES_FAILURE = "GET_POST_CATEGORIES_FAILURE";

//doc category: 
export const GET_DOC_CATEGORIES_REQUEST = "GET_DOC_CATEGORIES_REQUEST";
export const GET_DOC_CATEGORIES_SUCCESS = "GET_DOC_CATEGORIES_SUCCESS";
export const GET_DOC_CATEGORIES_FAILURE = "GET_DOC_CATEGORIES_FAILURE";

//search posts result:
export const GET_POST_SEARCH_RESULT_REQUEST = "GET_POST_SEARCH_RESULT_REQUEST";
export const GET_POST_SEARCH_RESULT_SUCCESS = "GET_POST_SEARCH_RESULT_SUCCESS";
export const GET_POST_SEARCH_RESULT_FAILURE = "GET_POST_SEARCH_RESULT_FAILURE";

//search document result:
export const GET_DOCUMENT_SEARCH_RESULT_REQUEST = "GET_DOCUMENT_SEARCH_RESULT_REQUEST";
export const GET_DOCUMENT_SEARCH_RESULT_SUCCESS = "GET_DOCUMENT_SEARCH_RESULT_SUCCESS";
export const GET_DOCUMENT_SEARCH_RESULT_FAILURE = "GET_DOCUMENT_SEARCH_RESULT_FAILURE";

//search tag result:
export const GET_TAG_SEARCH_RESULT_REQUEST = "GET_TAG_SEARCH_RESULT_REQUEST";
export const GET_TAG_SEARCH_RESULT_SUCCESS = "GET_TAG_SEARCH_RESULT_SUCCESS";
export const GET_TAG_SEARCH_RESULT_FAILURE = "GET_TAG_SEARCH_RESULT_FAILURE";

//search quick search result:
export const GET_QUICK_SEARCH_RESULT_REQUEST = "GET_QUICK_SEARCH_RESULT_REQUEST";
export const GET_QUICK_SEARCH_RESULT_SUCCESS = "GET_QUICK_SEARCH_RESULT_SUCCESS";
export const GET_QUICK_SEARCH_RESULT_FAILURE = "GET_QUICK_SEARCH_RESULT_FAILURE";

//#endregion
