//https://stackoverflow.com/questions/58384179/syntaxerror-cannot-use-import-statement-outside-a-module
//import conn from './src/lib/db'

const { Pool } = require('pg')
const { bikes, models } = require('./fake/initBikes')

//console.log(bikes[1])
const pool = new Pool({
   /*
      user: process.env.PGSQL_USER,
      password: process.env.PGSQL_PASSWORD,
      host: process.env.PGSQL_HOST,
      port: process.env.PGSQL_PORT,
      database: process.env.PGSQL_DATABASE,
*/
   host: '34.170.15.84',
   port: '5432',
   user: 'postgres',
   database: 'postgres',
   password: 'laki99',
})

const insertModelText = () => {
   let texto = ''

   models.forEach((model, index) => {
      texto =
         texto +
         `
         ('${model.model}','${model.type}','${model.range}','${model.brand}','${
            model.description
         }','${model.image}' )${index + 1 !== models.length ? ',' : ''}`
   })
   let all = `
   INSERT INTO
     BikeModel (bikeModelName, bikeModelType, bikeModelRange, bikeModelBrand, bikeModelDescription, bikeModelImages)
   VALUES  ${texto};  
   `
   // console.log(all)
   return all

   //console.log(all)
}

const insertBikeText = () => {
   let texto = ''
   bikes.forEach((bike, index) => {
      texto =
         texto +
         `
         ('${index + 1000}','${bike.model}','${bike.size}','avaiable' )${
            index + 1 !== bikes.length ? ',' : ''
         }`
   })
   let all = `
   INSERT INTO
     Bike (bikeSn, bikeModelName, bikeSize,bikeState)
   VALUES  ${texto};  
   `
   return all
}
const execute = async (query) => {
   console.log('VEEE', process.env.PGSQL_HOST)
   try {
      await pool.connect() // gets connection
      await pool.query(query) // sends queries

      await pool.query(insertModelText())
      await pool.query(insertBikeText())
      return true
   } catch (error) {
      console.error('ERROR------ ', error.stack)
      return false
   } finally {
      await pool.end() // closes connection
   }
}
const text = `
DROP TABLE IF EXISTS bikeModelRange, bikeModelType, Segment, PedalModel, CompatiblePedal, BikeSize, BikeModel, Bike, Customer, Booking, BookingOrder;

DROP TYPE IF EXISTS bikeSizeType, modelType, modelRange, bikeState, bookingState;

CREATE TYPE bikeSizeType AS ENUM (
  's',
  'm',
  'l',
  'xl',
  'xxl'
);

CREATE TYPE modelType AS ENUM (
  'mountain',
  'city',
  'electric',
  'road'
);

CREATE TYPE modelRange AS ENUM (
  'ride-trekking',
  'midRange',
  'highEnd',
  'premium'
);

CREATE TYPE bikeState AS ENUM (
  's1',
  's2',
  's3'
);

CREATE TYPE bookingState AS ENUM (
  'pending',
  'active',
  'finished',
  'cancelled'
);

CREATE TABLE BikeModelType (
  bikeModelType modelType NOT NULL,
  PRIMARY KEY (bikeModelType)
);

INSERT INTO BikeModelType
  VALUES ('mountain'), ('city'), ('electric'), ('road');

CREATE TABLE BikeModelRange (
  bikeModelRange modelRange NOT NULL,
  PRIMARY KEY (bikeModelRange)
);

INSERT INTO BikeModelRange
  VALUES ('premium'), ('highEnd'), ('midRange'), ('ride-trekking');

CREATE TABLE Segment (
  bikeModelType modelType NOT NULL,
  bikeModelRange modelRange NOT NULL,
  segmentPrice smallint NOT NULL CHECK (segmentPrice > 0),
  FOREIGN KEY (bikeModelType) REFERENCES BikeModelType,
  FOREIGN KEY (bikeModelRange) REFERENCES BikeModelRange,
  PRIMARY KEY (bikeModelType, bikeModelRange)
);

INSERT INTO Segment
  VALUES ('city', 'midRange', 12), ('city', 'highEnd', 15), ('mountain', 'midRange', 12), ('mountain', 'highEnd', 15), ('mountain', 'premium', 25), ('road', 'midRange', 15), ('road', 'highEnd', 18), ('road', 'premium', 25), ('electric', 'ride-trekking', 25);

CREATE TABLE PedalModel (
  pedalModelName text NOT NULL,
  pedalModelType text NOT NULL,
  pedalModelPrice smallint NOT NULL CHECK (pedalModelPrice >= 0),
  quantity smallint NOT NULL CHECK (quantity >= 0),
  PRIMARY KEY (pedalModelName)
);

INSERT INTO PedalModel
  VALUES ('pedalModel-A', 'pedalType-1', 0, 10), ('pedalModel-B', 'pedalType-1', 0, 8), ('pedalModel-C', 'pedalType-1', 0, 12), ('pedalModel-D', 'pedalType-1', 0, 12), ('pedalModel-E', 'pedalType-2', 0, 12), ('pedalModel-F', 'pedalType-2', 0, 12);

CREATE TABLE CompatiblePedal (
  bikeModelType modelType NOT NULL,
  bikeModelRange modelRange NOT NULL,
  pedalModelName text NOT NULL,
  FOREIGN KEY (bikeModelType, bikeModelRange) REFERENCES Segment (bikeModelType, bikeModelRange),
  FOREIGN KEY (pedalModelName) REFERENCES PedalModel,
  PRIMARY KEY (bikeModelType, bikeModelRange, pedalModelName)
);

INSERT INTO CompatiblePedal
  VALUES ('mountain', 'highEnd', 'pedalModel-E'), ('mountain', 'highEnd', 'pedalModel-F'), ('mountain', 'premium', 'pedalModel-E'), ('mountain', 'premium', 'pedalModel-F'), ('road', 'highEnd', 'pedalModel-A'), ('road', 'highEnd', 'pedalModel-B'), ('road', 'highEnd', 'pedalModel-C'), ('road', 'highEnd', 'pedalModel-D'), ('road', 'premium', 'pedalModel-A'), ('road', 'premium', 'pedalModel-B'), ('road', 'premium', 'pedalModel-C'), ('road', 'premium', 'pedalModel-D');

CREATE TABLE BikeSize (
  bikeSize bikeSizeType NOT NULL,
  sizeDescription smallint ARRAY,
  PRIMARY KEY (bikeSize)
);

INSERT INTO BikeSize
  VALUES ('s', '{150, 160}'), ('m', '{161, 170}'), ('l', '{171, 180}'), ('xl', '{181, 190}'), ('xxl', '{191, 200}');

CREATE TABLE BikeModel (
  bikeModelName text NOT NULL,
  bikeModelType modelType NOT NULL,
  bikeModelRange modelRange NOT NULL,
  bikeModelBrand text NOT NULL,
  bikeModelDescription text NOT NULL,
  bikeModelImages text ARRAY NOT NULL,
  FOREIGN KEY (bikeModelType, bikeModelRange) REFERENCES Segment,
  PRIMARY KEY (bikeModelName)
);

CREATE TABLE Bike (
  bikesn text NOT NULL,
  bikeModelName text NOT NULL,
  bikeSize bikeSizeType NOT NULL,
  bikeState text NOT NULL,
  FOREIGN KEY (bikeModelName) REFERENCES BikeModel,
  FOREIGN KEY (bikeSize) REFERENCES BikeSize,
  PRIMARY KEY (bikeSn)
);

CREATE TABLE Customer (
  customerEmail text NOT NULL,
  customerName text NOT NULL,
  customerSurname text NOT NULL,
  customerPhone text NOT NULL,
  customerId serial,
  PRIMARY KEY (customerEmail)
);

CREATE TABLE Booking (
  bookingId serial,
  customerEmail text NOT NULL,
  bookingPrice smallint NOT NULL CHECK (bookingPrice > 0),
  bookingDateTest date NOT NULL,
  bookingDate timestamp NOT NULL,
  bookingDateRange tstzrange NOT NULL,
  bookingDuration text,
  deliveryAddress text,
  pickupAddress text,
  FOREIGN KEY (customerEmail) REFERENCES Customer,
  PRIMARY KEY (bookingId)
);

CREATE TABLE BookingOrder (
  bikeSn text NOT NULL,
  bookingId int,
  pedalModelName text,
  hasBasket boolean NOT NULL,
  FOREIGN KEY (bikeSn) REFERENCES Bike (bikeSn),
  FOREIGN KEY (pedalModelName) REFERENCES PedalModel,
  FOREIGN KEY (bookingId) REFERENCES Booking,
  PRIMARY KEY (bikeSn, bookingId)
);
`
execute(text).then((result) => {
   if (result) {
      console.log('Table created')
   }
})
