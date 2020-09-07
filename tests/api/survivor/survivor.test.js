import survivorModule from "../../../src/api/survivor";
import locationsRepository from "../../../src/persistence/repositories/locations";
import survivorsRepository from "../../../src/persistence/repositories/survivors";
import survivorItemsRepository from "../../../src/persistence/repositories/survivorItems";
import logger from "../../../src/infrastructure/log/logger";

import SequelizeMock from "sequelize-mock";


import { expect } from "chai";
import sinon from "sinon";



describe("Survivor module testing", async function () {
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

  it('should find or create a new location when creating a survivor', async function () {
    // Arrange
    const spy = sinon.spy(locationsRepositorySubstitute, "findOrCreate");

    // Act
    await sut.create({ body: testSurvivor });

    // Assert
    expect(spy.calledOnce).to.be.true;
    expect(spy.calledWithMatch(lastLocation, sinon.match.any)).to.be.true;
  });
});