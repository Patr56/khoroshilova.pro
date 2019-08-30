import * as React from "react";
import {RouteComponentProps, withRouter} from "react-router";

import {SOCIAL_LINK__INSTAGRAM, SOCIAL_LINK__VK} from "../Config";

import "./styles/footer.css";

interface IProps extends RouteComponentProps {

}

export class Footer extends React.Component<IProps, {}> {
    render() {
        return (
            <footer className="footer">
                <div className="social">
                    <a className="link social_link social_link__instagram" href={SOCIAL_LINK__INSTAGRAM} title="Instagram" />
                    <a className="link social_link social_link__vk" href={SOCIAL_LINK__VK} title="VK" />
                </div>

                <p className="copyright">© {new Date().getFullYear()} <a className="link" href="https://khoroshilova.pro">khoroshilova.pro</a></p>
            </footer>
        );
    }
}

export default withRouter(Footer)