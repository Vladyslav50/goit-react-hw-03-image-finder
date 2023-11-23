import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { getImages } from './service/imagesAPI';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGallery/ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { ColorRing } from 'react-loader-spinner';
import { Modal } from './Modal/Modal';
import css from './App.module.css';

export class App extends Component {
  state = {
    keyWord: '',
    page: 1,
    images: [],
    total: 0,
    error: null,
    loader: false,
    openModal: false,
    modalImage: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { keyWord, page } = this.state;
    if (prevState.keyWord !== keyWord || prevState.page !== page) {
      this.fetchImages(keyWord, page);
    }
  }

  hendlSubmitForm = text => {
    this.setState({ keyWord: text, page: 1, images: [], total: 0 });
  };

  fetchImages = async (keyWord, page) => {
    try {
      this.setState({ loader: true });
      const { total, hits } = await getImages(keyWord, page);
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        total: total,
      }));
    } catch (error) {
      this.setState({ error: error.message });
      console.log('error: ', error);
    } finally {
      this.setState({ loader: false });
    }
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toglModal = largeImage => {
    this.setState(({ openModal }) => ({
      openModal: !openModal,
      modalImage: largeImage,
    }));
  };

  render() {
    return (
      <>
        <div className={css.App}>
          <Searchbar onSubmit={this.hendlSubmitForm} />
          <ImageGallery>
            {this.state.images.map(
              ({ id, webformatURL, largeImageURL, tags }) => {
                return (
                  <ImageGalleryItem
                    key={id}
                    preview={webformatURL}
                    largeImage={largeImageURL}
                    tag={tags}
                    tgModal={this.toglModal}
                  />
                );
              }
            )}
            {this.state.loader && (
              <ColorRing
                wrapper
                ClassName={css.Loader}
                visible={true}
                height="300"
                width="300"
                ariaLabel="blocks-loading"
                wrapperClass="blocks-wrapper"
                colors={['#b8c480', '#B2A3B5', '#F4442E', '#51E5FF', '#429EA6']}
              />
            )}
          </ImageGallery>
          {this.state.images.length < this.state.total && (
            <Button addPhotos={this.onLoadMore} />
          )}
        </div>
        {this.state.openModal && (
          <Modal
            modalImage={this.state.modalImage}
            closeModal={this.toglModal}
          />
        )}
      </>
    );
  }
}
