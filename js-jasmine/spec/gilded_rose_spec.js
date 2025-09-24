const {Shop, Item} = require('../src/gilded_rose.js');

describe("Gilded Rose", function() {

  it("full test", () => {
    const items = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Aged Brie", 2, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 39),

      new Item("Conjured Mana Cake", 3, 6),
    ];

    const shop = new Shop(items);
    shop.updateQuality();

    expect(items[0].quality).toBe(19);
    expect(items[1].quality).toBe(1);
    expect(items[2].quality).toBe(6);
    expect(items[3].quality).toBe(80);
    expect(items[4].quality).toBe(80);
    expect(items[5].quality).toBe(21);
    expect(items[6].quality).toBe(50);
    expect(items[7].quality).toBe(42);
    expect(items[8].quality).toBe(4); 
  });

});