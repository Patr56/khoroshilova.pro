import * as React from "react";

import {IAlbumsBase} from "../Models";
import {ALBUM_IN_LINE} from "../Config";

import "./styles/album-list.css";
import {Album} from "./Album";

interface IProps extends IAlbumsBase {
    id?: string;
}

export class AlbumList extends React.Component<IProps, {}> {

    handleClickAlbum = (albumId: string) => () => {
        console.log("handleClickAlbum", albumId);
    };

    handleClickPhoto = (albumId: string, photoId: string) => () => {
        console.log("handleClickAlbum", albumId, photoId);
    };

    render() {
        const {albums, photos, id} = this.props;
        let albumLength = albums.length;

        return (
            <div className="album-list">
                {albums && albums.map((album, index) => (
                    <React.Fragment key={album.id}>
                        {index % ALBUM_IN_LINE === 0 && <div className="clothesline"/>}
                        <Album
                            photos={album.photos}
                            onClick={this.handleClickAlbum(album.id)}
                        />
                    </React.Fragment>
                ))}
                {photos && id && photos.map((photo, index) => (
                    <React.Fragment key={photo.id}>
                        {(albumLength + index) % ALBUM_IN_LINE === 0 && <div className="clothesline"/>}
                        <Album
                            photos={[photo]}
                            onClick={this.handleClickPhoto(id, photo.id)}
                        />
                    </React.Fragment>
                ))}
            </div>
        );
    }
}