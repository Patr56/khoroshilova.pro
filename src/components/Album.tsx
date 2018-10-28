import * as React from "react";

import {getRandom} from "../Util";
import {IPhoto} from "../Models";
import {MAX_PHOTO_IN_ALBUM_PREVIEW} from "../Config";

import "./styles/album.css";

interface IProps {
    photos: IPhoto[];
    count?: number;
    onClick: () => void;
}

export class Album extends React.Component<IProps, {}> {

    shouldComponentUpdate(nextProps: IProps): boolean {
        return this.props.photos === nextProps.photos
    }

    getStyle = (): React.CSSProperties => ({
        transform: `rotate(${getRandom(-5, 5)}deg)`
    });

    handlerClick = () => {
        this.props.onClick();
    };

    render() {
        const {photos, count} = this.props;

        const photosForPreview = photos
            .filter((_, index) => index < MAX_PHOTO_IN_ALBUM_PREVIEW)
            .sort((x, y) => (x.isCover === y.isCover)? 0 : x.isCover ? -1 : 1);


        const emptyPages = Array.from(Array(count > 5 ? 5 : count).keys());

        return (
            <div className="album link" onClick={this.handlerClick}>
                <div className="album_pin" style={this.getStyle()}/>
                <div className="album_pages">
                    {photosForPreview && photosForPreview.map((photo, index) => (
                        <div key={photo.id} className={`album_page ${index === 0 ?"album_page__transform-init" : ""}`} style={this.getStyle()}>
                            {index === 0 && (
                                <div className={"album_cover" + (count > 0 ? "" : " album_cover__photo")}>
                                    <img className="album_photo" src={photo.url.preview} alt=""/>
                                </div>
                            )}
                            {index === 0 && count > 0?  <div className="album_label" title={photo.name}>{photo.name}</div> : <div className="album_label"/>}
                        </div>
                    ))}
                    {count && emptyPages.map((_, index) => (
                        <div key={index} className="album_page" style={this.getStyle()}>
                            <div className="album_label"/>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
