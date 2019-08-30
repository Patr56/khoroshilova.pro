import * as React from "react";
// @ts-ignore
import Carousel, { Modal, ModalGateway }  from "react-images";
import {Route, Switch, withRouter, Redirect, RouteComponentProps} from "react-router";

import {Blog} from "./pages/blog/Blog";
import Portfolio from "./pages/portfolio/Portfolio";
import Photo from "./pages/photo/Photo";
import {Price} from "./pages/price/Price";
import {Contacts} from "./pages/contacts/Contacts";
import {NoMatch} from "./pages/404/NoMatch";

import "./styles/main.css";
import {IPhoto, IStore, IViewPhoto} from "../Models";
import {Dispatch} from "redux";
import {closeGallery as actionCloseGallery, viewPhoto as actionViewPhoto, galleryNextPhoto, galleryPrevPhoto} from "../Actions";
import {connect} from "react-redux";

interface IStoreProps {
    isOpen: boolean;
    viewPhoto: IViewPhoto;
    photos: IPhoto[];
}

interface IActionProps {
    lookAtPhoto: (albumId: string, photoId: string, index: number) => void;
    closeGallery: () => void;
    galleryNext: () => void;
    galleryPrev: () => void;
}

interface IOwnProps {

}

interface IProps extends IOwnProps, IStoreProps, IActionProps, RouteComponentProps {

}

export class Main extends React.Component<IProps, {}> {

    handleClose = () => {
        this.props.closeGallery()
    };

    handleNext = () => {
        this.props.galleryNext();
    };

    handlePrev = () => {
        this.props.galleryPrev();
    };

    handleClickThumbnail = (index: number) => {
        const {albumId, photoId} = this.props.viewPhoto;
        this.props.lookAtPhoto(albumId, photoId, index);
    };

    formatters = {
        getAltText: () => "{caption} | Номер {currentIndex}",
        getNextLabel: () => "Показать {nextIndex} из {totalCount}",
        getPrevLabel: () => "Показать {prevIndex} из {totalCount}",
        getNextTitle: () => "Туда",
        getPrevTitle: () => "Сюда",
        getCloseLabel: () => "Закрыть (esc)",
        getFullscreenLabel: () => "[Enter | Exit] полный экран (f)"
    }

    components = {
        FooterCount: (props: any) => {
            const { currentIndex, views } = props;
            const activeView = currentIndex + 1;
            const totalViews = views.length;
          
            if (!activeView || !totalViews) return null;
          
            return (
              <span>
                {activeView} из {totalViews}
              </span>
            )
          }
    }

    render() {
        const {isOpen, photos} = this.props;

        const imagesForGallery = photos.map(photo => ({
            src: photo.url.original,
            thumbnail: photo.url.preview.replace(/\\/g, '/'),
        }));

        return (
            <main className="main">
                <ModalGateway>
                    {isOpen ? (
                        <Modal onClose={this.handleClose}>
                            <Carousel
                                components={this.components}
                                views={imagesForGallery}
                                trackProps={{swipe: true}}
                                formatters={this.formatters}
                            />
                        </Modal>
                    ) : null}
                </ModalGateway>
            
                <Switch>
                    <Redirect from="/" exact to="/portfolio/portfolio" />

                    <Route path="/blog" component={Blog} />
                    <Route path="/photo/:id" component={Photo} />
                    <Route path="/portfolio/:id" component={Portfolio}/>
                    <Route path="/price" component={Price} />
                    <Route path="/contacts" component={Contacts} />
                    <Route component={NoMatch} />
                </Switch>
            </main>
        );
    }
}

const mapStateToProps = (store: IStore): IStoreProps => {
    const {isOpen, viewPhoto} = store.reducerGallery;

    const photos: IPhoto[] = isOpen ? store.reducerGetAlbums.albums[viewPhoto.albumId].data.photos : [];

    return {
        isOpen,
        viewPhoto,
        photos,
    }
};

const mapDispatchToProps = (dispatch: Dispatch): IActionProps => {
    return {
        lookAtPhoto: (albumId: string, photoId: string, index: number) => {
            dispatch(actionViewPhoto(albumId, photoId, index))
        },
        closeGallery: () => {
            dispatch(actionCloseGallery())
        },
        galleryNext: () => {
            dispatch(galleryNextPhoto())
        },
        galleryPrev: () => {
            dispatch(galleryPrevPhoto())
        }
    }
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Main))