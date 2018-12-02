import * as React from "react";

import {Breadcrumbs} from "../../Breadcrumbs";
import {IBreadcrumb} from "../../../Models";
import AlbumList from "../../AlbumList";

const breadcrumbs: IBreadcrumb[] = [
    {
        id: "/",
        name: "Новые работы"
    }
];

export class Home extends React.Component<{}, {}> {

    render() {
        return (
            <div>
                <Breadcrumbs breadcrumbs={breadcrumbs}/>
                <AlbumList id="last"/>
            </div>
        );
    }
}