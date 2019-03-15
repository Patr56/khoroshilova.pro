import * as React from "react";
import * as ReactMarkdown from "react-markdown";
import * as moment from 'moment';
import 'moment/locale/ru';
// @ts-ignore
import * as shortcodes from "remark-shortcodes";

import {IArticle, IPath} from "../Models";
import AlbumList, {IProps as IPropsAlbumList} from "./AlbumList";

const ShortcodeRenderer = (props: IPropsShortcode<IPropsAlbumList>) => {
    return <AlbumList id={props.attributes.id} showName={props.attributes.showName}/>
}

interface IProps {
    showHeader?: boolean;
    showFooter?: boolean;
    article: IArticle;
}

interface IPropsShortcode<T> {
    attributes: T,
    identifier: string
}

export class Article extends React.Component<IProps, {}> {

    renderers: ReactMarkdown.Renderers = {
        shortcode: ShortcodeRenderer,
    };

    render() {
        const {article: {title, text, datetime}, showHeader = true, showFooter = true} = this.props;

        const previewDatetime = moment(datetime).format("DD MMMM YYYY, HH:mm");

        return (
            <article>
                {showHeader && (
                    <header>
                        <a className="link" href="#">
                            <h1>{title}</h1>
                        </a>
                        <time dateTime={previewDatetime}>{previewDatetime}</time>
                    </header>
                )}

                <ReactMarkdown 
                    source={text}
                    renderers={this.renderers}
                    plugins={[shortcodes]}
                />

                {showFooter && (
                    <footer>
                        <a className="link" href="#">Читать далее</a>
                    </footer>
                )}
            </article>
        );
    }
}