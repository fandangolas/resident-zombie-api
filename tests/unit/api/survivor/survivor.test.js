import survivorModule from "../../../../src/api/survivor";
import locationsRepository from "../../../../src/persistence/repositories/locations";
import survivorsRepository from "../../../../src/persistence/repositories/survivors";
import survivorItemsRepository from "../../../../src/persistence/repositories/survivorItems";
import logger from "../../../../src/infrastructure/log/logger";

import SequelizeMock from "sequelize-mock";


import { expect } from "chai";
import sinon from "sinon";



describe("Survivor creation testing", async function () {
  //mock survivor module dependencies
  var dbMock = new SequelizeMock();

  const locationsRepositorySubstitute = locationsRepository({ db: dbMock });
  const survivorsRepositorySubstitute = survivorsRepository({ db: dbMock });
  const survivorItemsRepositorySubstitute = survivorItemsRepository({ db: dbMock });

  const sut = survivorModule({ 
    survivorsRepository: survivorsRepositorySubstitute,
    locationsRepository: locationsRepositorySubstitute,
    survivorItemsRepository: survivorItemsRepositorySubstitute,
    logger: logger(),
    db: dbMock
  });

  
  const testSurvivor = {
    name: "test",
    age: 20,
    gender: "male",
    lastLocation: {
      latitude: "89.548976",
      longitude: "90.123456"
    },
    items: [
      {
        "id": "37652173-72cd-494e-889a-5a0f6d8ce3bf",
        "amount": 3
      },
      {
        "id": "faf8e188-abf2-444b-bdfe-6f2baba6b481",
        "amount": 2
      }
    ]
  };
  const { lastLocation, items, ...survivor } = testSurvivor;

  afterEach(() => sinon.restore());

  it('should find or create a new location when registering a survivor on database',
    async function () {
    // Arrange
    const spy = sinon.spy(locationsRepositorySubstitute, "findOrCreate");

    // Act
    await sut.create({ body: testSurvivor });

    // Assert
    expect(spy.calledOnce).to.be.true;
    expect(spy.calledWithMatch(lastLocation, sinon.match.any)).to.be.true;
  });

  it('should create a new survivor in database', async function () {
    // Arrange
    const spy = sinon.spy(survivorsRepositorySubstitute, "create");
    sinon
      .stub(locationsRepositorySubstitute, "findOrCreate")
      .returns({
        id: "c96a0c15-6582-466f-ba2b-c324ff597adc",
        ...lastLocation
      });

    // Act
    await sut.create({ body: testSurvivor });

    // Assert
    expect(spy.calledOnce).to.be.true;
    expect(spy.calledWithMatch({
      ...survivor,
      lastLocation: "c96a0c15-6582-466f-ba2b-c324ff597adc"
    }, sinon.match.any)).to.be.true;
  });

  it(`should register survivor's items on database`, async function () {
    // Arrange
    const spy = sinon.spy(
                          survivorItemsRepositorySubstitute,
                          "createItemsForGivenSurvivor"
                        );
    sinon
      .stub(locationsRepositorySubstitute, "findOrCreate")
      .returns({
        id: "c96a0c15-6582-466f-ba2b-c324ff597adc",
        ...lastLocation
      });
    sinon
      .stub(survivorsRepositorySubstitute, "create")
      .returns({
        id: "71d60368-e961-4f91-a35f-a47a90219e20",
        ...survivor,
        lastLocation: "c96a0c15-6582-466f-ba2b-c324ff597adc"
      });

    // Act
    await sut.create({ body: testSurvivor });

    // Assert
    expect(spy.calledOnce).to.be.true;
    expect(spy.calledWith({
      survivorId: sinon.match("71d60368-e961-4f91-a35f-a47a90219e20"),
      items: [
        sinon.match({ id: "37652173-72cd-494e-889a-5a0f6d8ce3bf", amount: 3 }),
        sinon.match({ id: "faf8e188-abf2-444b-bdfe-6f2baba6b481", amount: 2 })
      ]}, sinon.match.any)).to.be.true;
  });

  it(`should correctly register a new survivor`, async function () {
    // Arrange
    sinon
      .stub(locationsRepositorySubstitute, "findOrCreate")
      .returns({
        id: "c96a0c15-6582-466f-ba2b-c324ff597adc",
        ...lastLocation
      });
    sinon
      .stub(survivorsRepositorySubstitute, "create")
      .returns({
        id: "71d60368-e961-4f91-a35f-a47a90219e20",
        ...survivor,
        lastLocation: "c96a0c15-6582-466f-ba2b-c324ff597adc"
      });

    const expected = {
      id: "71d60368-e961-4f91-a35f-a47a90219e20",
      ...survivor,
      lastLocation: "c96a0c15-6582-466f-ba2b-c324ff597adc",
      items
    };

    // Act
    const actual = await sut.create({ body: testSurvivor });

    // Assert
    expect(actual).to.be.deep.equal(expected);
  });
});