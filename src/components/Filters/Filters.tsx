import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import scss from "./Filters.module.scss";
import { FILTERS } from "../../common/common.constants";
import { IFilterState } from "../../states/filter.state";
import { ICharacters } from "../../states/char-list.state";
import { applySorting } from "../../actions/filter.actions";

interface IFiltersProps {
  filters: IFilterState;
  characters: ICharacters;
  applySorting: (filters: IFilterState) => void;
}

class Filters extends React.PureComponent<IFiltersProps> {
  public constructor(props: IFiltersProps) {
    super(props);
    this.applyFilter = this.applyFilter.bind(this);
  }

  public applyFilter(event: React.FormEvent<HTMLInputElement>) {
    const newFilter = event.currentTarget.value.toLowerCase();
    let newFilterParams = {};
    const { gender, status, species } = this.props.filters.filters;
    if (FILTERS.genders.indexOf(newFilter) >= 0) {
      newFilterParams = { gender: gender !== newFilter ? newFilter : "" };
    } else if (FILTERS.species.indexOf(newFilter) >= 0) {
      newFilterParams = { species: species !== newFilter ? newFilter : "" };
    } else if (FILTERS.status.indexOf(newFilter) >= 0) {
      newFilterParams = { status: status !== newFilter ? newFilter : "" };
    }

    // When the ascending sorting is already applied that time we need to set the currentPageNo after getting the response of filter
    // Results
    // const currentPageNo = this.props.filters.order === SORTING_ORDER.DESC ? 0 : 1;
    const currentPageNo = 1;
    this.props.applySorting({
      ...this.props.filters,
      currentPageNo,
      filters: {
        ...this.props.filters.filters,
        ...newFilterParams,
      },
    });
  }

  public renderGenderFilters(): JSX.Element {
    return (
      <div>
        <h6>Genders: </h6>
        {FILTERS.genders.map((gender) => {
          return (
            <label key={gender} className={scss.container}>
              {`${gender}`}
              <input
                type="checkbox"
                value={gender}
                onChange={this.applyFilter}
                checked={this.props.filters.filters.gender === gender}
              />
              <span className={scss.checkmark} />
            </label>
          );
        })}
      </div>
    );
  }

  public renderSpecies(): JSX.Element {
    return (
      <div>
        <h6>Species: </h6>
        {FILTERS.species.map((spe) => {
          return (
            <label key={spe} className={scss.container}>
              {`${spe}`}
              <input
                type="checkbox"
                value={spe}
                onChange={this.applyFilter}
                checked={this.props.filters.filters.species === spe}
              />
              <span className={scss.checkmark} />
            </label>
          );
        })}
      </div>
    );
  }

  public renderStatus() {
    return (
      <div>
        <h6>Status: </h6>
        {FILTERS.status.map((sts) => {
          return (
            <label key={sts} className={scss.container}>
              {`${sts}`}
              <input
                type="checkbox"
                value={sts}
                onChange={this.applyFilter}
                checked={this.props.filters.filters.status === sts}
              />
              <span className={scss.checkmark} />
            </label>
          );
        })}
      </div>
    );
  }

  public render(): JSX.Element {
    return (
      <div className={scss.filters}>
        <h4>Filter By: </h4>
        <p>(Uncheck the checkbox to remove applied filters)</p>
        {this.renderGenderFilters()}
        <br />
        {this.renderSpecies()}
        <br />
        {this.renderStatus()}
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
