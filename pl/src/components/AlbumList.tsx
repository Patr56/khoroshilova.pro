import * as React from "react";

import {IAlbum} from "../Models";
import {ALBUM_IN_LINE} from "../Config";

import "./styles/album-list.css";
import {Album} from "./Album";

interface IProps {
    albums: IAlbum[];
}

export class AlbumList extends React.Component<IProps, {}> {
    render() {
        const {albums} = this.props;

        return (
            <div className="album-list">
                {albums.map((album, index) => (
                    <React.Fragment key={album.id}>
                        {index % ALBUM_IN_LINE === 0 && <div className="clothesline"/>}
                        <Album photos={album.photos}/>
                    </React.Fragment>
                )) }
            </div>
        );
    }
}