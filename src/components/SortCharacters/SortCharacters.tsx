import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import "./SortCharacters.scss";
import { IFilterState } from "../../states/filter.state";
import { ICharacters } from "../../states/char-list.state";
import { applySorting } from "../../actions/filter.actions";

interface ISortCharactersProps {
  filters: IFilterState;
  characters: ICharacters;
  applySorting: (filters: IFilterState) => void;
}

class SortCharacters extends React.PureComponent<ISortCharactersProps> {
  public constructor(props: any) {
    super(props);
    this.changeSorting = this.changeSorting.bind(this);
  }

  public changeSorting(event: any) {
    // fetch Last Page
    this.props.applySorting({
      ...this.props.filters,
      currentPageNo: 1,
      order: event.target.value,
    });
  }

  public render(): JSX.Element {
    return (
      <fieldset>
        <p>
          <label>Sort by ID: </label>
          <select
            id="order-by"
            onChange={this.changeSorting}
            defaultValue={"asc"}
          >
            <option value="asc"> Ascending </option>
            <option value="desc"> Descending </option>
          </select>
        </p>
      </fieldset>
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
    applySorting: (filters: IFilterState) => dispatch(applySorting(filters)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SortCharacters);
