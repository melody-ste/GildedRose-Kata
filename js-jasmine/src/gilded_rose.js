class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  
  updateQuality() {
  //   for (var i = 0; i < this.items.length; i++) {
  //     if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
  //       if (this.items[i].quality > 0) {
  //         if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
  //           this.items[i].quality = this.items[i].quality - 1;
  //         }
  //       }
  //     } else {
  //       if (this.items[i].quality < 50) {
  //         this.items[i].quality = this.items[i].quality + 1;
  //         if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
  //           if (this.items[i].sellIn < 11) {
  //             if (this.items[i].quality < 50) {
  //               this.items[i].quality = this.items[i].quality + 1;
  //             }
  //           }
  //           if (this.items[i].sellIn < 6) {
  //             if (this.items[i].quality < 50) {
  //               this.items[i].quality = this.items[i].quality + 1;
  //             }
  //           }
  //         }
  //       }
  //     }
  //     if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
  //       this.items[i].sellIn = this.items[i].sellIn - 1;
  //     }
  //     if (this.items[i].sellIn < 0) {
  //       if (this.items[i].name != 'Aged Brie') {
  //         if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
  //           if (this.items[i].quality > 0) {
  //             if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
  //               this.items[i].quality = this.items[i].quality - 1;
  //             }
  //           }
  //         } else {
  //           this.items[i].quality = this.items[i].quality - this.items[i].quality;
  //         }
  //       } else {
  //         if (this.items[i].quality < 50) {
  //           this.items[i].quality = this.items[i].quality + 1;
  //         }
  //       }
  //     }
  //   }

  //   return this.items;

    const MAX_QUALITY = 50;
    const MIN_QUALITY = 0;

    const isConjured = item => item.name.startsWith("Conjured");
    const isAgedBrie = item => item.name === "Aged Brie";
    const isSulfuras = item => item.name === "Sulfuras, Hand of Ragnaros";
    const isBackstage = item => item.name === "Backstage passes to a TAFKAL80ETC concert";

    const increaseQuality = (item, amount = 1) => {
      item.quality = Math.min(MAX_QUALITY, item.quality + amount);
    };

    const decreaseQuality = (item, amount = 1) => {
      item.quality = Math.max(MIN_QUALITY, item.quality - amount);
    };
    for (const item of this.items) {
      // Sulfuras ne change jamais (ni quality ni sellIn)
      if (isSulfuras(item)) continue;

      // 1) changement de quality selon le type, AVANT decrement du sellIn
      if (isAgedBrie(item)) {
        increaseQuality(item, 1);
      } else if (isBackstage(item)) {
        if (item.sellIn > 10) {
          increaseQuality(item, 1);
        } else if (item.sellIn > 5) {
          increaseQuality(item, 2);
        } else if (item.sellIn > 0) {
          increaseQuality(item, 3);
        } else {
          item.quality = 0;
        }
      } else {

        const baseDegrade = isConjured(item) ? 2 : 1;
        decreaseQuality(item, baseDegrade);
      }

      item.sellIn -= 1;

      if (item.sellIn < 0) {
        if (isAgedBrie(item)) {

          increaseQuality(item, 1);
        } else if (isBackstage(item)) {

          item.quality = 0;
        } else {

          const baseDegrade = isConjured(item) ? 2 : 1;
          decreaseQuality(item, baseDegrade);
        }
      }
    }

    return this.items;
    

  }
}
module.exports = {
  Item,
  Shop
}
