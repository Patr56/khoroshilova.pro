import * as React from "react";
import { Link } from "react-router-dom";
import {RouteComponentProps, withRouter} from "react-router";

import {IAlbumsRs, IData, IStore, IPath} from "../Models";
import {ALBUM_IN_LINE} from "../Config";

import {Album} from "./Album";
import {initAlbum} from "../reducers/ReducerGetAlbums";
import {Dispatch} from "redux";
import {getAlbums, viewPhoto} from "../Actions";
import {connect} from "react-redux";
import {EStatus} from "../Enums";
import {getRandomInt} from "../Util";

import "./styles/album-list.css";

interface IActionProps {
    loadAlbums: (id?: string) => void;
    viewPhoto: (albumId: string, photoId: string, index: number) => void;
}

interface IStoreProps {
    album: IData<IAlbumsRs>;
}

interface IOwnProps extends IPath {
    onClickAlbum?: (albumId: string) => void;
    onClickPhoto?: (albumId: string, photoId: string, index: number) => void;
}

interface IProps extends IOwnProps, IStoreProps, IActionProps, RouteComponentProps<IPath> {

}

export class AlbumList extends React.Component<IProps, {}> {

    componentDidMount() {
        this.props.loadAlbums(this.props.id);
    }

    componentWillReceiveProps(nextProps: IProps) {
        if (this.props.id !== nextProps.id) {
            nextProps.loadAlbums(nextProps.id);
        }
    }

    handleClickAlbum = (albumId: string) => () => {
        // this.props.loadAlbums(albumId);
        this.props.onClickAlbum && this.props.onClickAlbum(albumId);
    };

    handleClickPhoto = (albumId: string, photoId: string, index: number) => () => {
        this.props.viewPhoto(albumId, photoId, index);
        this.props.onClickPhoto && this.props.onClickPhoto(albumId, photoId, index);
    };

    getRandomBird = () => {
        return getRandomInt(1, 4);
    }

    render() {
        const {album: {status, data: {albums, photos, id}, error}} = this.props;
        let albumLength = albums && albums.length || 0;

        console.log('albums', albums);
        console.log('photos', photos);

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
                        {index % ALBUM_IN_LINE === 0 && (<div className={`clothesline clothesline__left-${this.getRandomBird()} clothesline__right-${this.getRandomBird()}`}/>)}
                        <Link to={`/portfolio/${album.id}`}>
                            <Album
                                photos={album.photos}
                                onClick={this.handleClickAlbum(album.id)}
                            />
                        </Link>
                    </React.Fragment>
                ))}
                {photos && id && photos.map((photo, index) => (
                    <React.Fragment key={photo.id}>
                        {(albumLength + index) % ALBUM_IN_LINE === 0 && (
                            <div className={`clothesline clothesline__left-${this.getRandomBird()} clothesline__right-${this.getRandomBird()}`}/>
                        )}
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

const mapStateToProps = (store: IStore, ownProps: IOwnProps): IStoreProps => {
    const currentAlbum = store.reducerGetAlbums.albums[ownProps.id];
    const album: IData<IAlbumsRs> = currentAlbum ? {...currentAlbum} : initAlbum();
    console.log('store', store)
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

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(AlbumList))