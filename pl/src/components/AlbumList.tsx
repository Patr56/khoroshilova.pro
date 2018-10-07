import * as React from "react";

import {IAlbumsRs} from "../Models";
import {ALBUM_IN_LINE} from "../Config";

import "./styles/album-list.css";
import {Album} from "./Album";

interface IProps extends IAlbumsRs {

}

export class AlbumList extends React.Component<IProps, {}> {
    render() {
        const {albums, photos} = this.props;
        let albumLength = albums.length;

        return (
            <div className="album-list">
                {albums.map((album, index) => (
                    <React.Fragment key={album.id}>
                        {index % ALBUM_IN_LINE === 0 && <div className="clothesline"/>}
                        <Album photos={album.photos}/>
                    </React.Fragment>
                ))}
                {photos && photos.map((photo, index) => (
                    <React.Fragment key={photo.id}>
                        {(albumLength + index) % ALBUM_IN_LINE === 0 && <div className="clothesline"/>}
                        <Album photos={[photo]}/>
                    </React.Fragment>
                ))}
            </div>
        );
    }
}