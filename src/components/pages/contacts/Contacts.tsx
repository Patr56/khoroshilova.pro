import * as React from "react";

import "./styles/contacts.css";

export class Contacts extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <div className="card">
                    <div className="contacts">
                        <div className="qr">
                            <div className="qr_image" />
                        </div>

                        <ul className="contacts_details">
                            <li className="contacts_info">Татьяна Хорошилова</li>
                            <li className="contacts_info">Москва, Железнодорожный</li>
                        </ul>
                        <ul className="contacts_details">
                            <li className="contacts_info"><a className="link" href="tel:89169915770">89169915770</a>
                            </li>
                            <li className="contacts_info"><a className="link"
                                                             href="mailto:tatyana@khoroshilova.pro">tatyana@khoroshilova.pro</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}