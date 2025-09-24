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

  it("1. Sulfuras ne change jamais", () => {
    const items = [new Item("Sulfuras, Hand of Ragnaros", 0, 80)];
    const shop = new Shop(items);
    shop.updateQuality();
    expect(items[0].quality).toBe(80);
    expect(items[0].sellIn).toBe(0);
  });

  it("2. Backstage augmente de +3 si 5 jours ou moins", () => {
    const items = [new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20)];
    const shop = new Shop(items);
    shop.updateQuality();
    expect(items[0].quality).toBe(23);
  });

  it("3. Un item normal perd 1 de qualité par jour", () => {
    const items = [new Item("Elixir of the Mongoose", 5, 7)];
    const shop = new Shop(items);
    shop.updateQuality();
    expect(items[0].quality).toBe(6);
  });

  it("4. Un item normal perd 2 de qualité après la date de vente", () => {
    const items = [new Item("Elixir of the Mongoose", 0, 7)];
    const shop = new Shop(items);
    shop.updateQuality();
    expect(items[0].quality).toBe(5);
  });

  it("5. La qualité ne devient jamais négative", () => {
    const items = [new Item("Elixir of the Mongoose", 0, 0)];
    const shop = new Shop(items);
    shop.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it("6. Aged Brie augmente en qualité avec le temps", () => {
    const items = [new Item("Aged Brie", 2, 0)];
    const shop = new Shop(items);
    shop.updateQuality();
    expect(items[0].quality).toBe(1);
  });

  it("7. La qualité n'excède jamais 50", () => {
    const items = [new Item("Aged Brie", 2, 50)];
    const shop = new Shop(items);
    shop.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  it("8. Backstage augmente de +2 si 10 à 6 jours", () => {
    const items = [new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20)];
    const shop = new Shop(items);
    shop.updateQuality();
    expect(items[0].quality).toBe(22);
  });

  it("9. Backstage tombe à 0 après la date du concert", () => {
    const items = [new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20)];
    const shop = new Shop(items);
    shop.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it("10. Conjured perd 2 de qualité par jour", () => {
    const items = [new Item("Conjured Mana Cake", 3, 6)];
    const shop = new Shop(items);
    shop.updateQuality();
    expect(items[0].quality).toBe(4);
  });

});