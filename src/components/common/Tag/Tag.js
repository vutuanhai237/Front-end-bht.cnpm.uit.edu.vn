import React, { Component } from 'react';
import './Tag.scss';

//Set text props for this component
class Tag extends Component {

    //onDelete, tag: id, name

    constructor(props) {
        super(props);
        console.log(this.props.onDelete)
    }

    onDelete = () => {
        this.props.onDeleteTag(this.props.tag);
    }

    onTagClick = () => {
        if (this.props.onTagClick)
            this.props.onTagClick(this.props.tag.id);
    }
    render() {
        return (
            <div className="simple-tag" onClick={this.onTagClick}>
                <div style={{ display: "flex" }}>
                    {!this.props.isReadOnly && <div onClick={this.onDelete} className="tag-delete-btn"><div className="close_8x8" /> </div>}
                    <div style={{ paddingLeft: "5px" }}> {this.props.tag.name} </div>
                </div>
            </div>
        )
    }


}

export default Tag;
