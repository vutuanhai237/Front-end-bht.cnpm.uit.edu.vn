import { combineReducers } from "redux";
import HomeReducer from "redux/reducers/homeReducer"
import DocReducer from "redux/reducers/docReducer"
import PostReducer from "redux/reducers/postReducer"
import UserReducer from "redux/reducers/userReducer"
import PostCategoryReducer from "redux/reducers/postCategoryReducer"
import DocCategoryReducer from "redux/reducers/docCategoryReducer"
import TagReducer from "redux/reducers/tagReducer"
import CourseReducer from "redux/reducers/courseReducer"
import CourseCategoryReducer from "redux/reducers/courseCategoryReducer"
import HeadingReducer from "redux/reducers/headingReducer"
import CommonReducer from "redux/reducers/commonReducer"

var RootReducer = combineReducers({
    home: HomeReducer,
    user: UserReducer,
    post: PostReducer,
    document: DocReducer,
    post_category: PostCategoryReducer,
    doc_category: DocCategoryReducer,
    tag: TagReducer,
    course: CourseReducer,
    course_category: CourseCategoryReducer,
    heading: HeadingReducer,
    common: CommonReducer,
});

export default RootReducer;