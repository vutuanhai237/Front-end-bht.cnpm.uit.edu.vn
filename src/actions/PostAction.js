import {
    POST_POST_POST,
    POST_POST_LIKE,
    POST_POST_SAVE,
    POST_POST_COMMENT,
    POST_GET_POST_BY_ID,
    POST_GET_SEARCH_POST,
    POST_GET_POST_COMMENT_BY_ID,
    POST_GET_IS_LIKE_POST_BY_UID,
    POST_GET_TOP_POST,
    POST_DEL_POST_UNLIKE,
    POST_GET_CATEGORIES_POST,
    POST_GET_POST_HIGHLIGHTS,
    POST_GET_POST_NEWESTS,
    POST_GET_POST_NEW_ACTIVITIES,
    POST_GET_TAGS_BY_ID,
} from "constants/constants"

// POST section
export function postPostPost(statusPostPostCode) {
    return {
        type: POST_POST_POST,
        payload: { 
            statusPostPostCode: statusPostPostCode
        }
    }
}

export function postGetTags(tags) {
    return {
        type: POST_GET_TAGS_BY_ID,
        payload: { 
            tags: tags
        }
    }
}

export function postPostLike(statusPostLikeCode) {
    return {
        type: POST_POST_LIKE,
        payload: { 
            statusPostLikeCode: statusPostLikeCode
        }
    }
}

export function delPostUnlike(statusPostUnLikeCode) {
    return {
        type: POST_DEL_POST_UNLIKE,
        payload: { 
            statusPostUnLikeCode: statusPostUnLikeCode
        }
    }
}


export function postPostSave(statusPostSaveCode) {
    return {
        type: POST_POST_SAVE,
        payload: { 
            statusPostSaveCode: statusPostSaveCode
        }
    }
}

export function postPostComment(statusPostCommentCode) {
    return {
        type: POST_POST_COMMENT,
        payload: { 
            statusPostCommentCode: statusPostCommentCode
        }
    }
}

export function postGetPostCommentByID(comments, statusGetCommentCode) {
    return {
        type: POST_GET_POST_COMMENT_BY_ID,
        payload: {
            comments: comments,
            statusGetCommentCode: statusGetCommentCode,
        }
    }
}


export function postGetIsLikePostByUID(liked) {
    return {
        type: POST_GET_IS_LIKE_POST_BY_UID,
        payload: {
            liked: liked,
        }
    }
}




// POSTS section
export function postGetPostHighlights(highlights) {
    return {
        type: POST_GET_POST_HIGHLIGHTS,
        payload: { 
            highlights: highlights
        }
    }
}

export function postGetPostNewests(newests) {
    return {
        type: POST_GET_POST_NEWESTS,
        payload: { 
            newests: newests
        }
    }
}

export function postGetPostNewActivities(newActivities) {
    return {
        type: POST_GET_POST_NEW_ACTIVITIES,
        payload: { 
            newActivities: newActivities
        }
    }
}

export function postGetCategoriesPost(categories) {
    return {
        type: POST_GET_CATEGORIES_POST,
        payload: { 
            categories: categories
        }
    }
}

export function postGetPostByID(post) {
    return {
        type: POST_GET_POST_BY_ID,
        payload: { 
            post: post
        }
    }
}


export function postGetSearchPost(posts) {
    return {
        type: POST_GET_SEARCH_POST,
        payload: { 
            posts: posts
        }
    }
}

export function postGetTopPost(topPost) {
    return {
        type: POST_GET_TOP_POST,
        payload: { 
            topPost: topPost
        }
    }
}
