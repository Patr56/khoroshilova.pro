import * as React from "react";

import {Breadcrumbs} from "../../Breadcrumbs";

import "./styles/portfolio.css";
import {IBreadcrumb} from "../../../Models";
import AlbumList from "../../AlbumList";

const breadcrumbs: IBreadcrumb[] = [
    {
        path: "/portfolio",
        name: "Работы"
    }
];


interface IProps {

}

export class Portfolio extends React.Component<IProps, {}> {

    render() {

        return (
            <div>
                <Breadcrumbs breadcrumbs={breadcrumbs}/>
                <AlbumList/>
            </div>

        );
    }
}