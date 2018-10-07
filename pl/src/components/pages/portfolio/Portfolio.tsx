import * as React from "react";

import {Breadcrumbs} from "../../Breadcrumbs";

import "./styles/portfolio.css";
import {IAlbumsRs, IBreadcrumb, IData, IStore, IStoreAlbums} from "../../../Models";
import {AlbumList} from "../../AlbumList";
import {Dispatch} from "redux";
import {getAlbums} from "../../../Actions";
import {connect} from "react-redux";
import {EStatus} from "../../../Enums";
import {initAlbum} from "../../../reducers/ReducerGetAlbums";

const breadcrumbs: IBreadcrumb[] = [
    {
        path: "/portfolio",
        name: "Работы"
    }
];


interface IActionProps {
    loadAlbums: (id?: string) => void;
}

interface IStoreProps {
    currentAlbumId: string;
    portfolio: IData<IAlbumsRs>;
}

interface IOwnProps {

}

interface IProps extends IOwnProps, IStoreProps, IActionProps {

}

export class Portfolio extends React.Component<IProps, {}> {

    componentDidMount() {
        this.props.loadAlbums();
    }

    render() {
        const {portfolio: {data: {albums, photos}, status}, currentAlbumId} = this.props;

        return (
            <div>
                <Breadcrumbs breadcrumbs={breadcrumbs}/>
                {status === EStatus.SUCCESSES ? (
                    <AlbumList
                        albums={albums}
                        photos={photos}
                        id={currentAlbumId}
                    />
                ) : "Загрузка"}
            </div>

        );
    }
}

const mapStateToProps = (store: IStore): IStoreProps => {
    const currentAlbumId = store.reducerGetAlbums.currentAlbumId;
    const currentAlbum = store.reducerGetAlbums.albums[currentAlbumId];

    const portfolio: IData<IAlbumsRs> = currentAlbum ? {...currentAlbum} : initAlbum();

    return {
        currentAlbumId,
        portfolio
    }
};

const mapDispatchToProps = (dispatch: Dispatch): IActionProps => {
    return {
        loadAlbums: (id?: string) => {
            dispatch(getAlbums(id))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Portfolio)