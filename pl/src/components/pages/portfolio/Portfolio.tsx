import * as React from "react";

import {Breadcrumbs} from "../../Breadcrumbs";

import "./styles/portfolio.css";
import {IBreadcrumb, IStore, IStoreAlbums} from "../../../Models";
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

interface IStoreProps extends IStoreAlbums {

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
        const {data: {albums, photos}, status} = this.props;

        return (
            <div>
                <Breadcrumbs breadcrumbs={breadcrumbs}/>
                {status === EStatus.SUCCESSES ? <AlbumList albums={albums} photos={photos}/> : "Загрузка"}
            </div>

        );
    }
}

const mapStateToProps = (store: IStore): IStoreProps => {
    return {
        ...store.reducerGetAlbums
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