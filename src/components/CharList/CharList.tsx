import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { fetchCharList, hideAlert } from "../../actions/char-list.actions";
import { ICharacters } from "../../states/char-list.state";
import { IFilterState } from "../../states/filter.state";
import { CardDesign } from "../CardDesign/CardDesign";
import { Loader } from "../Loader/Loader";
import { AlertMessage } from "../AlertMessage/AlertMessage";

interface ICharListProps {
  filters: IFilterState;
  characters: ICharacters;
  hideAlertMessage: () => void;
  fetchCharList: (filters: IFilterState) => void;
}

class CharList extends React.Component<ICharListProps> {
  private lastScrollTop: number = 0;
  public constructor(props: ICharListProps) {
    super(props);
    this.fetchCharacterListOnScroll = this.fetchCharacterListOnScroll.bind(
      this
    );
    this.hideAlert = this.hideAlert.bind(this);
  }

  public componentDidMount(): void {
    this.props.fetchCharList({ ...this.props.filters });
    this.fetchCharacterListOnScroll();
  }

  public fetchCharacterListOnScroll(): void {
    window.onscroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      const currentPage = this.props.filters.currentPageNo;
      const totalPages = this.props.characters.totalPages;
      let condition = currentPage < totalPages;
      let nextPageNo = this.props.filters.currentPageNo + 1;
      if (
        st > this.lastScrollTop &&
        condition &&
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        !this.props.characters.loading
      ) {
        this.props.fetchCharList({
          ...this.props.filters,
          currentPageNo: nextPageNo,
        });
      }
      this.lastScrollTop = st <= 0 ? 0 : st;
    };
  }

  public hideAlert() {
    this.props.hideAlertMessage();
  }

  public render(): JSX.Element {
    return (
      <>
        {this.props.characters.error ? (
          <AlertMessage
            error={this.props.characters.error}
            hideAlert={this.hideAlert}
          />
        ) : (
          <></>
        )}
        <CardDesign
          characters={this.props.characters}
          sortBy={this.props.filters.order}
        />
        {this.props.characters.loading ? <Loader /> : <></>}
      </>
    );
  }
}

const mapStateToProps = (state: any, props: any) => {
  return {
    ...props,
    characters: state.characters,
    filters: state.filters,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    fetchCharList: (filters: IFilterState) => dispatch(fetchCharList(filters)),
    hideAlertMessage: () => dispatch(hideAlert()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CharList);
