import * as React from "react";

import {Breadcrumbs} from "../../Breadcrumbs";

import "./styles/portfolio.css";
import {IAlbum, IBreadcrumb, IData, IStore} from "../../../Models";
import {AlbumList} from "../../AlbumList";
import {Dispatch} from "redux";
import {getAlbums} from "../../../Actions";
import {connect} from "react-redux";
import {EStatus} from "../../../Enums";

const breadcrumbs: IBreadcrumb[] = [
    {
        path: "/portfolio",
        name: "Работы"
    }
];


interface IActionProps {
    loadAlbums: (id: string) => void;
}

interface IStoreProps {
    albums: IData<IAlbum[]>;
}

interface IOwnProps {

}

interface IProps extends IOwnProps, IStoreProps, IActionProps {

}

export class Portfolio extends React.Component<IProps, {}> {

    componentDidMount() {
        this.props.loadAlbums("1");
    }

    render() {
        const {albums: {data, status}} = this.props;

        return (
            <div>
                <Breadcrumbs breadcrumbs={breadcrumbs}/>
                {status === EStatus.SUCCESSES ? <AlbumList albums={data}/> : "Загрузка"}
            </div>

        );
    }
}

const mapStateToProps = (store: IStore): IStoreProps => {
    return {
        albums: store.reducerGetAlbums.albums,
    }
};

const mapDispatchToProps = (dispatch: Dispatch): IActionProps => {
    return {
        loadAlbums: (id: string) => {
            dispatch(getAlbums(id))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Portfolio)