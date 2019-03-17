import * as React from "react";
import {RouteComponentProps, withRouter} from "react-router";

import {Breadcrumbs} from "../../Breadcrumbs";

import {IBreadcrumb, IPath, IStore} from "../../../Models";
import AlbumList from "../../AlbumList";
import {connect} from "react-redux";

interface IStoreProps {
    breadcrumbs: IBreadcrumb[];
}

interface IProps extends RouteComponentProps<IPath>, IStoreProps {

}

export class Photo extends React.Component<IProps, {}> {

    render() {
        const {match: {params: {id}}, breadcrumbs} = this.props;

        return (
            <div>
                <Breadcrumbs breadcrumbs={breadcrumbs}/>
                <AlbumList id={id}/>
            </div>
        );
    }
}

const PhotoWithRoute = withRouter(Photo);

const mapStateToProps = (store: IStore, ownProps: IProps): IStoreProps => {
    const album = store.reducerGetAlbums.albums[ownProps.match.params.id];

    return {
        breadcrumbs: album ? album.data.breadcrumbs : [],
    }
};

export default connect(
    mapStateToProps,
)(PhotoWithRoute)