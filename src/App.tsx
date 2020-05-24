import React from "react";
import CharList from "./components/CharList/CharList";
import { Header } from "./components/Header/Header";
import SortCharacters from "./components/SortCharacters/SortCharacters";
import Filters from "./components/Filters/Filters";

export class App extends React.Component {
  public constructor(props: any) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <section className="container-fluid">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <Header />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-12 col-sm-12 col-12">
            <Filters />
          </div>
          <div className="col-lg-9 col-md-12 col-sm-12 col-12">
            <SortCharacters />
            <CharList />
          </div>
        </div>
      </section>
    );
  }
}
