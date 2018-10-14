import * as React from "react";
import {RouteComponentProps, withRouter} from "react-router";

interface IProps extends RouteComponentProps {

}

/**
 * Прокручивает страницу к началу браузера, при переходе между страницами.
 *
 * https://reacttraining.com/react-router/web/guides/scroll-restoration/scroll-to-top
 */
class ScrollToTop extends React.Component<IProps, {}> {
    componentDidUpdate(prevProps: IProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0)
        }
    }

    render() {
        return this.props.children
    }
}

export default withRouter(ScrollToTop)