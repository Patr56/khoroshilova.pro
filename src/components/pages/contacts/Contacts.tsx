import * as React from "react";
import * as QRCode from "qrcode.react";

import "./styles/contacts.css";

const PHONE_NUMBER = '8 (916) 827 28 13';
const EMAIL = 'tatyana@khoroshilova.pro';

function getCleanPhoneNumber(phone: string) {
    return phone.replace("(", "").replace(")", "").split(" ").join("")
}

const VCARD = `BEGIN:VCARD
VERSION:3.0
N:Хорошилова;Татьяна
FN:Татьяна Хорошилова
ORG:Фотограф
URL:https://www.khoroshilova.pro
EMAIL;TYPE=INTERNET:${EMAIL}
TEL;TYPE=voice,work,pref:${getCleanPhoneNumber(PHONE_NUMBER)}
END:VCARD
`

export class Contacts extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <div className="card">
                    <div className="contacts">
                        <div className="qr">
                            <div className="qr_images">
                                <QRCode
                                    size={250}
                                    level="L"
                                    value={VCARD}
                                />
                            </div>
                        </div>

                        <ul className="contacts_details">
                            <li className="contacts_info">Татьяна Хорошилова</li>
                            <li className="contacts_info">Москва, Железнодорожный</li>
                        </ul>
                        <ul className="contacts_details">
                            <li className="contacts_info"><a className="link" href={`tel:${getCleanPhoneNumber(PHONE_NUMBER)}`}>{PHONE_NUMBER}</a>
                            </li>
                            <li className="contacts_info"><a className="link"
                                                             href={`mailto:${EMAIL}`}>{EMAIL}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}