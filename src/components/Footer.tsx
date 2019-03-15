import * as React from "react";
import {RouteComponentProps, withRouter} from "react-router";

import {Navigation} from "./Navigation";
import {SOCIAL_LINK__INSTAGRAM, SOCIAL_LINK__VK} from "../Config";

import "./styles/footer.css";

interface IProps extends RouteComponentProps {

}

export class Footer extends React.Component<IProps, {}> {
    render() {
        const showNavigation = this.props.location.pathname !== "/";

        return (
            <footer className="footer">
                <Navigation show={showNavigation}/>

                <div className="social">
                    <a className="link social_link social_link__instagram" href={SOCIAL_LINK__INSTAGRAM} title="Instagram" />
                    <a className="link social_link social_link__vk" href={SOCIAL_LINK__VK} title="VK" />
                </div>

                <p className="copyright">© 2018 <a className="link" href="https://khoroshilova.pro">khoroshilova.pro</a></p>
            </footer>
        );
    }
}

export default withRouter(Footer)