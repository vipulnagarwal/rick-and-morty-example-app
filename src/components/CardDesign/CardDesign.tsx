import React from "react";
import "./CardDesign.scss";
import { ICharacters, ICharInfo } from "../../states/char-list.state";
import { SORTING_ORDER } from "../../common/common.constants";

interface ICardDesignProps {
  sortBy: string;
  characters: ICharacters;
}
export class CardDesign extends React.PureComponent<ICardDesignProps> {
  constructor(props: any) {
    super(props);
    this.cardBox = this.cardBox.bind(this);
  }

  public cardBox(charInfo: ICharInfo) {
    return (
      <div
        className="col-lg-3 col-md-3 col-sm-3 col-6 cartDesignGrid"
        key={`${charInfo.id}-${charInfo.name}`}
      >
        <article className="cartDesign">
          <div className={"charName p-2"}>
            <div className="name">{charInfo.name}</div>
            <strong>
              <span className="charId">
                <i className="fa fa-fw fa-star" />
                ID: #{charInfo.id}
              </span>
              <br />
              <span className="status">
                Status:
                <i
                  className={`fa fa-circle ${charInfo.status.toLowerCase()} `}
                  aria-hidden="true"
                />
                {charInfo.status}
              </span>
            </strong>
          </div>
          <div className="imgContainer">
            <img
              className="img-responsive"
              alt={"character name"}
              src={charInfo.image}
            />
          </div>
          <div className="description p-2">
            <p>
              <i className="fa fa-users" /> Species: {charInfo.species}
            </p>
            <p>
              <i className="fa fa-venus-mars" aria-hidden="true" /> Gender:
              {charInfo.gender}
            </p>
            <p>
              <i className="fa fa-globe" /> Origin: {charInfo.origin.name}
            </p>
            <p>
              <i className="fa fa-map-marker" /> Location:
              {charInfo.location.name}
            </p>
          </div>
        </article>
      </div>
    );
  }

  public render() {
    let charList;
    if (this.props.sortBy === SORTING_ORDER.DESC) {
      charList = [...this.props.characters.charList].sort(
        (char1: any, char2: any) => char2.id - char1.id
      );
    } else {
      charList = [...this.props.characters.charList].sort(
        (char1: any, char2: any) => char1.id - char2.id
      );
    }
    return (
      <div className="row active-with-click">
        {charList.map((charInfo: ICharInfo) => {
          return this.cardBox(charInfo);
        })}
      </div>
    );
  }
}
