import { combineReducers } from "redux";
import HomeReducer from "redux/reducers/HomeReducer"
import DocReducer from "redux/reducers/docReducer"
import PostReducer from "redux/reducers/postReducer"
import UserReducer from "redux/reducers/userReducer"
import PostCategoryReducer from "redux/reducers/postCategoryReducer"
import DocCategoryReducer from "redux/reducers/docCategoryReducer"
import TagReducer from "redux/reducers/tagReducer"
var RootReducer = combineReducers({
    home: HomeReducer,
    user: UserReducer,
    post: PostReducer,
    document: DocReducer,
    post_category: PostCategoryReducer,
    doc_category: DocCategoryReducer,
    tag: TagReducer
});

export default RootReducer;