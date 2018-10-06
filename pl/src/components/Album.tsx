import * as React from "react";
import {Link} from "react-router-dom";

import {IPhoto} from "../Models";
import {MAX_PHOTO_IN_ALBUM_PREVIEW} from "../Config";

import "./styles/album.css";

interface IProps {
    photos: IPhoto[]
}

export class Album extends React.Component<IProps, {}> {

    getRandomArbitrary = (min: number, max: number): number => Math.random() * (max - min) + min;

    getStyle = (): React.CSSProperties => ({
        transform: `rotate(${this.getRandomArbitrary(-5, 5)}deg)`
    });

    render() {
        const {photos} = this.props;

        const photosForPreview = photos
            .filter((_, index) => index < MAX_PHOTO_IN_ALBUM_PREVIEW)
            .sort((x, y) => (x.isCover === y.isCover)? 0 : x.isCover ? -1 : 1);

        return (
            <Link className="link" to="/portfolio">
                <div className="album">
                    <div className="album_pin" style={this.getStyle()}/>
                    <div className="album_pages">
                        {photosForPreview && photosForPreview.map((photo, index) => (
                            <div key={photo.id} className={`album_page ${index === 0 ?"album_page__transform-init" : ""}`} style={this.getStyle()}>
                                {index === 0 && <img className="album_photo" src={photo.url.preview} alt=""/>}
                                {index === 0 ?  <div className="album_label">{photo.name}</div> : <div className="album_label"/>}
                            </div>
                        ))}
                    </div>
                </div>
            </Link>
        );
    }
}