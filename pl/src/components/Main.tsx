import * as React from "react";
// @ts-ignore
import Lightbox from "react-images";
import {Route, Switch} from "react-router";

import Home from "./pages/home/Home";
import {Blog} from "./pages/blog/Blog";
import Portfolio from "./pages/portfolio/Portfolio";
import {Price} from "./pages/price/Price";
import {Contacts} from "./pages/contacts/Contacts";
import {NoMatch} from "./pages/NoMatch";

import "./styles/main.css";

export class Main extends React.Component<{}, {}> {
    render() {
        return (
            <main className="main">
                <Lightbox
                    images={[
                        { src: '../images/photo-1.jpg' },
                        { src: '../images/photo-2.jpg' }
                    ]}
                    isOpen={false}
                    onClickPrev={() => {}}
                    onClickNext={() => {}}
                    onClose={() => {}}
                />
                <Switch>
                    <Route path="/" component={Home} exact/>
                    <Route path="/blog" component={Blog} />
                    <Route path="/portfolio" component={Portfolio} />
                    <Route path="/price" component={Price} />
                    <Route path="/contacts" component={Contacts} />
                    <Route component={NoMatch} />
                </Switch>
            </main>
        );
    }
}