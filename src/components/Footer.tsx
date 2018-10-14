import * as React from "react";

import {Navigation} from "./Navigation";
import {SOCIAL_LINK__INSTAGRAM, SOCIAL_LINK__VK} from "../Config";

import "./styles/footer.css";

export class Footer extends React.Component<{}, {}> {
    render() {
        return (
            <footer className="footer">
                <Navigation/>

                <div className="social">
                    <a className="link social_link social_link__instagram" href={SOCIAL_LINK__INSTAGRAM} title="Instagram" />
                    <a className="link social_link social_link__vk" href={SOCIAL_LINK__VK} title="VK" />
                </div>

                <p className="copyright">© 2018 <a className="link" href="https://khoroshilova.pro">khoroshilova.pro</a></p>
            </footer>
        );
    }
}