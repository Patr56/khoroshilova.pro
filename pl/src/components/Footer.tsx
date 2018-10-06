import * as React from "react";

import {Navigation} from "./Navigation";

import "./styles/footer.css";

export class Footer extends React.Component<{}, {}> {
    render() {
        return (
            <footer className="footer">
                <Navigation/>

                <div className="social">
                    <a className="link social_link social_link__instagram" href="#" title="Instagram" />
                    <a className="link social_link social_link__vk" href="#" title="VK" />
                </div>

                <p className="copyright">© 2018 khoroshilova.pro Copyright</p>
            </footer>
        );
    }
}