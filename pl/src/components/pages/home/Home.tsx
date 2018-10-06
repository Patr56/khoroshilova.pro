import * as React from "react";
import {connect} from 'react-redux'
import {Dispatch} from 'redux'

import {Breadcrumbs} from "../../Breadcrumbs";
import {IAlbum, IBreadcrumb, IData, IStore} from "../../../Models";
import {AlbumList} from "../../AlbumList";

import {getLastAlbums} from "../../../Actions";
import {EStatus} from "../../../Enums";

const breadcrumbs: IBreadcrumb[] = [
    {
        path: "/",
        name: "Новые работы"
    }
];

interface IActionProps {
    loadLastAlbums: () => void;
}

interface IStoreProps {
    lastAlbums: IData<IAlbum[]>;
}

interface IOwnProps {

}

interface IProps extends IOwnProps, IStoreProps, IActionProps {
    
}

export class Home extends React.Component<IProps, {}> {

    componentDidMount() {
        this.props.loadLastAlbums();
    }

    render() {
        const {lastAlbums: {data, status}} = this.props;

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
        lastAlbums: store.reducerLastAlbums.lastAlbums,
    }
};

const mapDispatchToProps = (dispatch: Dispatch): IActionProps => {
    return {
        loadLastAlbums: () => {
            dispatch(getLastAlbums())
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)