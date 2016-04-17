var storagekey = "favourites";

var KanjiFavourite = class KanjiFavourite {
  constructor(kanji) {
    this.kanji = kanji;
    this.loadFavourites();
  }

  loadFavourites() {
    this.favourites = JSON.parse(
      localStorage.getItem(storagekey)
    );
    if (this.favourites === null) {
      this.favourites = [];
    }
    return this.favourites;
  }

  add() {
    this.loadFavourites();
    if(!this.isFavourite()) {
      this.favourites.push( this.kanji.getLiteral() );
      this.save();
      return this.loadFavourites();
    } else {
      return false;
    }
  }

  remove() {
    this.loadFavourites();
    if (this.isFavourite()) {
      var i = this.favourites.indexOf(this.kanji.getLiteral());
      this.favourites.splice(i, 1);
      this.save();
      return this.loadFavourites();
    } else {
      return false;
    }
  }

  isFavourite() {
    return (this.favourites.indexOf(this.kanji.getLiteral()) >= 0);
  }

  toggle() {
    if ( !this.isFavourite() ) {
      this.add();
    } else {
      this.remove();
    }

  }

  save() {
    var data = JSON.stringify(this.favourites);
    localStorage.setItem(storagekey, data);
  }

};

module.exports = KanjiFavourite;
