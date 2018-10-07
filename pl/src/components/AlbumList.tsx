import * as React from "react";

import {IAlbumsRs, IData, IStore} from "../Models";
import {ALBUM_IN_LINE} from "../Config";

import "./styles/album-list.css";
import {Album} from "./Album";
import {initAlbum} from "../reducers/ReducerGetAlbums";
import {Dispatch} from "redux";
import {getAlbums, viewPhoto} from "../Actions";
import {connect} from "react-redux";
import {EStatus} from "../Enums";


interface IActionProps {
    loadAlbums: (id?: string) => void;
    viewPhoto: (albumId: string, photoId: string, index: number) => void;
}

interface IStoreProps {
    album: IData<IAlbumsRs>;
}

interface IOwnProps {
    id?: string;
    onClickAlbum?: (albumId: string) => void;
    onClickPhoto?: (albumId: string, photoId: string, index: number) => void;
}

interface IProps extends IOwnProps, IStoreProps, IActionProps {

}

export class AlbumList extends React.Component<IProps, {}> {

    componentDidMount() {
        this.props.loadAlbums(this.props.id);
    }

    handleClickAlbum = (albumId: string) => () => {
        this.props.loadAlbums(albumId);
        this.props.onClickAlbum && this.props.onClickAlbum(albumId);
    };

    handleClickPhoto = (albumId: string, photoId: string, index: number) => () => {
        this.props.viewPhoto(albumId, photoId, index);
        this.props.onClickPhoto && this.props.onClickPhoto(albumId, photoId, index);
    };

    render() {
        const {album: {status, data: {albums, photos, id}, error}} = this.props;
        let albumLength = albums && albums.length;

        return (
            <div className="album-list">
                {status === EStatus.BEGIN && (
                    <div className="album-list_loader">Загрузка</div>
                )}
                {status === EStatus.FAILURE && (
                    <div className="album-list_failure">{error}</div>
                )}
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
                            onClick={this.handleClickPhoto(id, photo.id, index)}
                        />
                    </React.Fragment>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (store: IStore): IStoreProps => {
    const currentAlbumId = store.reducerGetAlbums.currentAlbumId;
    const currentAlbum = store.reducerGetAlbums.albums[currentAlbumId];

    const album: IData<IAlbumsRs> = currentAlbum ? {...currentAlbum} : initAlbum();

    return {
        album
    }
};

const mapDispatchToProps = (dispatch: Dispatch): IActionProps => {
    return {
        loadAlbums: (id?: string) => {
            dispatch(getAlbums(id))
        },
        viewPhoto: (albumId: string, photoId: string, index: number) => {
            dispatch(viewPhoto(albumId, photoId, index))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AlbumList)